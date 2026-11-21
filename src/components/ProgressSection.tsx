import SectionHeading from "@/components/SectionHeading";
import { site } from "@/config/site";

const statusStyles = {
  live: { label: "Live in demo", chip: "bg-mint/12 text-mint", dot: "bg-mint" },
  preview: {
    label: "Screen preview",
    chip: "bg-sky/10 text-sky",
    dot: "bg-sky",
  },
  planned: {
    label: "On the roadmap",
    chip: "bg-ink/5 text-ink-soft",
    dot: "bg-ink/30",
  },
} as const;

/** "Platform progress" board: what works today and what's coming next. */
export default function ProgressSection() {
  const copy = site.sections.progress;
  const items = site.progress;
  const live = items.filter((item) => item.status === "live").length;
  const preview = items.filter((item) => item.status === "preview").length;
  const percent = Math.round(((live + preview * 0.5) / items.length) * 100);

  return (
    <section
      id={copy.id}
      aria-labelledby="progress-heading"
      className="bg-cream px-4 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="progress-heading"
          eyebrow="Building in the open"
          title={copy.title}
          intro={copy.intro}
        />

        {/* ---- Overall bar ------------------------------------------------ */}
        <div className="mx-auto mt-10 max-w-2xl rounded-blob bg-white p-5 shadow-sm ring-1 ring-navy/10 sm:p-6">
          <div className="flex items-baseline justify-between gap-4">
            <p className="font-display text-lg font-bold text-navy">
              Demo milestone
            </p>
            <p className="text-sm font-bold text-ink-soft">
              {live} live · {preview} in preview · {items.length - live - preview}{" "}
              planned
            </p>
          </div>
          <div
            className="mt-3 h-3 overflow-hidden rounded-full bg-cream-deep"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="Demo milestone progress"
          >
            <div
              className="h-full rounded-full bg-linear-to-r from-mint via-sky to-navy"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* ---- Feature cards ---------------------------------------------- */}
        <ul className="mt-10 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const style = statusStyles[item.status];
            const body = (
              <>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${style.chip}`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${style.dot}`}
                  />
                  {style.label}
                </span>
                <span className="mt-3 block font-display text-xl leading-snug font-bold text-navy">
                  {item.name}
                </span>
                <span className="mt-1.5 block leading-relaxed text-ink-soft">
                  {item.detail}
                </span>
                {"href" in item && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-crimson">
                    {item.status === "live" ? "Try it" : "View preview"}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                )}
              </>
            );

            return (
              <li key={item.name}>
                {"href" in item ? (
                  <a
                    href={item.href}
                    className="group block h-full rounded-blob bg-white p-6 shadow-sm ring-1 ring-navy/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-navy/25"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="h-full rounded-blob border-2 border-dashed border-navy/15 p-6">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
