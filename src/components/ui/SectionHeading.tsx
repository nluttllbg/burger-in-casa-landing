import type { ReactNode } from "react";

/** DS .section__title, com linhas mascaradas para o textReveal. */
export default function SectionHeading({ lines, id, className = "" }: { lines: ReactNode[]; id?: string; className?: string }) {
  return (
    <h2 id={id} className={`section__title ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <span className="block" data-line>{l}</span>
        </span>
      ))}
    </h2>
  );
}
