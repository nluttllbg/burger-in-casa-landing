"use client";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { useGSAP, MOTION_OK, gsap } from "@/lib/gsap";
import { buttonInteraction } from "@/components/animations/animationPresets";
import { useLenis } from "@/components/animations/SmoothScroll";

type Props = {
  href: string;
  variant?: "primary" | "cta" | "secondary";
  children: ReactNode;
  className?: string;
  external?: boolean;
  onNavigate?: () => void;
  "data-intro"?: boolean;
};

/** Botão do DS (.btn--primary | --cta | --secondary). Âncoras rolam via Lenis. */
export default function Button({ href, variant = "primary", children, className = "", external, onNavigate, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollTo } = useLenis();

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => (ref.current ? buttonInteraction(ref.current) : undefined));
    return () => mm.revert();
  }, { scope: ref });

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      onNavigate?.();
      scrollTo(href);
      history.replaceState(null, "", href);
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={`btn btn--${variant} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(rest["data-intro"] ? { "data-intro": "" } : {})}
    >
      {children}
    </a>
  );
}
