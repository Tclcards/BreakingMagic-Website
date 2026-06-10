import type { Metadata } from "next";
import { RipDivider } from "@/components/Rip";
import { Eyebrow, GoldButton } from "@/components/ui";
import { SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Breaking Magic LLC is a live card-breaking collective: one operation handling sourcing, fulfillment, and payouts behind a roster of streamers.",
};

const VALUES = [
  {
    title: "Transparency on hits",
    body: "Every pack opened on camera, every hit shown and logged. Buyers see what they pulled; streamers see what they earned. No mystery math anywhere in the operation.",
  },
  {
    title: "Fast shipping",
    body: "A hit that takes a month to arrive kills trust faster than any bad break. Fulfillment runs from one facility on a clock we publish and hold ourselves to.",
  },
  {
    title: "Fair splits",
    body: "Streamers are the show. The split structure is agreed up front, in writing, and the numbers are visible — because a collective only works if the people on camera win too.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 md:pt-28">
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase tracking-tight text-silver sm:text-5xl">
          Where the break reveals the magic
        </h1>
        <div className="mt-6 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
          <p>
            Breaking Magic started with a simple observation: the best card
            breakers are entertainers, but most of their week disappears into
            everything that isn&apos;t entertaining — sourcing product,
            fronting cash, packing orders, answering shipping emails.
          </p>
          <p>
            So we built the machine around the show. One operation buys the
            product, stages the inventory, ships every hit, and handles every
            buyer — behind a roster of streamers who go live under one banner
            and share one reputation. The collective wins together.
          </p>
        </div>
      </section>

      <RipDivider />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Eyebrow>What we stand on</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-silver sm:text-4xl">
          Three rules, no exceptions
        </h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title}>
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-purple">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Legitimacy block ───────────── */}
      <section className="border-y border-carbon bg-carbon/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Eyebrow>The operating entity</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-silver sm:text-4xl">
            A real company behind the banner
          </h2>
          <dl className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gold">
                Entity
              </dt>
              <dd className="mt-1 text-base text-silver/90">
                Breaking Magic LLC
                {/* TODO: add state of formation, e.g. "a Texas limited liability company" */}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gold">
                Policies
              </dt>
              <dd className="mt-1 text-base text-silver/90">
                Published privacy policy and terms of service — see the footer.
                Break rules and shipping policy are posted on every show.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gold">
                Where we go live
              </dt>
              <dd className="mt-1 text-base text-silver/90">
                {/* TODO: replace with the real Whatnot channel link */}
                <a
                  href={SOCIAL_LINKS[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple underline decoration-purple/40 underline-offset-4 transition-colors hover:text-gold"
                >
                  Breaking Magic on Whatnot
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs uppercase tracking-widest text-gold">
                Contact
              </dt>
              <dd className="mt-1 text-base text-silver/90">
                {/* TODO: replace with the real business contact email */}
                hello@breakingmagic.example.com
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 md:py-24">
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-silver sm:text-4xl">
          Want in on the roster?
        </h2>
        <div className="mt-8">
          <GoldButton href="/apply">Apply to Stream</GoldButton>
        </div>
      </section>
    </>
  );
}
