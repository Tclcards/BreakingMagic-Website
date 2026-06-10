import type { Metadata } from "next";
import Rip from "@/components/Rip";
import { Eyebrow, GoldButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The Breaking Magic process step by step: apply, onboard, get product allocated, go live, we fulfill every hit, you get paid.",
};

const STEPS = [
  {
    label: "Step 01",
    title: "Apply & review",
    body: "Fill out the application — who you are, where you stream, what you break. We review every application weekly and reply to the ones that look like a fit. Strong screen presence and reliability matter more than follower count.",
  },
  {
    label: "Step 02",
    title: "Onboarding & account setup",
    body: "We have a real conversation about splits, schedule, and expectations, then get you set up on a Breaking Magic channel with our overlays and show format. You'll run a trial break so both sides know it works before committing.",
  },
  {
    label: "Step 03",
    title: "Product allocation",
    body: "We source and pay for the product, verify it at our facility, and build your break calendar. Before every show you know exactly what you're ripping, how it's priced, and how the break is structured.",
  },
  {
    label: "Step 04",
    title: "Going live",
    body: "You run the show on your agreed schedule — the energy, the reveals, the chat. Every pack is opened clean and in frame. The banner brings returning buyers; you turn them into your regulars.",
  },
  {
    label: "Step 05",
    title: "Fulfillment after the break",
    body: "When the stream ends, your work is done. Every hit is sleeved, logged, and shipped with tracking from our facility, and our team handles every buyer question. Fast, careful fulfillment is how the collective keeps its reputation.",
  },
  {
    label: "Step 06",
    title: "Payout",
    body: "Once the break's orders are fulfilled, the break settles and your cut is paid out on a regular cycle. Every break and every payout is tracked, so the numbers are never a mystery.", // TODO: real payout cadence
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-20 sm:px-6 md:pt-28">
        <Eyebrow>How it works</Eyebrow>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase tracking-tight text-silver sm:text-5xl">
          From application to payout
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Six steps, no mystery. This is the whole machine — what we do, what
          you do, and where the money flows.
        </p>
      </section>

      {/* Vertical steps with the rip as the connecting spine */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 md:pb-28">
        <ol className="relative ml-3 sm:ml-6">
          {/* the spine */}
          <div
            aria-hidden="true"
            className="absolute -left-3 top-0 h-full w-8 sm:-left-4 sm:w-10"
          >
            <Rip className="h-full w-full opacity-90" />
          </div>

          {STEPS.map((step) => (
            <li key={step.label} className="relative pb-14 pl-10 last:pb-0 sm:pl-14">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
                {step.label}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-silver">
                {step.title}
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-carbon bg-carbon/30">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:px-6 md:py-24">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-silver sm:text-4xl">
            Step one starts here
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Applications are reviewed weekly. The rest of the machine is ready.
          </p>
          <div className="mt-8">
            <GoldButton href="/apply">Apply to Stream</GoldButton>
          </div>
        </div>
      </section>
    </>
  );
}
