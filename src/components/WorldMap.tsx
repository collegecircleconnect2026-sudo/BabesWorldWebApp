"use client";

import { useRef, useState } from "react";

import ComingSoon from "@/components/ComingSoon";
import LessonViewer from "@/components/LessonViewer";
import MapScene from "@/components/MapScene";
import Modal from "@/components/Modal";
import { site } from "@/config/site";
import { getLesson } from "@/data/lessons";
import { accentClasses, getWorld, mapArtwork, worlds } from "@/data/worlds";

/**
 * The interactive BABES World map.
 *
 * - The background is the real scanned artwork (`mapArtwork` in
 *   `src/data/worlds.ts`) when that file exists; otherwise the built-in
 *   illustrated `MapScene` is drawn instead. Both share the same
 *   proportions, so hotspots land in the same places on either one.
 * - Hotspot markers sit on top at the positions set in `src/data/worlds.ts`.
 * - Every marker is a real <button>, so Tab and Enter work out of the box;
 *   the arrow keys also hop between markers.
 * - On phones the map is shown as a picture and the card grid underneath is
 *   the way in — the same places, easy to tap.
 * - Clicking a place opens a pop-up: the lesson if it has one, otherwise a
 *   friendly "coming in the full platform" message.
 */
type WorldMapProps = {
  /** True when `public/images/babes-world-map.png` exists (checked at build). */
  hasMapArtwork: boolean;
};

