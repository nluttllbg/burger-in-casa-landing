"use client";
import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { horizontalReveal, parallax, scaleReveal, sectionTransition, textReveal } from "@/components/animations/animationPresets";

/** DS .band — pincelada mostarda + faixa trio de burgers + ingredientes flutuantes (.floating). */
export default function DefumadosBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const st = { trigger: root.current, start: "top 75%", once: true };
      gsap.set(q("[data-line]"), { yPercent: 110 });
      textReveal(q("[data-line]"), { scrollTrigger: st });
      horizontalReveal(q("[data-brush]"), -1, { duration: 1.2, scrollTrigger: st });
      scaleReveal(q("[data-trio]"), { delay: 0.2, scrollTrigger: st });
      sectionTransition(q("[data-band-text]")[0]);
      q("[data-float]").forEach((el, i) => parallax(el, root.current!, [160, -120, 200][i] ?? 120, { rotate: [30, -25, 40][i] }));
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <section id="defumados" ref={root} aria-labelledby="defumados-title" className="section relative overflow-hidden bg-cream-section">
      <div className="container text-center">
        <h2 id="defumados-title" className="section__title !mb-[var(--s-5)]">
          <span className="block overflow-hidden pb-[0.1em]">
            <span data-line className="block font-script normal-case text-red-button text-[0.7em] tracking-normal">Curta nossos</span>
          </span>
          <span className="block overflow-hidden"><span data-line className="block">Defumados</span></span>
        </h2>
      </div>

      <div className="band relative py-[var(--s-8)] text-center">
        <div data-brush aria-hidden className="absolute inset-0 bg-[url(/burger-in-casa-landing/images/textura-pincelada-mostarda.png)] bg-center bg-[length:100%_100%] bg-no-repeat" />
        <Image data-trio src="/burger-in-casa-landing/images/faixa-trio-burgers.png" alt="Trio de burgers autorais com cheddar, bacon e salada"
          width={1584} height={672} sizes="(max-width: 960px) 100vw, 900px"
          className="relative mx-auto block h-auto w-[min(900px,100%)]" />
      </div>

      <div className="container">
        <p data-band-text className="mx-auto mt-[var(--s-6)] max-w-[520px] text-center font-semibold">
          Especialista em Burgers Autorais.
        </p>
      </div>

      <Image data-float src="/burger-in-casa-landing/images/flutuante-batata-palito.png" alt="" aria-hidden width={180} height={180} className="floating left-[3%] top-[18%] rotate-[-20deg]" />
      <Image data-float src="/burger-in-casa-landing/images/flutuante-tomate-cereja.png" alt="" aria-hidden width={180} height={180} className="floating right-[4%] top-[12%]" />
      <Image data-float src="/burger-in-casa-landing/images/flutuante-folha-rucula.png" alt="" aria-hidden width={180} height={180} className="floating right-[8%] bottom-[6%] rotate-[15deg]" />
    </section>
  );
}
