"use client";
import Image from "next/image";
import { useRef, type MouseEvent } from "react";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { fadeUp } from "@/components/animations/animationPresets";
import { useLenis } from "@/components/animations/SmoothScroll";
import { contactLinks, nav, site } from "@/content/site";

/** DS .splash + .footer — respingo vermelho sobre o creme e rodapé red-splash-dark. */
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useLenis();
  const contacts = contactLinks();
  const { address, hours } = site.contact;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      fadeUp(gsap.utils.selector(root)("[data-foot]"), { stagger: 0.2, scrollTrigger: { trigger: root.current, start: "top 80%", once: true } });
    });
    return () => mm.revert();
  }, { scope: root });

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => { e.preventDefault(); scrollTo(href); history.replaceState(null, "", href); };

  return (
    <footer id="contato" ref={root} className="relative">
      <div aria-hidden className="h-[140px] md:h-[200px] bg-cream-section bg-[url(/burger-in-casa-landing/images/textura-respingo-vermelho.png)] bg-bottom bg-[length:100%_100%] bg-no-repeat" />
      <div className="bg-red-splash-dark text-white pt-[var(--s-6)] pb-[var(--s-6)]">
        <div className="container grid gap-[var(--s-7)] md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div data-foot className="flex items-start gap-[var(--s-4)]">
            <Image src="/burger-in-casa-landing/images/logo-burger-in-casa.jpg" alt={site.name} width={84} height={84} className="rounded-[var(--r-sm)] shrink-0" />
            <div>
              <p className="m-0 font-display text-[28px] uppercase leading-[var(--lh-heading)] tracking-[0.02em] text-yellow-title">{site.name}</p>
              <p className="m-0 mt-[var(--s-2)] text-[length:var(--fs-small)] text-white/85">{site.tagline}</p>
            </div>
          </div>

          <nav data-foot aria-label="Rodapé">
            <p className="m-0 mb-[var(--s-3)] font-display uppercase tracking-[0.06em] text-yellow-title">Navegue</p>
            <ul className="m-0 grid gap-[var(--s-2)] p-0 list-none">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} onClick={(e) => go(e, n.href)} className="text-white no-underline hover:text-yellow-title">{n.label}</a></li>
              ))}
            </ul>
          </nav>

          {(contacts.length > 0 || address || hours) && (
            <div data-foot>
              <p className="m-0 mb-[var(--s-3)] font-display uppercase tracking-[0.06em] text-yellow-title">Contato</p>
              <ul className="m-0 grid gap-[var(--s-2)] p-0 list-none">
                {contacts.map((c) => (
                  <li key={c.label}>
                    <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{c.label}: {c.value}</a>
                  </li>
                ))}
                {address && <li>{address}</li>}
                {hours && <li>{hours}</li>}
              </ul>
            </div>
          )}
        </div>
        <div className="container mt-[var(--s-7)] border-t border-white/15 pt-[var(--s-5)] text-[length:var(--fs-small)] text-white/70">
          © {new Date().getFullYear()} {site.fullName}
        </div>
      </div>
    </footer>
  );
}
