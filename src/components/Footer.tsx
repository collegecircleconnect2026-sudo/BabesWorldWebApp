import { site } from "@/config/site";

/** Navy brand footer: logo, mission, taglines and section links. */
export default function Footer() {
  const year = new Date().getFullYear();
  const links = [
    site.sections.worlds,
    site.sections.lesson,
    site.sections.community,
    site.sections.signup,
  ];

  return (
    <footer className="bg-navy px-4 pt-14 pb-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          {/* ---- Identity + mission -------------------------------------- */}
          <div>
            <div className="flex items-center gap-3">
              {/* Logo placeholder — replace `site.logo.src` in src/config/site.ts. */}
              <img
                src={site.logo.src}
                alt={site.logo.alt}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full bg-white/90 p-1"
              />
              <div>
                <p className="font-display text-2xl font-bold">{site.name}</p>
                <p className="text-sm font-semibold tracking-wide text-white/70">
                  {site.fullName}
                </p>
              </div>
            </div>

            <p className="mt-3 font-display text-lg font-bold text-gold">
              {site.taglines.evidenceBased}
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-white/80">
              {site.footer.blurb}
            </p>
            <p className="mt-3 text-sm font-bold tracking-wide text-white/60 uppercase">
              {site.taglines.notJustForBabies}
            </p>
          </div>

          {/* ---- Explore links ------------------------------------------- */}
          <nav aria-label="Footer">
            <p className="font-display text-lg font-bold">Explore</p>
            <ul className="mt-3 list-none space-y-2">
              {links.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-block rounded text-white/80 transition hover:text-white hover:underline"
                  >
                    {section.navLabel}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-display text-lg font-bold">Visit us</p>
            <p className="mt-2 text-white/80">{site.url}</p>
          </nav>
        </div>

        {/* ---- Rainbow rule + small print -------------------------------- */}
        <div
          aria-hidden="true"
          className="mt-10 flex h-1.5 overflow-hidden rounded-full"
        >
          <div className="flex-1 bg-rainbow-red" />
          <div className="flex-1 bg-rainbow-orange" />
          <div className="flex-1 bg-rainbow-yellow" />
          <div className="flex-1 bg-rainbow-green" />
          <div className="flex-1 bg-rainbow-teal" />
          <div className="flex-1 bg-rainbow-blue" />
          <div className="flex-1 bg-rainbow-violet" />
        </div>

        <p className="mt-6 text-center text-sm text-white/60">
          © {year} {site.footer.legalName} · {site.taglines.evidenceBased} ·{" "}
          {site.footer.note}
        </p>
      </div>
    </footer>
  );
}
