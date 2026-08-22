import { site } from "@/config/site";

/** Top-of-page introduction: name, mission and the main call to action. */
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-cream-deep px-4 pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      {/* Decorative blobs — hidden from screen readers. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-10 h-52 w-52 rounded-full bg-gold/20" />
        <div className="absolute top-24 -right-12 h-64 w-64 rounded-full bg-navy/10" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-crimson/10" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <p className="inline-block rounded-full border border-navy/15 bg-white/90 px-4 py-1.5 text-sm font-bold tracking-wide text-navy shadow-sm">
            {site.heroEyebrow}
          </p>

          <h1
            id="hero-heading"
            className="mt-5 font-display text-5xl leading-tight font-bold text-navy sm:text-7xl"
          >
            {site.name}
          </h1>

          <p className="mt-2 text-sm font-bold tracking-[0.14em] text-crimson uppercase sm:text-base">
            {site.fullName}
          </p>

          <p className="mt-5 text-lg leading-relaxed text-ink sm:text-xl">
            {site.tagline}
          </p>
          <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
            {site.heroSupportingText}
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3 md:justify-start">
            <a
              href={`#${site.sections.worlds.id}`}
              className="inline-flex min-h-14 items-center rounded-full bg-crimson px-8 py-4 text-lg font-bold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-crimson-deep hover:shadow-xl"
            >
              {site.heroButtonLabel}
            </a>
            <a
              href={`#${site.sections.lesson.id}`}
              className="inline-flex min-h-14 items-center rounded-full border-2 border-navy/20 bg-white px-8 py-4 text-lg font-bold text-navy transition duration-200 hover:-translate-y-0.5 hover:border-navy/40 hover:bg-cream"
            >
              {site.heroSecondaryButtonLabel}
            </a>
          </div>
        </div>

        {/* Placeholder hero artwork — swap the file in `public/images/`. */}
        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <img
            src="/images/hero-placeholder.svg"
            alt="Illustration of Buttons, Bows and their friends exploring a colorful map together"
            width={640}
            height={520}
            className="w-full rounded-blob bg-white/70 shadow-xl ring-1 ring-navy/10"
          />
        </div>
      </div>

      {/* A slim rainbow ribbon grounds the hero in the community motif. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 flex h-2"
      >
        <div className="flex-1 bg-rainbow-red" />
        <div className="flex-1 bg-rainbow-orange" />
        <div className="flex-1 bg-rainbow-yellow" />
        <div className="flex-1 bg-rainbow-green" />
        <div className="flex-1 bg-rainbow-teal" />
        <div className="flex-1 bg-rainbow-blue" />
        <div className="flex-1 bg-rainbow-violet" />
      </div>
    </section>
  );
}
