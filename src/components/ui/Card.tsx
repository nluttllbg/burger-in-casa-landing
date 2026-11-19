import Image from "next/image";
import type { MenuItem } from "@/content/site";

export type CardShape = "dominant" | "vertical" | "compact" | "horizontal";

/** DS .card — creme, raio lg, sombra card, foto circular com borda branca 6px. Forma varia por composição. */
export default function Card({ item, index, shape, className = "" }: { item: MenuItem; index: number; shape: CardShape; className?: string }) {
  const layout = {
    dominant: "flex-col justify-center text-center p-[var(--s-6)] md:p-[var(--s-7)]",
    vertical: "flex-col justify-end text-center p-[var(--s-6)_var(--s-5)]",
    compact: "flex-col justify-center text-center p-[var(--s-5)]",
    horizontal: "flex-row items-center text-left gap-[var(--s-5)] p-[var(--s-5)] md:p-[var(--s-6)]",
  }[shape];
  const img = {
    dominant: "w-[min(62%,340px)] lg:w-auto lg:h-[62%] lg:max-h-[340px]",
    vertical: "w-[min(82%,220px)] lg:w-auto lg:h-[58%] lg:max-h-[220px]",
    compact: "w-[min(64%,150px)] lg:w-auto lg:h-[52%] lg:max-h-[150px]",
    horizontal: "w-[min(38%,170px)] shrink-0 lg:w-auto lg:h-full lg:max-h-[170px]",
  }[shape];
  const titleSize = shape === "dominant" ? "md:text-[clamp(26px,2.6vw,36px)]" : "";

  return (
    <article data-card className={`card relative flex h-full overflow-hidden ${layout} ${className}`}>
      <span aria-hidden className="absolute left-[var(--s-5)] top-[var(--s-4)] font-display text-[length:var(--fs-small)] tracking-[0.06em] text-wood">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div data-card-photo className={`relative aspect-square ${shape === "horizontal" ? "" : "mx-auto"} ${img}`}>
        <Image src={item.image} alt={item.alt} fill sizes="(max-width: 767px) 60vw, 340px" className="card__img" />
      </div>
      <h3 data-card-title className={`card__title m-0 ${shape === "horizontal" ? "" : "mt-[var(--s-4)]"} ${titleSize}`}>{item.name}</h3>
    </article>
  );
}
