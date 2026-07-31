export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 245"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="40" y="8" width="76" height="44" rx="22" fill="var(--accent-purple)" />
      <rect x="40" y="68" width="177" height="44" rx="22" fill="var(--accent-pink)" />
      <rect x="0" y="128" width="176" height="44" rx="22" fill="var(--accent-yellow)" />
      <rect x="100" y="190" width="76" height="44" rx="22" fill="var(--accent-cyan)" />
    </svg>
  );
}
