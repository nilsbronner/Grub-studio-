"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import { getPageAccentKey, PAGE_ACCENT_CLASSES } from "@/lib/page-accent";
import { CALENDLY_URL, PRIVACY_URL } from "@/lib/grub-bot-prompt";

type Msg = { role: "user" | "assistant"; content: string };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Bonjour ! Un projet photo, vidéo, studio ou coworking ? Dites-moi en deux mots ce que vous cherchez, je vous oriente.",
};
const QUICK = ["Un film ou un reportage", "Louer le studio / podcast", "Des photos produit", "Coworking ou domiciliation"];
const STORE = "grub-chat-v1";

function Linkify({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return (
    <>
      {parts.map((p, i) =>
        /^https?:\/\//.test(p) ? (
          <a key={i} href={p} target="_blank" rel="noopener noreferrer" className="break-all underline underline-offset-2">
            {p.includes("calendly") ? "Réserver un appel de 30 min" : p}
          </a>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}

// Remplace le bouton flottant « Discutons de votre projet » : même look,
// mais il ouvre l'assistant. Le formulaire de contact reste accessible dans le panneau.
export function GrubChat() {
  const pathname = usePathname();
  const accent = PAGE_ACCENT_CLASSES[getPageAccentKey(pathname)];
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [leadSaved, setLeadSaved] = useState(false);
  const [offline, setOffline] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORE);
      if (raw) {
        const d = JSON.parse(raw);
        if (Array.isArray(d.msgs) && d.msgs.length) setMsgs(d.msgs);
        setLeadSaved(Boolean(d.leadSaved));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify({ msgs, leadSaved }));
    } catch {}
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [msgs, leadSaved, open]);

  if (pathname === "/contact") return null;

  async function send(text: string) {
    const t = text.trim();
    if (!t || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: t }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next, leadSaved }),
      });
      if (r.status === 503) {
        setOffline(true);
        setMsgs([...next, { role: "assistant", content: `L'assistant n'est pas disponible pour le moment. Vous pouvez réserver un appel : ${CALENDLY_URL}` }]);
        return;
      }
      const d = await r.json();
      setMsgs([...next, { role: "assistant", content: d.reply || "Pouvez-vous reformuler ?" }]);
      if (d.leadSaved) setLeadSaved(true);
    } catch {
      setMsgs([...next, { role: "assistant", content: `Connexion impossible pour le moment. Vous pouvez réserver un appel : ${CALENDLY_URL}` }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {open && (
        <div
          role="dialog"
          aria-label="Discuter avec Grub Studio"
          className="flex h-[min(560px,calc(100dvh-120px))] w-[min(380px,calc(100vw-40px))] flex-col border border-border bg-background text-foreground shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.15em]">Grub Studio</p>
              <p className="text-xs text-muted">Assistant · réponse immédiate</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer l'assistant"
              className="px-2 text-xl leading-none text-muted transition-colors hover:text-foreground"
            >
              ×
            </button>
          </div>

          <div ref={logRef} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 text-sm">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={cx(
                  "max-w-[85%] whitespace-pre-wrap px-3 py-2 leading-relaxed",
                  m.role === "user" ? cx("self-end", accent.solid) : "self-start border border-border bg-white/[0.03]",
                )}
              >
                <Linkify text={m.content} />
              </div>
            ))}
            {busy && <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">Grub écrit…</p>}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="border border-border px-3 py-1.5 text-xs transition-colors hover:border-foreground"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex gap-2 border-t border-border p-3"
          >
            <label htmlFor="grub-chat-input" className="sr-only">
              Votre message
            </label>
            <input
              id="grub-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={1500}
              disabled={offline}
              placeholder="Votre message…"
              className="min-w-0 flex-1 border border-border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted focus:border-foreground"
            />
            <button
              type="submit"
              disabled={busy || offline}
              className={cx("border px-4 font-mono text-xs uppercase tracking-[0.15em] disabled:opacity-50", accent.solid)}
            >
              Envoyer
            </button>
          </form>
          <p className="px-3 pb-3 text-[11px] leading-snug text-muted">
            Assistant automatique (IA). Ne partagez pas d&apos;informations sensibles. Vos coordonnées ne sont enregistrées
            qu&apos;avec votre accord.{" "}
            <a href={PRIVACY_URL} className="underline underline-offset-2">
              Confidentialité
            </a>{" "}
            ·{" "}
            <Link href="/contact" className="underline underline-offset-2">
              Formulaire de contact
            </Link>
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={cx(
          "group flex items-center gap-3 border px-6 py-4 font-mono text-sm uppercase tracking-[0.15em] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:pr-7",
          accent.solid,
          accent.hover,
          accent.shadow,
        )}
      >
        <span
          className={cx("h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-150", accent.dot)}
          aria-hidden
        />
        {open ? "Fermer" : "Discutons de votre projet"}
      </button>
    </div>
  );
}
