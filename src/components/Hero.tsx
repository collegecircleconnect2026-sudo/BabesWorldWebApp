import { site } from "@/config/site";

/** Top-of-page introduction: name, tagline and the main call to action. */
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-cream-deep px-4 pt-14 pb-20 sm:pt-20 sm:pb-28"
    >
      {/* Decorative blobs — hidden from screen readers. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-10 h-52 w-52 rounded-full bg-sun/30" />
        <div className="absolute top-24 -right-12 h-64 w-64 rounded-full bg-sky/20" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-mint/20" />
      </div>

      <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <div className="text-center md:text-left">
          <p className="inline-block rounded-full bg-white/80 px-4 py-1 text-sm font-bold text-berry">
            For children ages 5–8
          </p>

          <h1
            id="hero-heading"
            className="mt-4 font-display text-4xl leading-tight font-extrabold text-ink sm:text-6xl"
          >
            {site.name}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-ink sm:text-xl">
            {site.tagline}
          </p>
          <p className="mt-3 text-base text-ink-soft sm:text-lg">
            {site.heroSupportingText}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href={`#${site.sections.worlds.id}`}
              className="inline-flex min-h-14 items-center rounded-full bg-coral px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-coral-dark"
            >
              {site.heroButtonLabel}
            </a>
            <a
              href={`#${site.sections.lesson.id}`}
              className="inline-flex min-h-14 items-center rounded-full border-2 border-ink/15 bg-white px-8 py-4 text-lg font-bold text-ink transition hover:bg-cream"
            >
              {site.heroSecondaryButtonLabel}
            </a>
          </div>
        </div>

        {/* Placeholder hero artwork — swap the file in `public/images/`. */}
        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <img
            src="/images/hero-placeholder.svg"
            alt="Illustration of four children exploring a colourful map together"
            width={640}
            height={520}
            className="w-full rounded-blob bg-white/60 shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
