"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { EASE, STAGGER, scrollPin, staggerReveal, textReveal } from "@/components/animations/animationPresets";
import Card, { type CardShape } from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { menu } from "@/content/site";

/**
 * Cardápio — cena com pin (desktop/tablet ≥1024px). Composição editorial assimétrica:
 * 01 dominante · 02 vertical · 03 compacto (deslocado) · 04 horizontal.
 * Mobile/tablet: sem pin; cards entram em sequência conforme a rolagem.
 */
const SHAPES: CardShape[] = ["dominant", "vertical", "compact", "horizontal"];
const AREAS = [
  "lg:col-[1/7] lg:row-[1/7]",
  "lg:col-[7/10] lg:row-[1/5]",
  "lg:col-[10/13] lg:row-[2/5]",
  "lg:col-[7/13] lg:row-[5/7]",
];
const MOBILE = [
  "col-span-2",
  "col-span-1 md:row-span-2",
  "col-span-1",
  "col-span-2 md:col-span-1",
];
// Ponto de partida de cada card: a "câmera" chega de direções diferentes.
const FROM = [
  { x: -120, y: 60, scale: 0.88 },
  { x: 0, y: 160, scale: 0.92 },
  { x: 140, y: -40, scale: 0.9 },
  { x: 80, y: 120, scale: 0.94 },
];

export default function CinematicSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const q = gsap.utils.selector(root);

    mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
      const cards = q("[data-card]");
      const tl = scrollPin(root.current!, { end: "+=160%" });
      // Câmera: começa aproximada e deslocada, afasta e centraliza enquanto os cards entram.
      tl.fromTo(stage.current, { scale: 1.14, xPercent: 4, yPercent: 6 }, { scale: 1, xPercent: 0, yPercent: 0, duration: 1.6, ease: EASE }, 0)
        .add(textReveal(q("[data-line]"), { duration: 0.8 }), 0)
        .fromTo(cards, (i: number) => ({ ...FROM[i], autoAlpha: 0 }),
          { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.8, ease: EASE, stagger: STAGGER }, 0.2)
        .fromTo(q("[data-card-photo]"), { scale: 0.7, rotate: -12 }, { scale: 1, rotate: 0, duration: 0.8, ease: EASE, stagger: STAGGER }, 0.3)
        .fromTo(q("[data-float]"), { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 1, duration: 0.6, stagger: STAGGER }, 0.9)
        // Respiro final: leve deriva lateral, como um travelling.
        .to(stage.current, { xPercent: -1.5, yPercent: -2, duration: 0.8, ease: "none" }, 1.6)
        .to(q("[data-float]"), { y: -40, rotate: 25, duration: 0.8, ease: "none" }, 1.6);
    });

    mm.add(`${MOTION_OK} and (max-width: 1023px)`, () => {
      gsap.set(q("[data-line]"), { yPercent: 110 });
      textReveal(q("[data-line]"), { scrollTrigger: { trigger: root.current, start: "top 80%", once: true } });
      q("[data-card]").forEach((card, i) => {
        staggerReveal(card, { y: 50, duration: 0.9, delay: (i % 2) * STAGGER, scrollTrigger: { trigger: card, start: "top 88%", once: true } });
      });
      gsap.fromTo(q("[data-float]"), { autoAlpha: 0 }, { autoAlpha: 1, stagger: STAGGER, scrollTrigger: { trigger: root.current, start: "top 70%", once: true } });
    });

    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="cardapio" ref={root} data-anchor-flush aria-labelledby="cardapio-title"
      className="relative bg-cream-section overflow-hidden lg:h-[calc(100svh-2*var(--frame))] lg:pt-[calc(var(--header-h)+var(--s-6))] lg:pb-[var(--s-7)] py-[var(--s-8)] md:py-[var(--s-9)]">
      <div ref={stage} className="container flex h-full flex-col will-change-transform">
        <SectionHeading id="cardapio-title" lines={["Nosso Cardápio"]} className="lg:!mb-[var(--s-6)]" />
        <div className="grid grid-cols-2 gap-[var(--s-4)] md:gap-[var(--s-5)] lg:flex-1 lg:min-h-0 lg:grid-cols-12 lg:grid-rows-6">
          {menu.map((item, i) => (
            <div key={item.name} className={`${MOBILE[i]} ${AREAS[i]} min-h-0`}>
              <Card item={item} index={i} shape={SHAPES[i]} />
            </div>
          ))}
        </div>
      </div>

      {/* Ingredientes flutuantes (DS .floating) */}
      <Image data-float src="/burger-in-casa-landing/images/flutuante-tomate-cereja.png" alt="" width={180} height={180} aria-hidden
        className="floating right-[4%] top-[calc(var(--header-h)+28px)] hidden lg:block" />
      <Image data-float src="/burger-in-casa-landing/images/flutuante-folha-rucula.png" alt="" width={180} height={180} aria-hidden
        className="floating left-[1%] bottom-[6%] -rotate-12 hidden md:block" />
    </section>
  );
}
