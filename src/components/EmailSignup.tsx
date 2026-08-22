"use client";

import { useState } from "react";

import { FORMSPREE_ENDPOINT, site } from "@/config/site";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Name + email signup.
 *
 * The form posts straight to Formspree — this website has no database and
 * stores nothing on its own server. Set NEXT_PUBLIC_FORMSPREE_ID to switch it
 * on (see the README).
 */
export default function EmailSignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const configured = FORMSPREE_ENDPOINT !== "";
  const copy = site.sections.signup;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      // Formspree sends back a helpful message when something is wrong.
      const body = await response.json().catch(() => null);
      const firstError = body?.errors?.[0]?.message as string | undefined;
      setErrorMessage(
        firstError ?? "Something went wrong. Please try again in a moment.",
      );
      setStatus("error");
    } catch {
      setErrorMessage(
        "We couldn't reach the server. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  return (
    <section
      id={copy.id}
      aria-labelledby="signup-heading"
      className="bg-cream px-4 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-xl rounded-blob bg-white p-6 shadow-xl ring-1 ring-navy/10 sm:p-10">
        {status === "success" ? (
          /* ---- Success state ------------------------------------------- */
          <div className="text-center" role="status">
            <p className="text-5xl" aria-hidden="true">
              💌
            </p>
            <h2
              id="signup-heading"
              className="mt-3 font-display text-2xl font-bold sm:text-3xl"
            >
              {copy.successTitle}
            </h2>
            <p className="mt-2 text-lg text-ink-soft">{copy.successBody}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 min-h-14 rounded-full border-2 border-ink/15 px-6 py-3 text-base font-bold transition hover:bg-cream"
            >
              Add another person
            </button>
          </div>
        ) : (
          <>
            <h2
              id="signup-heading"
              className="text-center font-display text-2xl font-bold text-navy sm:text-3xl"
            >
              {copy.title}
            </h2>
            <p className="mt-2 text-center text-lg text-ink-soft">
              {copy.intro}
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-bold text-ink"
                >
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Alex Rivera"
                  className="mt-1 min-h-14 w-full rounded-2xl border-2 border-ink/15 bg-cream px-4 py-3 text-lg text-ink placeholder:text-ink-soft/60 focus:border-navy focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-bold text-ink"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-1 min-h-14 w-full rounded-2xl border-2 border-ink/15 bg-cream px-4 py-3 text-lg text-ink placeholder:text-ink-soft/60 focus:border-navy focus:outline-none"
                />
              </div>

              {/* Formspree's built-in spam trap — real people never see it. */}
              <input
                type="text"
                name="_gotcha"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <button
                type="submit"
                disabled={status === "submitting" || !configured}
                className="min-h-14 w-full rounded-full bg-crimson px-6 py-4 text-lg font-bold text-white transition hover:bg-crimson-deep disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "submitting" ? "Sending…" : copy.buttonLabel}
              </button>

              <p aria-live="polite" className="min-h-6 text-center">
                {status === "error" && (
                  <span className="font-bold text-crimson">{errorMessage}</span>
                )}
              </p>

              {!configured && (
                <p className="rounded-2xl bg-gold/15 px-4 py-3 text-center text-sm font-semibold text-ink">
                  Signup isn&apos;t connected yet. Add your Formspree form ID as{" "}
                  <code className="font-mono">NEXT_PUBLIC_FORMSPREE_ID</code> to
                  switch it on — see the README.
                </p>
              )}

              <p className="text-center text-sm text-ink-soft">
                We only use your address to send BABES World updates. Nothing is
                stored on this website.
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
