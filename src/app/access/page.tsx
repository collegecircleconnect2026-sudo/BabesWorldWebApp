import type { Metadata } from "next";

import AccessKeyForm from "@/components/AccessKeyForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Member access — ${site.wordmark}`,
  description:
    "Families and classrooms unlock the full BabesWorld lesson library with an access key.",
};

const steps = [
  {
    icon: "🏫",
    title: "Get your key",
    body: "Your school, agency or BABES program gives each family a personal access key.",
  },
  {
    icon: "🔑",
    title: "Enter it once",
    body: "Type the key here. It is saved on your device so kids can jump straight back in.",
  },
  {
    icon: "🗺️",
    title: "Explore together",
    body: "Every stop on the map unlocks, with progress saved for each child.",
  },
];

/** Planned family login flow — a working mock-up, no real accounts yet. */
export default function AccessPage() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="bg-linear-to-b from-sky-light via-cream to-cream px-4 py-16 sm:py-24"
      >
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div className="text-center lg:pt-6 lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/90 px-4 py-1.5 text-xs font-extrabold tracking-[0.14em] text-sky uppercase shadow-sm">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-sky" />
              Screen preview
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] font-bold tracking-tight text-navy sm:text-6xl">
              Member access
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">
              BabesWorld families and classrooms unlock the full lesson library
              with an access key. This is a preview of how that sign-in will
              work in the complete platform.
            </p>

            <ol className="mt-10 grid list-none gap-4 text-left">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className="flex gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-navy/10"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-12 shrink-0 items-center justify-center rounded-full bg-cream-deep text-2xl"
                  >
                    {step.icon}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold text-navy">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.title}
                    </span>
                    <span className="mt-0.5 block leading-relaxed text-ink-soft">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <AccessKeyForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
