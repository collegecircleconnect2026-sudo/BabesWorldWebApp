import { site } from "@/config/site";

/** Sticky top bar with the logo and smooth-scrolling section links. */
export default function Header() {
  const links = [
    site.sections.worlds,
    site.sections.lesson,
    site.sections.community,
    site.sections.signup,
  ];

  return (
    <>
      {/* Keyboard users can jump straight past the navigation. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      {/* Slim brand bar with the two official taglines. */}
      <div className="bg-navy-deep px-4 py-1.5 text-center">
        <p className="text-xs font-bold tracking-wide text-white/90 sm:text-sm">
          {site.taglines.evidenceBased}
          <span aria-hidden="true" className="mx-2 hidden text-gold sm:inline">
            ✦
          </span>
          <span className="hidden text-white/75 sm:inline">
            {site.taglines.notJustForBabies}
          </span>
        </p>
      </div>

      <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1.5 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display text-lg font-bold whitespace-nowrap text-navy sm:text-xl"
          >
            <img
              src={site.logo.src}
              alt={site.logo.alt}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            <span>{site.name}</span>
          </a>

          <nav aria-label="Main">
            <ul className="flex list-none flex-wrap items-center justify-center gap-1 sm:gap-2">
              {links.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-block rounded-full px-2.5 py-2 text-sm font-bold whitespace-nowrap text-ink-soft transition hover:bg-navy/5 hover:text-navy sm:px-4 sm:text-base"
                  >
                    {section.navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
