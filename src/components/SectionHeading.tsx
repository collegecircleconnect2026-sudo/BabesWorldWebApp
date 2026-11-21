type SectionHeadingProps = {
  id: string;
  title: string;
  eyebrow?: string;
  intro?: string;
  /** Use on dark backgrounds. */
  invert?: boolean;
};

/** Consistent eyebrow + heading + intro used at the top of every section. */
export default function SectionHeading({
  id,
  title,
  eyebrow,
  intro,
  invert = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && (
        <p
          className={`text-xs font-extrabold tracking-[0.16em] uppercase sm:text-sm ${
            invert ? "text-gold" : "text-crimson"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`mt-3 font-display text-3xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl ${
          invert ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-5 text-lg leading-relaxed text-pretty ${
            invert ? "text-white/80" : "text-ink-soft"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
