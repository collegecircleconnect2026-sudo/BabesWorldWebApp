"use client";

import { useEffect, useRef, useState } from "react";

import type { Character } from "@/data/characters";

/** How long each photo stays up before the next one fades in. */
const SLIDE_INTERVAL_MS = 5000;

type CharacterSlideshowProps = {
  characters: Character[];
};

/**
 * Fading photo slideshow for "Meet the BABES Characters".
 *
 * - Advances on its own every few seconds; pauses while the pointer is over
 *   it or keyboard focus is inside it, and has a Pause / Play button.
 * - Never advances on its own for visitors who ask for reduced motion.
 * - Prev / Next arrows, one dot per photo, and ←/→ keys when focus is inside.
 */
export default function CharacterSlideshow({ characters }: CharacterSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const total = characters.length;
  const autoplay = total > 1 && !reducedMotion && !stopped;
  const running = autoplay && !hovered && !focused;

  // Follow the device's "reduce motion" setting, including live changes.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Auto-advance. Restarts the countdown after every manual change too.
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % total),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearTimeout(timer);
  }, [running, index, total]);

  if (total === 0) return null;

  const current = characters[index];

  function goTo(next: number) {
    setIndex((next + total) % total);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(index - 1);
    }
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="BABES characters"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
    >
      {/* ---- Slides: stacked in one spot, the current one fades in ------- */}
      <div className="grid">
        {characters.map((character, i) => {
          const active = i === index;
          return (
            <div
              key={`${character.src}-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}: ${character.name}`}
              aria-hidden={!active}
              inert={!active}
              className={`col-start-1 row-start-1 transition-opacity duration-700 ease-in-out ${
                active ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <PhotoFrame character={character} />
              <div className="mt-5 text-center">
                <p className="font-display text-2xl leading-tight font-bold text-navy sm:text-3xl">
                  {character.name}
                </p>
                {character.caption && (
                  <p className="mt-1 text-lg text-ink-soft">{character.caption}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- Controls ---------------------------------------------------- */}
      {total > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous character"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy/20 bg-white text-xl font-bold text-navy shadow-sm transition hover:border-navy/40 hover:bg-cream"
          >
            <span aria-hidden="true">←</span>
          </button>

          <ul className="flex list-none items-center">
            {characters.map((character, i) => (
              <li key={`${character.src}-${i}`}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show character ${i + 1}: ${character.name}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group flex h-11 w-9 items-center justify-center"
                >
                  <span
                    aria-hidden="true"
                    className={`block rounded-full transition-all duration-300 ${
                      i === index
                        ? "h-3.5 w-3.5 bg-crimson"
                        : "h-3 w-3 bg-navy/25 group-hover:bg-navy/50"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next character"
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy/20 bg-white text-xl font-bold text-navy shadow-sm transition hover:border-navy/40 hover:bg-cream"
          >
            <span aria-hidden="true">→</span>
          </button>

          {/* Only offered when the slideshow would otherwise move on its own. */}
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setStopped((value) => !value)}
              aria-pressed={stopped}
              className="ml-1 inline-flex min-h-12 items-center rounded-full px-4 text-sm font-bold text-ink-soft transition hover:bg-navy/5 hover:text-navy"
            >
              {stopped ? "Play slideshow" : "Pause slideshow"}
            </button>
          )}
        </div>
      )}

      {/* Announces the new photo after a manual change (quiet while it plays). */}
      <p className="sr-only" aria-live={running ? "off" : "polite"}>
        Showing character {index + 1} of {total}: {current.name}
      </p>
    </div>
  );
}

/**
 * One photo inside the shared rounded frame. The photo is always shown whole
 * (never stretched), minus any `trim` from the data file, and centred on a
 * soft background. A missing file shows a friendly placeholder instead.
 */
function PhotoFrame({ character }: { character: Character }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing">("loading");
  const [ratio, setRatio] = useState<number | null>(null);

  const top = character.trim?.top ?? 0;
  const bottom = character.trim?.bottom ?? 0;
  const visible = 1 - (top + bottom) / 100;

  function measure(img: HTMLImageElement) {
    if (img.naturalWidth === 0) {
      setStatus("missing");
      return;
    }
    setRatio(img.naturalWidth / (img.naturalHeight * visible));
    setStatus("ready");
  }

  // The photo may finish loading (or fail) before React is ready to hear
  // about it, so check once on mount as well.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) measure(img);
  }, []);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-blob bg-linear-to-br from-sky-light via-cream to-cream-deep p-3 shadow-xl ring-1 ring-navy/10 [container-type:size] sm:p-5">
      {status === "missing" ? (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-navy/20 bg-white/60 text-center">
          <span aria-hidden="true" className="text-5xl">
            🖼️
          </span>
          <p className="mt-3 font-bold text-ink-soft">Photo coming soon</p>
          <span className="sr-only">{character.alt}</span>
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          {/* Sized to the photo's own shape (after trimming), and as large as
              fits the frame — so nothing is stretched or cut off. */}
          <div
            className="relative max-h-full max-w-full overflow-hidden rounded-2xl bg-white/60 shadow-md"
            style={
              ratio
                ? {
                    aspectRatio: ratio,
                    width: `min(100cqw, calc(100cqh * ${ratio}))`,
                  }
                : { width: "100%", height: "100%" }
            }
          >
            <img
              ref={imgRef}
              src={character.src}
              alt={character.alt}
              onLoad={(event) => measure(event.currentTarget)}
              onError={() => setStatus("missing")}
              className={`absolute left-0 w-full transition-opacity duration-500 ${
                status === "ready" ? "opacity-100" : "opacity-0"
              }`}
              style={
                ratio
                  ? {
                      height: `${100 / visible}%`,
                      top: `${-(top / visible)}%`,
                    }
                  : { top: 0, height: "100%", objectFit: "contain" }
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
