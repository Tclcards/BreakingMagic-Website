"use client";

import { useState } from "react";
import { APPLY_ENDPOINT } from "@/lib/config";

const CATEGORIES = ["Pokémon", "One Piece", "Sports", "Gundam", "Other"];

type Errors = Partial<Record<string, string>>;

const inputClass =
  "w-full rounded-md border border-carbon bg-carbon/60 px-4 py-3 text-base text-silver placeholder:text-muted/60 focus:border-gold focus:outline-none";

function Field({
  label,
  htmlFor,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-mono text-xs uppercase tracking-widest text-silver"
      >
        {label}
        {optional && <span className="ml-2 text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-sm text-gold" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ApplyForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const whatnot = String(data.get("whatnot") ?? "").trim();
    const audience = String(data.get("audience") ?? "").trim();
    const schedule = String(data.get("schedule") ?? "").trim();
    const why = String(data.get("why") ?? "").trim();
    const categories = data.getAll("categories").map(String);

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Tell us your name.";
    if (!email) {
      nextErrors.email = "We need an email to reach you.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "That email doesn't look right — double-check it.";
    }
    if (!whatnot)
      nextErrors.whatnot =
        "Your Whatnot username (or the one you plan to use).";
    if (!audience)
      nextErrors.audience =
        "A rough number is fine — and “starting from zero” is a valid answer.";
    if (categories.length === 0)
      nextErrors.categories = "Pick at least one category.";
    if (!schedule)
      nextErrors.schedule = "Give us an idea of when you could go live.";
    if (!why) nextErrors.why = "One or two sentences is plenty.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = form.querySelector<HTMLElement>(
        "[aria-invalid='true'], input, textarea"
      );
      firstInvalid?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(APPLY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: String(data.get("phone") ?? "").trim(),
          whatnot,
          socials: String(data.get("socials") ?? "").trim(),
          audience,
          categories,
          schedule,
          why,
          // Honeypot — must stay empty. Mirrors the hidden field below.
          company: String(data.get("company") ?? "").trim(),
        }),
      });

      // Surface server-side validation errors next to the right fields.
      if (response.status === 422) {
        const payload = (await response.json().catch(() => null)) as {
          fieldErrors?: Errors;
        } | null;
        setErrors(payload?.fieldErrors ?? {});
        setStatus("idle");
        return;
      }

      if (!response.ok) throw new Error(`Apply endpoint returned ${response.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="mt-12 rounded-lg border border-gold/40 bg-carbon/60 p-8 text-center"
      >
        <p className="font-display text-2xl font-bold uppercase tracking-tight text-gold">
          Application received
        </p>
        <p className="mt-3 text-muted">
          We review applications weekly. If it looks like a fit, you&apos;ll
          hear from us by email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-12 space-y-8">
      {/*
        Honeypot: hidden from real users (and screen readers), but bots that
        auto-fill every field will populate it — the server drops those.
      */}
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field label="Name" htmlFor="name" error={errors.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field label="Email" htmlFor="email" error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field label="Phone" htmlFor="phone" optional>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
        />
      </Field>

      <Field label="Whatnot username" htmlFor="whatnot" error={errors.whatnot}>
        <input
          id="whatnot"
          name="whatnot"
          type="text"
          aria-invalid={!!errors.whatnot}
          aria-describedby={errors.whatnot ? "whatnot-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field label="Other socials" htmlFor="socials" optional>
        <input
          id="socials"
          name="socials"
          type="text"
          placeholder="TikTok, Instagram, YouTube — handles or links"
          className={inputClass}
        />
      </Field>

      <Field
        label="Current followers / average viewers"
        htmlFor="audience"
        error={errors.audience}
      >
        <input
          id="audience"
          name="audience"
          type="text"
          placeholder="e.g. 2,400 followers on Whatnot, ~60 live viewers"
          aria-invalid={!!errors.audience}
          aria-describedby={errors.audience ? "audience-error" : undefined}
          className={inputClass}
        />
      </Field>

      <fieldset>
        <legend className="mb-2 block font-mono text-xs uppercase tracking-widest text-silver">
          What do you break?
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 rounded-md border border-carbon bg-carbon/60 px-4 py-3 text-sm text-silver transition-colors has-checked:border-gold has-checked:text-gold"
            >
              <input
                type="checkbox"
                name="categories"
                value={category}
                className="h-4 w-4 accent-[#f4c252]"
              />
              {category}
            </label>
          ))}
        </div>
        {errors.categories && (
          <p className="mt-2 text-sm text-gold" role="alert">
            {errors.categories}
          </p>
        )}
      </fieldset>

      <Field
        label="Schedule availability"
        htmlFor="schedule"
        error={errors.schedule}
      >
        <input
          id="schedule"
          name="schedule"
          type="text"
          placeholder="e.g. weekday evenings + Saturday, 3–4 shows a week"
          aria-invalid={!!errors.schedule}
          aria-describedby={errors.schedule ? "schedule-error" : undefined}
          className={inputClass}
        />
      </Field>

      <Field label="Why you?" htmlFor="why" error={errors.why}>
        <textarea
          id="why"
          name="why"
          rows={5}
          placeholder="What makes your streams worth watching?"
          aria-invalid={!!errors.why}
          aria-describedby={errors.why ? "why-error" : undefined}
          className={inputClass}
        />
      </Field>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-md border border-gold/40 bg-carbon/60 p-4 text-sm text-silver"
        >
          Something went wrong sending your application. Give it another try
          in a minute — or email us instead.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-gold px-7 py-4 font-display text-base font-bold uppercase tracking-wide text-ink shadow-[0_0_24px_rgba(244,194,82,0.35)] transition-colors hover:bg-gold-hot disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}
