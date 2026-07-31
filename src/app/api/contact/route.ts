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

// Insert a prospection ticket into the existing "Grub gestion" Supabase project.
// Configure via env vars once the schema is confirmed:
//   SUPABASE_URL, SUPABASE_TICKETS_TABLE, SUPABASE_TICKET_OWNER_ID
//   (Nils's user id in that system), and either:
//   - SUPABASE_SERVICE_ROLE_KEY (bypasses RLS — preferred if available), or
//   - SUPABASE_ANON_KEY (respects RLS — the tickets table must allow
//     `insert` for the `anon` role, or every submission will fail and
//     fall back to the mailto link).
async function createSupabaseTicket(payload: ContactPayload) {
  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  const table = process.env.SUPABASE_TICKETS_TABLE;
  if (!url || !key || !table) return { attempted: false as const };

  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      owner_id: process.env.SUPABASE_TICKET_OWNER_ID,
      type: "prospection",
      title: `Contact site — ${payload.name}`,
      contact_name: payload.name,
      contact_email: payload.email,
      contact_phone: payload.phone || null,
      contact_company: payload.company || null,
      project_type: payload.projectType || null,
      message: payload.message,
      source: "bemotion-site",
    }),
  });

  return { attempted: true as const, ok: res.ok };
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
      text: [
        `Nom : ${payload.name}`,
        `Email : ${payload.email}`,
        payload.phone ? `Téléphone : ${payload.phone}` : null,
        payload.company ? `Société : ${payload.company}` : null,
        payload.projectType ? `Type de projet : ${payload.projectType}` : null,
        "",
        payload.message,
      ]
        .filter(Boolean)
        .join("\n"),
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

  const [ticket, email] = await Promise.all([
    createSupabaseTicket(data),
    sendNotificationEmail(data),
  ]);

  // Neither destination is configured yet — tell the client to fall back
  // to a mailto link rather than silently dropping the lead.
  if (!ticket.attempted && !email.attempted) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }

  const ok = (ticket.attempted ? ticket.ok : true) && (email.attempted ? email.ok : true);
  if (!ok) {
    return NextResponse.json({ configured: true, ok: false }, { status: 502 });
  }

  return NextResponse.json({ configured: true, ok: true });
}
