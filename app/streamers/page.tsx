import type { Metadata } from "next";
import { RipDivider } from "@/components/Rip";
import { Eyebrow, GoldButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "For Streamers",
  description:
    "What Breaking Magic offers card-breaking streamers: product sourced and paid for, fulfillment and customer service handled, transparent splits and fast payouts.",
};

const HANDLED = [
  {
    title: "Sourcing",
    body: "We maintain distributor and vendor relationships and buy the product. You never front your own money for inventory or hunt allocations at retail.",
  },
  {
    title: "Inventory",
    body: "Product is received, verified, and staged at our facility. Your break calendar is stocked ahead of time, so you always know what you're ripping next.",
  },
  {
    title: "Shipping & fulfillment",
    body: "Every hit is sleeved, top-loaded, logged, and shipped from one place with tracking. Buyers get their cards fast, and you never pack a single order.",
  },
  {
    title: "Customer service",
    body: "Order questions, shipping issues, and disputes go to us, not your DMs. You stay focused on the stream; we keep buyers taken care of.",
  },
];

const EXPECTED = [
  {
    title: "A consistent schedule",
    body: "You commit to a regular weekly streaming schedule agreed during onboarding. Consistency is what builds an audience — yours and the collective's.",
  },
  {
    title: "Professional conduct",
    body: "Every hit shown on camera, every pack opened clean and in frame. No favoritism, no funny business. Buyers trust the banner because we earn it.",
  },
  {
    title: "Brand standards",
    body: "You stream under the Breaking Magic identity: our overlays, our titles, our look. Your personality is the show — the brand is the stage.",
  },
];

const THRIVES = [
  "You already break live — or you've been waiting for the inventory problem to be solved so you can start.",
  "You show up on schedule, every week, and treat the stream like a show.",
  "You're great on camera when a chase hit lands and when it doesn't.",
  "You'd rather spend your hours live than packing orders and answering shipping emails.",
];

// TODO: every percentage, dollar figure, and timeline below is a placeholder.
// Search the project for "TODO" to find and replace them all.
const FAQ = [
  {
    q: "How does the split work?",
    a: "You earn a percentage of the sales from every break you run. The exact split depends on the product category and your tier in the collective — typical splits are discussed during onboarding. (TODO: real split structure.) There are no hidden fees and no charge-backs against you for product cost.",
  },
  {
    q: "Do I have to buy my own inventory?",
    a: "No. Breaking Magic sources and pays for all product. You never put your own money into boxes, and you never carry inventory risk.",
  },
  {
    q: "When and how do I get paid?",
    a: "Breaks settle after the orders from that stream are fulfilled, and payouts run on a regular cycle. (TODO: exact payout cadence and method.) You can track every break and every payout.",
  },
  {
    q: "Whose Whatnot account do I stream on?",
    a: "You stream on a Breaking Magic channel under our seller account, which means our seller history, ratings, and audience work for you from your first show. (TODO: confirm account structure.)",
  },
  {
    q: "What categories do you break?",
    a: "Pokémon, One Piece, sports cards, Gundam, and other TCGs as the market moves. If you have a strong audience in a category we don't carry yet, tell us in your application.",
  },
  {
    q: "How many hours a week do I need to stream?",
    a: "We agree on a schedule together during onboarding. Most streamers in the collective run several shows a week. (TODO: minimum schedule requirement.) What matters most is that the schedule you commit to is one you keep.",
  },
  {
    q: "Do I need my own following to apply?",
    a: "An existing audience helps, but it's not a hard requirement. We care more about screen presence, reliability, and hustle. Strong applicants without a big following start with smaller breaks and grow.",
  },
  {
    q: "What equipment do I need?",
    a: "A clean, well-lit setup that can show product and hits clearly on camera. We provide overlay assets and guidance on the standard look during onboarding.",
  },
  {
    q: "Can I keep streaming my own content?",
    a: "Yes — what you do on your own channels stays yours. We only ask that scheduled Breaking Magic shows stay on the Breaking Magic banner and meet brand standards.",
  },
  {
    q: "What happens after I apply?",
    a: "We review applications weekly. If it looks like a fit, we'll reach out for a conversation and a trial break. If it's not a fit right now, you're welcome to apply again as your channel grows.",
  },
];

export default function StreamersPage() {
  return (
    <>
      {/* ───────────── Intro ───────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 md:pt-28">
        <Eyebrow>For streamers</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase tracking-tight text-silver sm:text-5xl">
          You bring the hype. We bring the machine.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Breaking under your own name means fronting money for product,
          packing orders at 2am, and answering shipping emails between streams.
          Breaking with us means you go live, run the show, and get paid —
          while a real operation handles everything else.
        </p>
      </section>

      {/* ───────────── The deal ───────────── */}
      <section className="border-y border-carbon bg-carbon/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Eyebrow>The deal</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-silver sm:text-4xl">
            Plain language, no fine print
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-2">
            <p className="text-base leading-relaxed text-silver/90">
              We source and pay for the product. You break it live on a
              Breaking Magic channel. Sales from your break are split between
              you and the collective — you earn a percentage of what your
              stream sells, with no inventory cost and no downside risk on
              product that doesn&apos;t move.
              {/* TODO: replace with the real revenue split once finalized. */}
            </p>
            <ul className="space-y-4">
              {[
                ["Your cut", "A transparent percentage of break sales (TODO: %)"],
                ["Your cost", "Zero — product is bought and owned by Breaking Magic"],
                ["Your risk", "None on inventory; you're never holding the bag"],
                ["Payout", "Fast settlement after fulfillment (TODO: cadence)"],
              ].map(([label, value]) => (
                <li key={label} className="flex gap-4">
                  <span className="w-24 shrink-0 font-mono text-xs uppercase tracking-widest text-gold">
                    {label}
                  </span>
                  <span className="text-sm leading-relaxed text-muted">
                    {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────── What's handled ───────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Eyebrow>Handled for you</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-silver sm:text-4xl">
          Everything but the stream
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {HANDLED.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-carbon bg-carbon/40 p-7"
            >
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-silver">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <RipDivider />

      {/* ───────────── What's expected ───────────── */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Eyebrow>Expected of you</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-silver sm:text-4xl">
          The bar is high on purpose
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {EXPECTED.map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-purple">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── Who thrives ───────────── */}
      <section className="border-y border-carbon bg-carbon/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
          <Eyebrow>Who thrives here</Eyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-silver sm:text-4xl">
            Sound like you?
          </h2>
          <ul className="mt-8 max-w-3xl space-y-4">
            {THRIVES.map((line) => (
              <li key={line} className="flex gap-3">
                <span aria-hidden="true" className="mt-1 text-gold">
                  ✦
                </span>
                <span className="text-base leading-relaxed text-silver/90">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── FAQ ───────────── */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-silver sm:text-4xl">
          Questions, answered
        </h2>
        <div className="mt-10 divide-y divide-carbon border-y border-carbon">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-bold text-silver [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-gold transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ───────────── CTA ───────────── */}
      <section className="border-t border-carbon bg-carbon/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 md:py-24">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-silver sm:text-4xl">
            The application takes five minutes
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Tell us who you are, what you break, and when you can go live.
          </p>
          <div className="mt-8">
            <GoldButton href="/apply">Apply to Stream</GoldButton>
          </div>
        </div>
      </section>
    </>
  );
}
