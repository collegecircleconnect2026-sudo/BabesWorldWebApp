import { site } from "@/config/site";

/** Simple footer: logo placeholder, nonprofit name and a short blurb. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream-deep bg-cream-deep px-4 py-12">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        {/* Logo placeholder — replace `site.logo.src` in src/config/site.ts. */}
        <img
          src={site.logo.src}
          alt={site.logo.alt}
          width={72}
          height={72}
          className="h-18 w-18 rounded-full bg-white/70 p-1"
        />

        <p className="font-display text-xl font-bold">{site.name}</p>
        <p className="max-w-md text-ink-soft">{site.footer.blurb}</p>

        <p className="text-sm text-ink-soft">
          © {year} {site.footer.legalName}. {site.footer.note}
        </p>
      </div>
    </footer>
  );
}
