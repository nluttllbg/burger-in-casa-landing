"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { menuTransition } from "@/components/animations/animationPresets";
import { useLenis } from "@/components/animations/SmoothScroll";
import Button from "@/components/ui/Button";
import { nav, site } from "@/content/site";

export default function Navbar() {
  const root = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo, stop, start } = useLenis();

  useGSAP(() => {
    // Estado "rolado": sombra sutil (DS mantém o fundo wine-900).
    ScrollTrigger.create({ start: 40, end: "max", onToggle: (self) => setScrolled(self.isActive) });

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.fromTo("[data-nav-item]", { y: -24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.08, delay: 0.2 });
    });
    if (panel.current) {
      tl.current = menuTransition(panel.current, panel.current.querySelectorAll("[data-menu-link]"));
      // Ícone hamburger → X
      tl.current.to("[data-bar='1']", { y: 7, rotate: 45, duration: 0.4 }, 0)
        .to("[data-bar='2']", { scaleX: 0, autoAlpha: 0, duration: 0.3 }, 0)
        .to("[data-bar='3']", { y: -7, rotate: -45, duration: 0.4 }, 0);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) tl.current.timeScale(20);
    }
    return () => mm.revert();
  }, { scope: root });

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      tl.current.play();
      stop();
      panel.current?.querySelector<HTMLElement>("[data-menu-link]")?.focus();
    } else {
      tl.current.reverse();
      start();
    }
  }, [open, stop, start]);

  // Escape fecha; menu fecha ao passar para desktop.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); } };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => { window.removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); };
  }, [open]);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (open) { setOpen(false); start(); } // libera o scroll antes de navegar
    scrollTo(href);
    history.replaceState(null, "", href);
  };

  return (
    <header
      ref={root}
      className={`fixed z-50 top-[var(--frame)] left-[var(--frame)] right-[var(--frame)] h-[var(--header-h)] bg-wine-900 rounded-t-[var(--r-md)] ${scrolled ? "shadow-[0_10px_30px_rgba(2,0,0,.35)]" : ""}`}
    >
      <div className="container flex h-full items-center justify-between gap-4">
        <a href="#inicio" onClick={(e) => go(e, "#inicio")} data-nav-item className="shrink-0" aria-label={`${site.name} — início`}>
          <Image src="/burger-in-casa-landing/images/logo-burger-in-casa.jpg" alt={site.name} width={60} height={60} priority
            className="h-[48px] w-[48px] md:h-[60px] md:w-[60px] rounded-[var(--r-sm)]" />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center">
            {nav.map((n) => (
              <li key={n.href} data-nav-item>
                <a href={n.href} onClick={(e) => go(e, n.href)}
                  className="mx-[var(--s-4)] text-[length:var(--fs-small)] font-semibold uppercase text-white no-underline transition-colors hover:text-yellow-title">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <div data-nav-item className="hidden sm:block">
            <Button href="#cardapio" variant="cta" className="!px-5 !py-3">Ver cardápio</Button>
          </div>
          <button
            ref={toggle}
            type="button"
            data-nav-item
            className="lg:hidden relative grid h-12 w-12 place-items-center rounded-[var(--r-pill)] bg-wine-800 text-white"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-4 w-6" aria-hidden>
              <span data-bar="1" className="absolute left-0 top-0 h-[2px] w-6 rounded bg-current" />
              <span data-bar="2" className="absolute left-0 top-[7px] h-[2px] w-6 rounded bg-current" />
              <span data-bar="3" className="absolute left-0 top-[14px] h-[2px] w-6 rounded bg-current" />
            </span>
          </button>
        </div>
      </div>

      <div
        ref={panel}
        id="mobile-menu"
        className="invisible lg:hidden fixed left-[var(--frame)] right-[var(--frame)] bottom-[var(--frame)] top-[calc(var(--frame)+var(--header-h))] bg-wine-800 rounded-b-[var(--r-md)] overflow-y-auto"
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Menu mobile" className="container flex min-h-full flex-col justify-between py-[var(--s-7)]">
          <ul className="flex flex-col gap-2">
            {nav.map((n) => (
              <li key={n.href} className="overflow-hidden">
                <a data-menu-link href={n.href} onClick={(e) => go(e, n.href)}
                  className="block py-2 font-display text-[clamp(40px,12vw,64px)] uppercase leading-none text-white no-underline hover:text-yellow-title">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="overflow-hidden pt-[var(--s-7)]">
            <p data-menu-link className="m-0 text-[length:var(--fs-small)] text-white/80">{site.tagline}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
