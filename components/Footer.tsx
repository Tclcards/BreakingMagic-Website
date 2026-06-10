import Link from "next/link";
import { LEGAL_LINKS, NAV_LINKS, SOCIAL_LINKS } from "@/lib/site";
import { MarkBM } from "@/components/Wordmark";

export default function Footer() {
  return (
    <footer className="border-t border-carbon bg-ink">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" aria-label="Breaking Magic — home">
              <MarkBM className="text-2xl" />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted">
              A live card-breaking collective. We handle the cards. You run the
              show.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
                Site
              </h2>
              <ul className="mt-3 space-y-2">
                {[{ href: "/", label: "Home" }, ...NAV_LINKS, { href: "/apply", label: "Apply" }].map(
                  (link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-silver transition-colors hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
                Follow
              </h2>
              <ul className="mt-3 space-y-2">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-silver transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
                Legal
              </h2>
              <ul className="mt-3 space-y-2">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-silver transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <p className="mt-12 border-t border-carbon pt-6 font-mono text-xs text-muted">
          © {new Date().getFullYear()} Breaking Magic LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
