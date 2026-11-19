"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import { clipReveal, fadeIn, fadeUp, textReveal } from "@/components/animations/animationPresets";
import Button from "@/components/ui/Button";
import { useLenis } from "@/components/animations/SmoothScroll";

/** DS .hero — texto à esquerda, burger defumado à direita, borda de papel rasgado embaixo. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useLenis();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      gsap.set(q("[data-intro]"), { autoAlpha: 1 }); // libera o pré-ocultamento do <html>
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      // 1. elemento visual principal
      tl.add(clipReveal(q("[data-hero-media]"), "right", { duration: 1.5 }), 0)
        .add(gsap.fromTo(q("[data-hero-img]"), { scale: 1.2 }, { scale: 1, duration: 2.2, ease: "power3.out" }), 0)
        // 2. título (linhas mascaradas)
        .add(textReveal(q("[data-line]"), { stagger: 0.12 }), 0.45)
        // 3. subtítulo
        .add(fadeUp(q("[data-hero-text]"), { y: 24 }), 0.95)
        // 4. botões
        .add(fadeUp(q("[data-hero-cta]"), { y: 20, stagger: 0.12 }), 1.1)
        // 5. indicador de rolagem
        .add(fadeIn(q("[data-scroll-ind]")), 1.4);

      // Loop sutil do indicador (GSAP, não CSS)
      const dot = gsap.fromTo(q("[data-scroll-dot]"), { y: 0, autoAlpha: 1 }, { y: 14, autoAlpha: 0, duration: 1.4, ease: "power2.inOut", repeat: -1, delay: 1.8 });

      // Some ao iniciar a rolagem
      ScrollTrigger.create({
        trigger: root.current, start: "top top-=8",
        onEnter: () => gsap.to(q("[data-scroll-ind]"), { autoAlpha: 0, y: 12, duration: 0.4, overwrite: "auto" }),
        onLeaveBack: () => gsap.to(q("[data-scroll-ind]"), { autoAlpha: 1, y: 0, duration: 0.4, overwrite: "auto" }),
      });

      // Saída suave do conteúdo ao rolar (parallax do texto e da imagem)
      gsap.to(q("[data-hero-copy]"), { yPercent: -18, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q("[data-hero-img-wrap]"), { yPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      return () => dot.kill();
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section
      id="inicio"
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate flex overflow-hidden bg-wine-800 items-start md:items-center
                 min-h-[max(620px,calc(100svh-2*var(--frame)-var(--header-h)))]
                 md:min-h-[max(560px,calc(100svh-2*var(--frame)-var(--header-h)))]"
    >
      {/* Mídia: desktop = fundo à direita (cover); mobile = 55% inferior, posição 65% */}
      <div data-hero-media data-intro className="absolute inset-x-0 bottom-0 h-[55%] md:inset-0 md:h-auto -z-10 overflow-hidden">
        <div data-hero-img-wrap className="absolute inset-0">
          <Image
            data-hero-img
            src="/burger-in-casa-landing/images/hero-defumado-burger.webp"
            alt="Burger defumado com bacon e cheddar, brisket e batatas sobre tábua de madeira"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_100%] md:object-[right_center]"
          />
        </div>
        {/* Funde a borda superior da imagem no wine-800 no mobile */}
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-wine-800 to-transparent md:hidden" aria-hidden />
      </div>

      <div data-hero-copy className="container relative pt-[var(--s-7)] md:pt-0 pb-[120px] md:pb-[90px]">
        <div className="max-w-[640px] md:max-w-[52%] lg:max-w-[600px]">
          <h1 id="hero-title" className="m-0 font-display text-[length:var(--fs-hero)] leading-[var(--lh-display)] tracking-[0.02em] uppercase text-yellow-title">
            {["Burgers", "Autorais"].map((l) => (
              <span key={l} className="block overflow-hidden pb-[0.04em]"><span data-line data-intro className="block">{l}</span></span>
            ))}
            <span className="block overflow-hidden pb-[0.04em] text-white"><span data-line data-intro className="block">&amp; Defumados</span></span>
          </h1>
          <p data-hero-text data-intro className="text-white max-w-[420px] mt-[var(--s-5)] mb-[var(--s-6)]">
            Especialista em Burgers Autorais. Curta nossos Defumados.
          </p>
          <div className="flex flex-wrap gap-[var(--s-4)]">
            <span data-hero-cta data-intro><Button href="#cardapio" variant="primary">Ver cardápio</Button></span>
            <span data-hero-cta data-intro><Button href="#defumados" variant="cta">Os defumados</Button></span>
          </div>
        </div>
      </div>

      {/* Indicador de rolagem */}
      <a
        href="#cardapio"
        data-scroll-ind
        data-intro
        aria-label="Rolar para o cardápio"
        className="absolute z-10 bottom-[96px] md:bottom-[100px] left-1/2 -translate-x-1/2 md:left-[var(--gutter)] md:translate-x-0 lg:left-[calc((100%-var(--container))/2+var(--gutter))] hidden sm:flex items-center gap-3 text-white no-underline"
        onClick={(e) => { e.preventDefault(); scrollTo("#cardapio"); }}
      >
        <span className="relative block h-[38px] w-[24px] rounded-full border-2 border-white/80" aria-hidden>
          <span data-scroll-dot className="absolute left-1/2 top-[6px] h-[7px] w-[4px] -translate-x-1/2 rounded-full bg-yellow-title" />
        </span>
        <span className="text-[length:var(--fs-small)] font-semibold uppercase tracking-[0.06em]">Role</span>
      </a>

      {/* DS: .hero::after — borda de papel rasgado */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-px z-10 h-[90px] bg-[url(/burger-in-casa-landing/images/borda-papel-rasgado.png)] bg-bottom bg-[length:100%_100%] bg-no-repeat" />
    </section>
  );
}
