import { site } from "@/config/site";

/**
 * Sticky top bar with the wordmark, smooth-scrolling section links and the
 * Member access button. Links start with "/" so they also work from the
 * /access and /admin pages.
 */
export default function Header() {
  const links = [
    site.sections.worlds,
    site.sections.lesson,
    site.sections.progress,
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

      <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/85 shadow-[0_1px_0_rgb(30_47_92/0.04),0_8px_24px_-16px_rgb(30_47_92/0.25)] backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2.5 sm:py-3 lg:flex-nowrap">
          <a
            href="/#top"
            aria-label={`${site.wordmark} home`}
            className="flex items-center gap-2.5 rounded-full font-display text-xl font-bold tracking-tight whitespace-nowrap text-navy sm:text-2xl"
          >
            <img
              src={site.logo.src}
              alt=""
              width={40}
              height={40}
              className="h-9 w-9 rounded-full sm:h-10 sm:w-10"
            />
            <span>{site.wordmark}</span>
          </a>

          <a
            href="/access"
            className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-sm font-bold whitespace-nowrap text-white shadow-sm transition duration-200 hover:-translate-y-px hover:bg-navy-deep hover:shadow-md lg:order-last"
          >
            <span aria-hidden="true">🔑</span>
            Member access
          </a>

          <nav aria-label="Main" className="-mx-2 w-[calc(100%+1rem)] lg:mx-0 lg:w-auto">
            <ul className="flex list-none items-center justify-between gap-0.5 overflow-x-auto px-1 sm:justify-center sm:gap-1 lg:justify-end">
              {links.map((section) => (
                <li
                  key={section.id}
                  // "Stay in touch" lives in the footer on phones, so the nav fits one row.
                  className={`shrink-0 ${section.id === site.sections.signup.id ? "hidden sm:block" : ""}`}
                >
                  <a
                    href={`/#${section.id}`}
                    className="inline-block rounded-full px-2.5 py-2 text-sm font-bold whitespace-nowrap text-ink-soft transition duration-200 hover:bg-navy/5 hover:text-navy sm:px-3.5"
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
