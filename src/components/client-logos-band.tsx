import { clientLogos, clientVolumetry } from "@/lib/content/clients";

export function ClientLogosBand() {
  return (
    <div className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {clientVolumetry}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {clientLogos.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
