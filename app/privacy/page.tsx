import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Breaking Magic LLC.",
};

/*
  TODO: This entire page is placeholder structure for the attorney to fill in.
  Each heading below is a section commonly found in a privacy policy — replace
  the placeholder paragraphs with real policy language.
*/
const SECTIONS = [
  "Information we collect",
  "How we use your information",
  "Sharing with third parties",
  "Data retention",
  "Your rights and choices",
  "Children's privacy",
  "Changes to this policy",
  "How to contact us",
];

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-20 sm:px-6 md:pt-28">
      <Eyebrow>Legal</Eyebrow>
      <h1 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-silver">
        Privacy Policy
      </h1>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
        {/* TODO: set the real effective date */}
        Effective date: TODO
      </p>
      <div className="mt-10 space-y-10">
        {SECTIONS.map((heading) => (
          <div key={heading}>
            <h2 className="font-display text-xl font-bold uppercase tracking-wide text-silver">
              {heading}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Placeholder — final policy language for this section to be
              provided by counsel for Breaking Magic LLC.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
