# CLAUDE.md — PROJECT DEVELOPMENT RULES

## Core Rules

This project must strictly follow the provided Design System and visual reference.

The Design System is the single source of truth for all visual decisions.

Never redesign, reinterpret, simplify, or arbitrarily modify the approved visual identity.

Design System source files (Burger in Casa — Design System v1, 19/11/2026) live in `docs/design-system/`
(`tokens.json`, `variables.css`). Their tokens are mirrored in `src/styles/design-tokens.css`.
Images live in `public/images/` with their original DS file names.

## Mandatory Animation Architecture

1. Lenis MUST be used for smooth scrolling throughout the website.
2. GSAP MUST be used for all movement animations.
3. GSAP ScrollTrigger MUST control all scroll-based animations.
4. Lenis and ScrollTrigger MUST be properly synchronized.
5. All GSAP animations must be properly initialized and cleaned up inside React components.
6. Use GSAP context and React useGSAP where appropriate.
7. Avoid duplicate ScrollTrigger instances.
8. Never animate the same property simultaneously with CSS and GSAP.
9. Avoid independent scroll systems.
10. Respect prefers-reduced-motion accessibility settings.

## Technology Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Lenis

## Development Rules

- Follow the original Design System.
- Maintain reusable components.
- Keep code modular and maintainable.
- Use semantic HTML.
- Optimize images and videos.
- Prevent layout shifts.
- Ensure responsive behavior.
- Avoid unnecessary dependencies.
- Validate desktop, tablet, and mobile layouts.
- Never introduce horizontal overflow.
- Preserve accessibility.

## Animation Standards

- Use power3.out for cinematic entrance animations unless the Design System specifies otherwise.
- Use staggered sequences for grouped elements.
- Prefer transform and opacity for performance.
- Avoid excessive animation.
- Use ScrollTrigger for scroll-based scenes.
- Properly clean up animations when components unmount.

## Project Architecture Notes

- `src/lib/gsap.ts` registers GSAP plugins once (ScrollTrigger + useGSAP).
- `src/components/animations/SmoothScroll.tsx` creates the single Lenis instance, drives it from
  `gsap.ticker`, forwards Lenis scroll events to `ScrollTrigger.update`, and exposes it via `useLenis()`.
  Never create another Lenis instance. Anchor navigation goes through `useLenis().scrollTo`.
- `src/components/animations/animationPresets.ts` holds every reusable preset (textReveal, imageReveal,
  clipReveal, fadeUp, fadeIn, staggerReveal, parallax, scaleReveal, horizontalReveal, scrollPin,
  menuTransition, buttonInteraction, sectionTransition). New animations should reuse these.
- Every section animates inside `useGSAP` + `gsap.matchMedia()` gated by
  `(prefers-reduced-motion: no-preference)`; with reduced motion, content renders static and Lenis is off.
- CSS handles only static styles and the DS `.btn` hover. Do not add CSS keyframes for movement.
- Real contact data goes ONLY in `src/content/site.ts`. Empty fields render nothing — never invent
  phone numbers, e-mails or links.

## Final Validation

Before completing the project, verify:

- Visual fidelity.
- Responsiveness.
- Navigation functionality.
- Animation synchronization.
- ScrollTrigger behavior.
- Performance.
- Accessibility.
- Absence of horizontal overflow.
- Absence of console errors.

IMPORTANT: This file is mandatory and must remain in the project root.
