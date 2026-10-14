/**
 * Which brand accent a page's primary CTAs use. Cycles through the Grub
 * Motion palette instead of pinning every page to the same pink, so the
 * site reads as varied while staying inside the brand's four colors.
 * Hover always swaps to the color's pair (pink<->purple, yellow<->cyan) so
 * the button never needs to flip its text color mid-transition.
 */
export type PageAccentKey = "pink" | "purple" | "yellow" | "cyan";

export function getPageAccentKey(pathname: string): PageAccentKey {
  if (pathname.startsWith("/services")) return "purple";
  if (pathname.startsWith("/conseil")) return "yellow";
  if (pathname.startsWith("/rush")) return "cyan";
  if (pathname.startsWith("/studio")) return "cyan";
  if (pathname.startsWith("/travaux")) return "pink";
  // Home, /contact, legal pages.
  return "pink";
}

type AccentClasses = {
  /** Solid-filled border/background/text for the resting state. */
  solid: string;
  /** Hover border/background, paired for matching text contrast. */
  hover: string;
  /** Small dot/marker color that reads against the solid fill. */
  dot: string;
  /** Tinted drop shadow for the floating CTA. */
  shadow: string;
};

export const PAGE_ACCENT_CLASSES: Record<PageAccentKey, AccentClasses> = {
  pink: {
    solid: "border-accent bg-accent text-white",
    hover: "hover:border-accent-purple hover:bg-accent-purple",
    dot: "bg-white",
    shadow: "shadow-accent/30",
  },
  purple: {
    solid: "border-accent-purple bg-accent-purple text-white",
    hover: "hover:border-accent hover:bg-accent",
    dot: "bg-white",
    shadow: "shadow-accent-purple/30",
  },
  yellow: {
    solid: "border-accent-yellow bg-accent-yellow text-background",
    hover: "hover:border-accent-cyan hover:bg-accent-cyan",
    dot: "bg-background",
    shadow: "shadow-accent-yellow/30",
  },
  cyan: {
    solid: "border-accent-cyan bg-accent-cyan text-background",
    hover: "hover:border-accent-yellow hover:bg-accent-yellow",
    dot: "bg-background",
    shadow: "shadow-accent-cyan/30",
  },
};
