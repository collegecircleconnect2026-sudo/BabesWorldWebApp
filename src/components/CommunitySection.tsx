import { site } from "@/config/site";

/**
 * "Building a BABES Community" — the licensing vision as a rainbow.
 *
 * Seven arcs grow outward from the child at the centre: Families first,
 * then Schools, Social Agencies, Faith-Based Organizations, Media, Business
 * and finally Government. The tier names and colours live in
 * `src/config/site.ts` (`communityTiers`) and `src/app/theme.css`.
 *
 * The SVG is decorative (aria-hidden); the numbered list beside it carries
 * the same information for screen readers.
 */

/** Rainbow colour tokens, looked up by the `accent` name in site config. */
const rainbowVar: Record<string, string> = {
  red: "var(--color-rainbow-red)",
  orange: "var(--color-rainbow-orange)",
  yellow: "var(--color-rainbow-yellow)",
  green: "var(--color-rainbow-green)",
  teal: "var(--color-rainbow-teal)",
  blue: "var(--color-rainbow-blue)",
  violet: "var(--color-rainbow-violet)",
};

/** Geometry for the arc graphic. */
const CX = 380; // horizontal centre of the rainbow
const BASE = 400; // the baseline all arcs stand on
const INNER_RADIUS = 104; // radius of the innermost arc (Families)
const BAND_STEP = 38; // distance between one arc and the next
const BAND_WIDTH = 30; // thickness of each arc

export default function CommunitySection() {
  const copy = site.sections.community;
  const tiers = site.communityTiers;

  return (
    <section
      id={copy.id}
      aria-labelledby="community-heading"
      className="bg-navy-deep px-4 py-16 text-white sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="community-heading"
          className="text-center font-display text-3xl font-bold sm:text-4xl"
        >
          {copy.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-white/80">
          {copy.intro}
        </p>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ---- The rainbow ---------------------------------------------- */}
          <div className="mx-auto w-full max-w-xl">
            <svg
              viewBox="0 0 760 402"
              className="w-full"
              aria-hidden="true"
              focusable="false"
            >
              {/* Arcs grow outward: Families innermost → Government outermost. */}
              {tiers.map((tier, i) => {
                const r = INNER_RADIUS + i * BAND_STEP;
                return (
                  <path
                    key={tier.name}
                    d={`M ${CX - r} ${BASE} A ${r} ${r} 0 0 1 ${CX + r} ${BASE}`}
                    fill="none"
                    stroke={rainbowVar[tier.accent]}
                    strokeWidth={BAND_WIDTH}
                  />
                );
              })}

              {/* The child at the centre of every BABES Community. */}
              <circle cx={CX} cy={BASE} r={72} fill="var(--color-gold)" />
              <text
                x={CX}
                y={BASE - 34}
                textAnchor="middle"
                fill="var(--color-navy-deep)"
                fontSize="17"
                fontWeight="700"
                fontFamily="var(--font-sans)"
              >
                <tspan x={CX} dy="0">
                  Every
                </tspan>
                <tspan x={CX} dy="20">
                  young person
                </tspan>
              </text>
            </svg>
            <p className="mt-4 text-center text-sm font-semibold tracking-wide text-white/60">
              Seven layers of one community, around every young person.
            </p>
          </div>

          {/* ---- The tiers, in order -------------------------------------- */}
          <ol className="list-none space-y-4">
            {tiers.map((tier, i) => (
              <li key={tier.name} className="flex items-start gap-4">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-base font-bold text-white shadow-md"
                  style={{ backgroundColor: rainbowVar[tier.accent] }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-display text-lg leading-snug font-bold">
                    {tier.name}
                  </p>
                  <p className="mt-0.5 text-white/75">{tier.blurb}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mx-auto mt-12 max-w-3xl rounded-blob border border-white/15 bg-white/5 px-6 py-5 text-center text-lg leading-relaxed text-white/85">
          {copy.outro}
        </p>
      </div>
    </section>
  );
}
