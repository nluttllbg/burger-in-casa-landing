/**
 * Conteúdo real do site. Tudo aqui vem do Design System (tokens.json + nomes das imagens).
 * Campos de contato ficam vazios até o cliente informar: campos vazios NÃO são renderizados.
 * Nunca invente telefone, e-mail ou links.
 */
export const site = {
  name: "Burger in Casa",
  fullName: "Burger in Casa | Hamburgueria",
  tagline: "Especialista em Burgers Autorais · Curta nossos Defumados",
  contact: {
    whatsapp: "", // só dígitos com DDI, ex.: 5565999999999
    phone: "",
    email: "",
    instagram: "", // URL completa
    address: "",
    hours: "",
  },
};

export const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Cardápio", href: "#cardapio" },
  { label: "Defumados", href: "#defumados" },
  { label: "Contato", href: "#contato" },
] as const;

export type MenuItem = { name: string; image: string; alt: string };

export const menu: MenuItem[] = [
  { name: "Rodízio de Mini Burgers", image: "/burger-in-casa-landing/images/card-rodizio-mini-burgers.webp", alt: "Tábua de madeira com mini burgers enfileirados" },
  { name: "Pulled Pork", image: "/burger-in-casa-landing/images/card-pulled-pork.webp", alt: "Burger de pulled pork com cheddar derretido" },
  { name: "Batata Cheddar & Bacon", image: "/burger-in-casa-landing/images/card-batata-cheddar-bacon.webp", alt: "Cesta de batatas com cheddar e bacon" },
  { name: "Coxinha da Burger", image: "/burger-in-casa-landing/images/card-coxinha-da-burger.webp", alt: "Coxinhas recheadas sobre tábua com molho" },
];

export function contactLinks() {
  const c = site.contact;
  const out: { label: string; value: string; href: string; external?: boolean }[] = [];
  if (c.whatsapp) out.push({ label: "WhatsApp", value: c.whatsapp, href: `https://wa.me/${c.whatsapp.replace(/\D/g, "")}`, external: true });
  if (c.phone) out.push({ label: "Telefone", value: c.phone, href: `tel:${c.phone.replace(/[^\d+]/g, "")}` });
  if (c.email) out.push({ label: "E-mail", value: c.email, href: `mailto:${c.email}` });
  if (c.instagram) out.push({ label: "Instagram", value: c.instagram.replace(/^https?:\/\/(www\.)?/, ""), href: c.instagram, external: true });
  return out;
}
