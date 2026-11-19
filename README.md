# Burger in Casa — Landing Page

Landing page da Burger in Casa em Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP e Lenis.

## Desenvolvimento local

```bash
npm ci
npm run dev
```

## Build estático

```bash
npm ci
npm run build
```

O projeto está configurado para exportação estática em `out/`, com o base path do repositório `burger-in-casa-landing`. A cada push na branch `main`, o GitHub Actions compila e publica o site no GitHub Pages.

Site: https://nluttllbg.github.io/burger-in-casa-landing/

- Conteúdo e contatos: `src/content/site.ts`
- Design system: `docs/design-system/`
- Regras do projeto: `CLAUDE.md`
