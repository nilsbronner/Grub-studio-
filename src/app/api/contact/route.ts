import { NextResponse } from "next/server";

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: string;
  message: string;
};

function isValidPayload(data: unknown): data is ContactPayload {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    typeof d.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    typeof d.message === "string" &&
    d.message.trim().length > 0
  );
}

function buildDescription(payload: ContactPayload) {
  return [
    `Email : ${payload.email}`,
    payload.phone ? `Téléphone : ${payload.phone}` : null,
    payload.projectType ? `Type de projet : ${payload.projectType}` : null,
    "",
    payload.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

// Mirrors the "Le Grub" Chrome extension's write path (legrub-platform/extension/api.js):
// a client (name only) then a project (name, description, client_id, drive_url,
// assigned_editor_id, stage, status), with the same standard checklist templates
// attached. The extension authenticates as a real user (RLS checks auth.uid()),
// but a trusted server route uses the service role key instead to bypass RLS —
// no need to hold a user session.
//
// Required env vars:
//   SUPABASE_URL                 e.g. https://nvuregnrdspayomugvct.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY    Supabase → Settings → API → service_role secret
//   SUPABASE_ASSIGNED_EDITOR_ID  Nils's `profiles.id` — Table Editor → profiles
async function createGrubProject(payload: ContactPayload) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { attempted: false as const };

  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };

  const clientRes = await fetch(`${url}/rest/v1/clients`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify({
      name: payload.company || payload.name,
    }),
  });
  if (!clientRes.ok) return { attempted: true as const, ok: false };
  const [client] = await clientRes.json();

  const projectRes = await fetch(`${url}/rest/v1/projects`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify({
      name: `Demande site — ${payload.name}`,
      description: buildDescription(payload),
      client_id: client?.id ?? null,
      drive_url: null,
      assigned_editor_id: process.env.SUPABASE_ASSIGNED_EDITOR_ID || null,
      stage: "pre_production",
      status: "actif",
    }),
  });
  if (!projectRes.ok) return { attempted: true as const, ok: false };
  const [project] = await projectRes.json();

  // Attach the same standard checklists the extension adds to every new project.
  const templatesRes = await fetch(
    `${url}/rest/v1/checklist_templates?select=*`,
    { headers }
  );
  const templates = templatesRes.ok ? await templatesRes.json() : [];
  type ChecklistTemplate = {
    id: string;
    name: string;
    items?: { label: string }[];
  };
  await Promise.all(
    (templates as ChecklistTemplate[]).map((template) =>
      fetch(`${url}/rest/v1/project_checklists`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          project_id: project?.id,
          template_id: template.id,
          name: template.name,
          items: (template.items ?? []).map((item) => ({
            label: item.label,
            done: false,
          })),
        }),
      })
    )
  );

  return { attempted: true as const, ok: true };
}

// Email the completed form to Nils. Configure via env vars:
//   RESEND_API_KEY, CONTACT_NOTIFY_EMAIL (defaults to nils.bronner@gmail.com),
//   CONTACT_FROM_EMAIL (a verified sender on the Resend account/domain).
async function sendNotificationEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { attempted: false as const };

  const to = process.env.CONTACT_NOTIFY_EMAIL || "nils.bronner@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "site@bemotion.fr";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: payload.email,
      subject: `Nouveau contact site — ${payload.name}`,
      text: `Nom : ${payload.name}\n${buildDescription(payload)}`,
    }),
  });

  return { attempted: true as const, ok: res.ok };
}

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!isValidPayload(data)) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const [project, email] = await Promise.all([
    createGrubProject(data),
    sendNotificationEmail(data),
  ]);

  // Neither destination is configured yet — tell the client to fall back
  // to a mailto link rather than silently dropping the lead.
  if (!project.attempted && !email.attempted) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  const ok =
    (project.attempted ? project.ok : true) &&
    (email.attempted ? email.ok : true);
  if (!ok) {
    return NextResponse.json({ configured: true, ok: false }, { status: 502 });
  }

  return NextResponse.json({ configured: true, ok: true });
}
