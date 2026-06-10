import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui";
import ApplyForm from "./ApplyForm";

export const metadata: Metadata = {
  title: "Apply to Stream",
  description:
    "Apply to join the Breaking Magic collective. Tell us who you are, what you break, and when you can go live — we review applications weekly.",
};

export default function ApplyPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 pb-20 pt-20 sm:px-6 md:pt-28">
      <Eyebrow>Apply</Eyebrow>
      <h1 className="mt-3 font-display text-4xl font-extrabold uppercase tracking-tight text-silver sm:text-5xl">
        Apply to stream
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Five minutes, no essay required. Tell us who you are, what you break,
        and when you can go live. We review applications weekly.
      </p>
      <ApplyForm />
    </section>
  );
}
