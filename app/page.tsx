import type { Metadata } from "next";
import Link from "next/link";
import Rip, { RipDivider } from "@/components/Rip";
import { Eyebrow, GoldButton } from "@/components/ui";
import { MarkBM } from "@/components/Wordmark";
import { SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Breaking Magic — Live Card Breaking Collective",
  description:
    "Breaking Magic is a live card-breaking collective on Whatnot. We handle sourcing, inventory, and fulfillment — you stream, you earn. Apply to stream.",
};

/*
  TODO: replace every placeholder stat below with real numbers.
  These are intentionally illustrative values so the page reads correctly while
  the real figures are gathered.
*/
const STATS = [
  { value: "$1.2M+", label: "GMV broken" }, // TODO: real GMV figure
  { value: "3,400+", label: "Breaks run" }, // TODO: real break count
  { value: "18", label: "Streamers in the collective" }, // TODO: real roster size
  { value: "48h", label: "Fulfillment turnaround" }, // TODO: real turnaround time
];

const OFFER = [
  {
    title: "Inventory & sourcing handled",
    body: "We buy the product, manage allocations, and keep your break calendar stocked. You never front money for boxes or chase distributors.",
  },
  {
    title: "Fulfillment & shipping handled",
    body: "Every hit is sleeved, logged, and shipped from our facility. Customer service included — you never touch a label printer.",
  },
  {
    title: "You stream, you earn",
    body: "Go live under the Breaking Magic banner, rip the product, bring the energy. Transparent splits, fast payouts, no back-office.",
  },
];

const STEPS = [
  { n: "01", title: "Apply", body: "Tell us who you are and what you break." },
  { n: "02", title: "Onboard", body: "Account setup, brand kit, first allocation." },
  { n: "03", title: "Go live", body: "Rip product on your schedule, under the banner." },
  { n: "04", title: "Get paid", body: "Breaks settle fast. Track every payout." },
];

function HeroLockup() {
  return (
    <h1 className="font-display font-extrabold uppercase leading-none tracking-tight">
      <span className="sr-only">Breaking Magic</span>
      {/* Desktop: BREAKING | vertical rip | MAGIC */}
      <span
        aria-hidden="true"
        className="hidden items-stretch justify-center md:flex"
      >
        <span className="lockup-breaking flex items-center text-[clamp(3rem,8vw,7rem)]">
          Breaking
        </span>
        <span className="relative mx-2 w-16 lg:w-24">
          {/* The tear bursts in from the top of the hero and stops above the tagline. */}
          <Rip className="animate-rip-open absolute -top-[26rem] left-0 h-[calc(100%+28.5rem)] w-full" />
        </span>
        <span className="lockup-magic flex items-center text-[clamp(3rem,8vw,7rem)]">
          Magic
        </span>
      </span>
      {/* Mobile: BREAKING stacked over MAGIC, split by a horizontal rip */}
      <span aria-hidden="true" className="flex flex-col items-center md:hidden">
        <span className="lockup-breaking text-[clamp(2.6rem,13vw,4rem)]">
          Breaking
        </span>
        <span className="relative -mx-6 my-1 h-10 w-[calc(100%+3rem)]">
          <Rip
            orientation="horizontal"
            className="animate-rip-open-x absolute inset-0 h-full w-full"
          />
        </span>
        <span className="lockup-magic text-[clamp(2.6rem,13vw,4rem)]">
          Magic
        </span>
      </span>
    </h1>
  );
}

export default function Home() {
  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="mx-auto flex min-h-[78vh] max-w-6xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
          <HeroLockup />
          <p className="animate-fade-rise mt-10 max-w-xl text-lg text-muted sm:text-xl">
            {SITE_TAGLINE}
          </p>
          <div className="animate-fade-rise mt-10">
            <GoldButton href="/apply">Apply to Stream</GoldButton>
          </div>
        </div>
      </section>

      {/* ─────────────────────── Proof bar ─────────────────────── */}
      <section aria-label="By the numbers" className="border-y border-carbon bg-carbon/50">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 sm:px-6 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="font-mono text-3xl font-semibold text-gold sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* ──────────────────── The offer, condensed ──────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Eyebrow>The offer</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold uppercase tracking-tight text-silver sm:text-4xl">
          A real operation behind your stream
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {OFFER.map((card) => (
            <Link
              key={card.title}
              href="/streamers"
              className="group rounded-lg border border-carbon bg-carbon/40 p-7 transition-colors hover:border-purple/50"
            >
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-silver">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {card.body}
              </p>
              <span className="mt-5 inline-block font-mono text-xs uppercase tracking-widest text-purple transition-colors group-hover:text-gold">
                For streamers →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ──────────────────── How it works teaser ──────────────────── */}
      <RipDivider />
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
        <Eyebrow>How it works</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-silver sm:text-4xl">
          Four steps from application to payout
        </h2>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <li key={step.n}>
              <span className="font-mono text-sm text-gold">{step.n}</span>
              <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-silver">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
        <Link
          href="/how-it-works"
          className="mt-10 inline-block font-mono text-sm uppercase tracking-widest text-purple transition-colors hover:text-gold"
        >
          See the full process →
        </Link>
      </section>

      {/* ───────────────────────── Final CTA ───────────────────────── */}
      <section className="border-t border-carbon bg-carbon/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 md:py-28">
          <MarkBM className="text-2xl" />
          <h2 className="mt-6 font-display text-4xl font-extrabold uppercase tracking-tight text-silver sm:text-5xl">
            Ready to break?
          </h2>
          <p className="mt-4 max-w-md text-muted">
            We review applications weekly. If it&apos;s a fit, you could be live
            under the banner within weeks.
          </p>
          <div className="mt-8">
            <GoldButton href="/apply">Apply to Stream</GoldButton>
          </div>
        </div>
      </section>
    </>
  );
}
