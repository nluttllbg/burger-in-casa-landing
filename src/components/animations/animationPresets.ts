"use client";
/**
 * Biblioteca de presets GSAP. Toda animação de movimento do site passa por aqui
 * para manter uma única linguagem visual (power3.out, transform + opacity).
 */
import { gsap, ScrollTrigger } from "@/lib/gsap";

type T = gsap.TweenTarget;
type Vars = gsap.TweenVars;
export const EASE = "power3.out";
export const STAGGER = 0.2;

/** 1. Text Reveal — linhas mascaradas (wrapper overflow:hidden) sobem de baixo. */
export const textReveal = (lines: T, v: Vars = {}) =>
  gsap.fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.12, ...v });

/** 2. Image Reveal — imagem desce de um leve zoom enquanto aparece. */
export const imageReveal = (el: T, v: Vars = {}) =>
  gsap.fromTo(el, { scale: 1.18, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.6, ease: EASE, ...v });

/** 3. Clip Reveal — máscara clip-path abrindo a partir de um lado. */
export const clipReveal = (el: T, from: "left" | "right" | "bottom" = "right", v: Vars = {}) => {
  const start = { left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)", bottom: "inset(100% 0% 0% 0%)" }[from];
  return gsap.fromTo(el, { clipPath: start }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: EASE, ...v });
};

/** 4. Fade Up */
export const fadeUp = (el: T, v: Vars = {}) =>
  gsap.fromTo(el, { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: EASE, ...v });

/** 5. Fade In */
export const fadeIn = (el: T, v: Vars = {}) =>
  gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8, ease: EASE, ...v });

/** 6. Stagger Reveal — grupo entrando em sequência (0.2s). */
export const staggerReveal = (els: T, v: Vars = {}) =>
  gsap.fromTo(els, { y: 60, autoAlpha: 0, scale: 0.94 }, { y: 0, autoAlpha: 1, scale: 1, duration: 1, ease: EASE, stagger: STAGGER, ...v });

/** 7. Parallax — deslocamento vinculado ao scroll. */
export const parallax = (el: gsap.DOMTarget, trigger: gsap.DOMTarget, amount = 120, v: Vars = {}) =>
  gsap.fromTo(el, { y: -amount / 2 }, {
    y: amount / 2, ease: "none", ...v,
    scrollTrigger: { trigger: trigger as Element, start: "top bottom", end: "bottom top", scrub: true },
  });

/** 8. Scale Reveal */
export const scaleReveal = (el: T, v: Vars = {}) =>
  gsap.fromTo(el, { scale: 0.8, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 1.1, ease: EASE, ...v });

/** 9. Horizontal Reveal */
export const horizontalReveal = (el: T, dir: 1 | -1 = 1, v: Vars = {}) =>
  gsap.fromTo(el, { x: 80 * dir, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 1, ease: EASE, ...v });

/** 10. Scroll Pin — timeline fixada e controlada pelo scroll. */
export const scrollPin = (trigger: Element, opts: ScrollTrigger.Vars = {}) =>
  gsap.timeline({
    defaults: { ease: EASE },
    scrollTrigger: { trigger, start: "top top", end: "+=150%", pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true, ...opts },
  });

/** 11. Menu Transition — painel do menu mobile (timeline pausada; play/reverse). */
export const menuTransition = (panel: Element, links: T) =>
  gsap.timeline({ paused: true, defaults: { ease: EASE } })
    .set(panel, { autoAlpha: 1 })
    .fromTo(panel, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6 })
    .fromTo(links, { yPercent: 110 }, { yPercent: 0, duration: 0.6, stagger: 0.08 }, "-=0.3");

/** 12. Button Interaction — leve "squash" ao pressionar. Retorna função de cleanup. */
export const buttonInteraction = (btn: HTMLElement) => {
  const down = () => gsap.to(btn, { scale: 0.96, duration: 0.15, ease: EASE });
  const up = () => gsap.to(btn, { scale: 1, duration: 0.4, ease: "back.out(3)" });
  btn.addEventListener("pointerdown", down);
  btn.addEventListener("pointerup", up);
  btn.addEventListener("pointerleave", up);
  return () => {
    btn.removeEventListener("pointerdown", down);
    btn.removeEventListener("pointerup", up);
    btn.removeEventListener("pointerleave", up);
  };
};

/** 13. Section Transition — bloco entra quando a seção chega na viewport. */
export const sectionTransition = (el: Element, v: Vars = {}) =>
  gsap.fromTo(el, { y: 60, autoAlpha: 0 }, {
    y: 0, autoAlpha: 1, duration: 1, ease: EASE, ...v,
    scrollTrigger: { trigger: el, start: "top 85%", once: true },
  });
