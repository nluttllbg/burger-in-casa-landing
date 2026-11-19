"use client";
import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, ScrollTrigger, MOTION_REDUCED } from "@/lib/gsap";
import { LENIS_OPTIONS, headerOffset } from "@/lib/lenis";

type Ctx = {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement) => void;
  stop: () => void;
  start: () => void;
};
const LenisContext = createContext<Ctx>({ lenis: null, scrollTo: () => {}, stop: () => {}, start: () => {} });
export const useLenis = () => useContext(LenisContext);

/** Instância ÚNICA do Lenis, sincronizada com GSAP ticker + ScrollTrigger. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const ref = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia(MOTION_REDUCED).matches) return; // movimento reduzido: scroll nativo
    const instance = new Lenis(LENIS_OPTIONS);
    ref.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(tick);
      instance.destroy();
      ref.current = null;
    };
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement) => {
    // Seções com pin (data-anchor-flush) já reservam o espaço do header: param no topo exato.
    const el0 = typeof target === "string" ? document.querySelector<HTMLElement>(target) : null;
    const offset = el0?.dataset.anchorFlush !== undefined && window.matchMedia("(min-width: 1024px)").matches ? 0 : headerOffset();
    if (ref.current) {
      ref.current.scrollTo(target, { offset, duration: 1.4, force: true, easing: (t) => 1 - Math.pow(1 - t, 3) });
      return;
    }
    // Movimento reduzido: salto direto sem animação.
    const el = typeof target === "string" ? document.querySelector(target) : target;
    if (typeof el === "number") window.scrollTo({ top: el });
    else if (el instanceof HTMLElement) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
  }, []);
  const stop = useCallback(() => {
    if (ref.current) ref.current.stop();
    else document.documentElement.style.overflow = "hidden";
  }, []);
  const start = useCallback(() => {
    if (ref.current) ref.current.start();
    else document.documentElement.style.overflow = "";
  }, []);

  return <LenisContext.Provider value={{ lenis, scrollTo, stop, start }}>{children}</LenisContext.Provider>;
}