export default function WorldMap({ hasMapArtwork }: WorldMapProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  /** Flips to true if the artwork file fails to load, showing the drawn map. */
  const [artworkMissing, setArtworkMissing] = useState(!hasMapArtwork);
  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeWorld = activeId ? getWorld(activeId) : undefined;
  const activeLesson = getLesson(activeWorld?.lessonId);

  /** The first place with a real lesson — offered as an alternative. */
  const liveWorld = worlds.find((world) => world.lessonId);

  function close() {
    setActiveId(null);
  }

  /** Arrow keys move focus from marker to marker. */
  function handleMapKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(event.key)) return;

    const current = markerRefs.current.findIndex(
      (node) => node === document.activeElement,
    );
    if (current === -1) return;

    event.preventDefault();
    const forward = event.key === "ArrowRight" || event.key === "ArrowDown";
    const count = markerRefs.current.length;
    const next = (current + (forward ? 1 : -1) + count) % count;
    markerRefs.current[next]?.focus();
  }

  function statusLabel(hasLesson: boolean) {
    return hasLesson ? "sample lesson ready" : "opens in the full platform";
  }

  return (
    <section
      id={site.sections.worlds.id}
      aria-labelledby="worlds-heading"
      className="bg-linear-to-b from-sky-light via-cream to-cream px-4 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="worlds-heading"
          className="text-center font-display text-3xl font-bold text-navy sm:text-4xl"
        >
          {site.sections.worlds.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-ink-soft">
          {site.sections.worlds.intro}
        </p>

        {/* ---- The map ---------------------------------------------------- */}
        <div
          className="relative mx-auto mt-10 max-w-3xl"
          onKeyDown={handleMapKeyDown}
        >
          <div className="overflow-hidden rounded-blob shadow-2xl ring-1 ring-navy/15">
            {artworkMissing ? (
              <MapScene />
            ) : (
              // The real scan. If the file isn't in `public/images/` yet,
              // onError swaps in the built-in illustration above.
              <img
                src={mapArtwork.src}
                alt={mapArtwork.alt}
                width={mapArtwork.width}
                height={mapArtwork.height}
                className="h-auto w-full"
                onError={() => setArtworkMissing(true)}
              />
            )}
          </div>

          {/* Hotspots — hidden on phones, where the card grid below is used. */}
          <ul className="absolute inset-0 hidden list-none sm:block">
            {worlds.map((world, i) => {
              const accent = accentClasses[world.accent];
              const hasLesson = Boolean(world.lessonId);

              return (
                <li
                  key={world.id}
                  className="absolute"
                  style={{
                    left: `${world.position.x}%`,
                    top: `${world.position.y}%`,
                  }}
                >
                  <button
                    type="button"
                    ref={(node) => {
                      markerRefs.current[i] = node;
                    }}
                    onClick={() => setActiveId(world.id)}
                    aria-label={`${world.name} — ${statusLabel(hasLesson)}. ${world.blurb}`}
                    className="group flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-0.5"
                  >
                    <span className="relative flex items-center justify-center">
                      {/* A soft pulse draws the eye to the live lesson. */}
                      {hasLesson && (
                        <span
                          aria-hidden="true"
                          className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 [animation-duration:2.6s]"
                        />
                      )}
                      <span
                        className={`${accent.marker} relative flex items-center justify-center rounded-full shadow-md ring-[3px] ring-white transition-transform duration-200 group-hover:scale-125 group-focus-visible:scale-125 ${
                          hasLesson
                            ? "h-9 w-9 text-lg md:h-11 md:w-11 md:text-xl"
                            : "h-6 w-6 text-[11px] md:h-8 md:w-8 md:text-sm"
                        }`}
                        aria-hidden="true"
                      >
                        {world.icon}
                      </span>
                    </span>
                    <span
                      className={`rounded-full bg-white/95 px-1.5 py-px text-[9px] leading-tight font-bold whitespace-nowrap text-ink shadow-sm transition-colors duration-200 group-hover:bg-navy group-hover:text-white md:px-2 md:text-[11px] ${
                        hasLesson ? "ring-1 ring-gold" : ""
                      }`}
                    >
                      {world.name}
                      {hasLesson && (
                        <span className="ml-1 text-gold" aria-hidden="true">
                          ✨
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-4 hidden text-center text-sm text-ink-soft sm:block">
          Tip: use <kbd className="font-bold">Tab</kbd> and the arrow keys to
          move between places, then press <kbd className="font-bold">Enter</kbd>{" "}
          to open one.
        </p>
        <p className="mt-4 text-center text-sm text-ink-soft sm:hidden">
          Browse every place on the map below.
        </p>

        {/* ---- Same places as tappable cards (the way in on phones) ------- */}
        <h3 className="mt-14 text-center font-display text-xl font-bold text-navy sm:text-2xl">
          Every stop in BABES World
        </h3>
        <ul className="mt-6 grid list-none grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {worlds.map((world) => {
            const hasLesson = Boolean(world.lessonId);
            const accent = accentClasses[world.accent];

            return (
              <li key={world.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(world.id)}
                  className="flex h-full w-full cursor-pointer items-center gap-4 rounded-blob bg-white p-4 text-left shadow-sm ring-1 ring-navy/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-navy/25"
                >
                  <span
                    className={`${accent.marker} flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl shadow-inner`}
                    aria-hidden="true"
                  >
                    {world.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg leading-snug font-bold">
                      {world.name}
                    </span>
                    <span
                      className={`mt-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        hasLesson
                          ? "bg-mint/15 text-mint"
                          : "bg-ink/5 text-ink-soft"
                      }`}
                    >
                      {hasLesson ? "✨ Sample lesson ready" : "Full platform"}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---- Pop-up: lesson or "coming in the full platform" ------------- */}
      <Modal
        open={Boolean(activeWorld)}
        onClose={close}
        title={activeWorld ? activeWorld.name : ""}
      >
        {activeWorld &&
          (activeLesson ? (
            <LessonViewer lesson={activeLesson} onClose={close} />
          ) : (
            <ComingSoon
              world={activeWorld}
              onClose={close}
              availableWorldName={liveWorld?.name}
              onExploreAvailable={
                liveWorld ? () => setActiveId(liveWorld.id) : undefined
              }
            />
          ))}
      </Modal>
    </section>
  );
}
