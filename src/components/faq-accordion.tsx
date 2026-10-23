export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Native `<details>`/`<summary>` — no JS needed, and critically the answer
 * text sits in the server-rendered HTML regardless of open/closed state, so
 * it both matches the page's FAQPage JSON-LD 1:1 and stays visible to a
 * crawler that doesn't execute JS to expand an accordion.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => (
        <details key={item.question} className="group py-4" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium marker:content-none">
            {item.question}
            <span
              aria-hidden
              className="shrink-0 font-mono text-muted transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
