import { NextResponse } from "next/server";

export type ConseilPayload = {
  name: string;
  email: string;
  company?: string;
  topic: string;
  context: string;
  goal?: string;
};

function isValidPayload(data: unknown): data is ConseilPayload {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    d.name.trim().length > 0 &&
    typeof d.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    typeof d.topic === "string" &&
    d.topic.trim().length > 0 &&
    typeof d.context === "string" &&
    d.context.trim().length > 0
  );
}

function buildDescription(payload: ConseilPayload) {
  return [
    `Email : ${payload.email}`,
    payload.company ? `Société : ${payload.company}` : null,
    `Sujet de l'audit : ${payload.topic}`,
    "",
    "Contexte actuel :",
    payload.context,
    payload.goal ? `\nObjectif / blocage :\n${payload.goal}` : null,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

// Email the completed Grub Conseil questionnaire to Nils. Reuses the same
// Resend setup as /api/contact:
//   RESEND_API_KEY, CONTACT_NOTIFY_EMAIL (defaults to nils.bronner@gmail.com),
//   CONTACT_FROM_EMAIL (a verified sender on the Resend account/domain).
async function sendNotificationEmail(payload: ConseilPayload) {
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
      subject: `Grub Conseil — ${payload.name}`,
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

  const email = await sendNotificationEmail(data);

  if (!email.attempted) {
    return NextResponse.json({ configured: false }, { status: 503 });
  }
  if (!email.ok) {
    return NextResponse.json({ configured: true, ok: false }, { status: 502 });
  }

  return NextResponse.json({ configured: true, ok: true });
}
