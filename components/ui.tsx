import Link from "next/link";
import type { ReactNode } from "react";

/* Primary CTA: gold is precious — reserved for the rip and these buttons. */
export function GoldButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-md bg-gold px-7 py-3.5 font-display text-base font-bold uppercase tracking-wide text-ink shadow-[0_0_24px_rgba(244,194,82,0.35)] transition-colors hover:bg-gold-hot ${className}`}
    >
      {children}
    </Link>
  );
}

/* Small mono label above a headline. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-mono text-xs uppercase tracking-[0.25em] text-purple ${className}`}
    >
      {children}
    </p>
  );
}
