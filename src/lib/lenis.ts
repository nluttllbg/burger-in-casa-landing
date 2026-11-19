import type { LenisOptions } from "lenis";

export const LENIS_OPTIONS: LenisOptions = {
  lerp: 0.1,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.2,
  autoRaf: false, // driven by gsap.ticker (see SmoothScroll)
  anchors: false, // anchors handled explicitly so the fixed header offset is respected
};

export function headerOffset(): number {
  if (typeof window === "undefined") return 0;
  const v = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  return -(parseFloat(v) || 84);
}
