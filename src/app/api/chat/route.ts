import { NextResponse } from "next/server";
import { SYSTEM_PROMPT, SAVE_LEAD_TOOL, CALENDLY_URL, PRIVACY_URL } from "@/lib/grub-bot-prompt";

// Bot prospects du site. Un lead accepté passe par /api/contact (fiche projet dans
// Grub Gestion + mail de notification via Resend), comme le formulaire de contact.
//
// Variables d'environnement :
//   ANTHROPIC_API_KEY     obligatoire
//   ANTHROPIC_MODEL       facultatif (défaut : claude-sonnet-4-5)
//   BREVO_API_KEY         facultatif : ajoute aussi le contact dans Brevo
//   BREVO_LEADS_LIST_ID   facultatif : liste Brevo « Leads site – bot » (25)
//   RESEND_API_KEY / CONTACT_FROM_EMAIL : déjà utilisés par /api/contact, servent
//                         aussi à l'accusé de réception envoyé au visiteur

export const runtime = "nodejs";

type Msg = { role: "user" | "assistant"; content: string };
type Lead = {
  prenom: string; nom?: string; email: string; telephone?: string; entreprise?: string;
  pole?: string; buyer?: string; besoin: string; echeance?: string; consentement?: boolean;
};

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";
const MAX_TURNS = 24;
const MAX_CHARS = 1500;

// Limite simple par IP (mémoire de l'instance) : 30 messages / 10 min.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 30;
}

const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const esc = (s = "") =>
  s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

async function addToBrevo(lead: Lead) {
  const key = process.env.BREVO_API_KEY;
  if (!key) return;
  const listId = Number(process.env.BREVO_LEADS_LIST_ID);
  await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": key, "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      email: lead.email,
      updateEnabled: true,
      listIds: Number.isFinite(listId) && listId > 0 ? [listId] : undefined,
      attributes: { PRENOM: lead.prenom, NOM: lead.nom || "", ENTREPRISE: lead.entreprise || "", BUYER: lead.buyer || "" },
    }),
  }).catch((e) => console.error("brevo", e));
}

async function sendAck(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  const from = process.env.CONTACT_FROM_EMAIL || "site@le-grub.com";
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: lead.email,
      subject: "Votre demande est bien arrivée chez Grub Studio",
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a;max-width:560px">
        <p>Bonjour ${esc(lead.prenom)},</p>
        <p>Merci pour votre message. Nous avons bien noté votre besoin :</p>
        <p style="padding:10px 14px;background:#f5f6f8;border-radius:6px">${esc(lead.besoin)}</p>
        <p>L'équipe revient vers vous très vite. Pour fixer directement un échange de 30 minutes : <a href="${CALENDLY_URL}">réserver un appel</a>.</p>
        <p>À très bientôt,<br>L'équipe Grub Studio<br><a href="https://studio.le-grub.com">studio.le-grub.com</a></p>
        <p style="font-size:12px;color:#777">Vos informations servent uniquement à vous recontacter au sujet de votre demande (LE GRUB SAS, 91 route des Romains, Strasbourg). Vous pouvez demander leur consultation ou leur suppression en répondant à ce mail. <a href="${PRIVACY_URL}" style="color:#777">Politique de confidentialité</a></p></div>`,
    }),
  }).catch((e) => console.error("resend ack", e));
}

async function saveLead(lead: Lead, transcript: Msg[], origin: string): Promise<string> {
  if (lead.consentement !== true)
    return "Pas de consentement explicite : ne rien enregistrer. Pose la question de consentement, ou propose le rendez-vous en ligne.";
  if (!lead.email || !validEmail(lead.email)) return "Email invalide : redemande une adresse email correcte.";

  const consentAt = new Date().toISOString();
  const convo = transcript.map((m) => `${m.role === "user" ? "Visiteur" : "Bot"} : ${m.content}`).join("\n");
  const message = [
    `[Lead bot du site] Pôle : ${lead.pole || "?"} · Buyer : ${lead.buyer || "?"} · Échéance : ${lead.echeance || "?"}`,
    `Besoin : ${lead.besoin}`,
    `Consentement au recontact : oui, donné dans le chat le ${consentAt}`,
    "",
    "Conversation :",
    convo,
  ].join("\n");

  // Même circuit que le formulaire de contact : fiche Grub Gestion + notification.
  const res = await fetch(new URL("/api/contact", origin), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: [lead.prenom, lead.nom].filter(Boolean).join(" "),
      email: lead.email,
      phone: lead.telephone,
      company: lead.entreprise,
      projectType: `Bot — ${lead.pole || "?"}`,
      message,
      consent: true,
    }),
  });
  if (!res.ok) {
    console.error("api/contact", res.status, await res.text().catch(() => ""));
    return "L'enregistrement a échoué. Propose plutôt le rendez-vous en ligne ou le formulaire de contact.";
  }
  await Promise.all([addToBrevo(lead), sendAck(lead)]);
  return "Demande enregistrée et équipe prévenue. Confirme au visiteur qu'il va recevoir un email de confirmation et que l'équipe revient vers lui rapidement.";
}

type Block = { type: string; text?: string; id?: string; name?: string; input?: unknown };

async function callClaude(messages: unknown[]) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({ model: MODEL, max_tokens: 600, system: SYSTEM_PROMPT, tools: [SAVE_LEAD_TOOL], messages }),
  });
  if (!r.ok) throw new Error(`Anthropic ${r.status}: ${await r.text()}`);
  return (await r.json()) as { content: Block[]; stop_reason: string };
}

export async function POST(request: Request) {
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ configured: false }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip))
    return NextResponse.json({ reply: `Vous avez envoyé beaucoup de messages. Réessayez dans quelques minutes, ou réservez un appel : ${CALENDLY_URL}` }, { status: 429 });

  let body: { messages?: Msg[]; leadSaved?: boolean };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "invalid_json" }, { status: 400 }); }

  const transcript = (body.messages || [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  while (transcript.length && transcript[0].role !== "user") transcript.shift();
  if (!transcript.length || transcript[transcript.length - 1].role !== "user")
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });

  try {
    const messages: unknown[] = [...transcript];
    let leadSaved = Boolean(body.leadSaved);
    for (let round = 0; round < 3; round++) {
      const res = await callClaude(messages);
      const toolUses = res.content.filter((b) => b.type === "tool_use");
      const text = res.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      if (res.stop_reason !== "tool_use" || !toolUses.length)
        return NextResponse.json({ reply: text || "Pouvez-vous préciser votre besoin ?", leadSaved });
      messages.push({ role: "assistant", content: res.content });
      const results = [];
      for (const t of toolUses) {
        let out = "Outil inconnu.";
        if (t.name === "save_lead") {
          if (leadSaved) out = "Demande déjà enregistrée dans cette conversation : ne pas la renvoyer.";
          else {
            try {
              out = await saveLead(t.input as Lead, transcript, request.url);
              if (out.startsWith("Demande enregistrée")) leadSaved = true;
            } catch (e) {
              console.error(e);
              out = "L'enregistrement a échoué. Propose plutôt le rendez-vous en ligne ou le formulaire de contact.";
            }
          }
        }
        results.push({ type: "tool_result", tool_use_id: t.id, content: out });
      }
      messages.push({ role: "user", content: results });
    }
    return NextResponse.json({ reply: "Merci ! L'équipe revient vers vous rapidement.", leadSaved });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ reply: `Je rencontre un souci technique. Vous pouvez réserver un appel directement : ${CALENDLY_URL}` });
  }
}
