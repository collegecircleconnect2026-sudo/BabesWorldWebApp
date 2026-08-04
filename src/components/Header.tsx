import { site } from "@/config/site";

/** Sticky top bar with the logo and smooth-scrolling section links. */
export default function Header() {
  const links = [
    site.sections.worlds,
    site.sections.lesson,
    site.sections.signup,
  ];

  return (
    <>
      {/* Keyboard users can jump straight past the navigation. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-berry focus:px-5 focus:py-3 focus:font-bold focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-cream-deep bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <a
            href="#top"
            className="flex items-center gap-2 font-display text-lg font-bold text-ink sm:text-xl"
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
            <ul className="flex list-none items-center gap-1 sm:gap-2">
              {links.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-block rounded-full px-3 py-2 text-sm font-bold text-ink-soft transition hover:bg-cream-deep hover:text-ink sm:px-4 sm:text-base"
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
