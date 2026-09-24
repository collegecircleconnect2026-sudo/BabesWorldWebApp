"use client";

import { useRef, useState } from "react";

import ComingSoon from "@/components/ComingSoon";
import LessonViewer from "@/components/LessonViewer";
import MapScene from "@/components/MapScene";
import Modal from "@/components/Modal";
import { site } from "@/config/site";
import { getLesson } from "@/data/lessons";
import { mapArtwork, mapButtons } from "@/data/mapButtons";
import { accentClasses, getWorld, worlds } from "@/data/worlds";

/**
 * The interactive BABES World map.
 *
 * - The centrepiece is the real hand-painted artwork (`mapArtwork` in
 *   `src/data/mapButtons.ts`), always shown whole — never stretched or
 *   cropped — and sized so the full map fits on screen.
 * - A round button sits on each clickable place, at the percent positions
 *   set in `src/data/mapButtons.ts`, so it stays on its spot at any size.
 *   Feeling Forest (the sample lesson) gets a bigger, highlighted button.
 * - Every button is a real <button>, so Tab and Enter work out of the box;
 *   the arrow keys also hop between buttons.
 * - The same places are listed as big buttons under the map — easy to tap on
 *   phones, and a plain list for anyone who prefers one.
 * - Clicking a place opens a pop-up: the lesson if it has one, otherwise a
 *   friendly "coming in the full platform" message.
 */
type WorldMapProps = {
  /** True when `public/images/babes-world-map.png` exists (checked at build). */
  hasMapArtwork: boolean;
};

/** Each map button joined with its place's details (icon, lesson, pop-up). */
const places = mapButtons.flatMap((button) => {
  const world = getWorld(button.id);
  return world ? [{ ...button, world }] : [];
});

/**
 * The map is as wide as the page allows, but never so tall that it can't be
 * seen in one go below the sticky header.
 */
const mapWidth = `min(100%, 64rem, max(20rem, calc((100svh - 7rem) * ${
  mapArtwork.width / mapArtwork.height
})))`;

/*
 * Button styles. Sizes use `cqw` (percent of the map's width), so buttons
 * grow and shrink with the map, between a sensible minimum and maximum.
 * The chunky focus ring comes from `globals.css`; the white halo added here
 * keeps it visible over the busy artwork.
 */
const markerBase =
  "group relative flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full leading-none transition duration-200 before:absolute before:-inset-1.5 before:rounded-full hover:scale-115 focus-visible:scale-115 focus-visible:rounded-full! focus-visible:shadow-[0_0_0_9px_#fff]";
const markerRegular =
  "size-[clamp(1.125rem,3.4cqw,2.25rem)] bg-white text-[clamp(0.625rem,1.75cqw,1.1875rem)] shadow-[0_2px_6px_rgb(20_32_63/0.45)] ring-2 ring-navy hover:ring-crimson";
const markerFeatured =
  "size-[clamp(1.625rem,5cqw,3.25rem)] bg-crimson text-[clamp(0.875rem,2.6cqw,1.75rem)] shadow-[0_3px_10px_rgb(20_32_63/0.55)] ring-[3px] ring-white hover:bg-crimson-deep";

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
          className="@container relative mx-auto mt-10"
          style={{ width: mapWidth }}
          onKeyDown={handleMapKeyDown}
        >
          <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-navy/15 sm:rounded-blob">
            {artworkMissing ? (
              <MapScene />
            ) : (
              // The real artwork. If the file is ever missing from
              // `public/images/`, onError swaps in the built-in drawing.
              <img
                src={mapArtwork.src}
                alt={mapArtwork.alt}
                width={mapArtwork.width}
                height={mapArtwork.height}
                className="block h-auto w-full"
                onError={() => setArtworkMissing(true)}
              />
            )}
          </div>

          {/* Buttons on the places — positions from src/data/mapButtons.ts. */}
          <ul
            aria-label="Places on the map"
            className="absolute inset-0 list-none"
          >
            {places.map((place, i) => {
              const hasLesson = Boolean(place.world.lessonId);

              return (
                <li
                  key={place.id}
                  className={`absolute hover:z-20 focus-within:z-20 ${
                    hasLesson ? "z-10" : ""
                  }`}
                  style={{ left: `${place.x}%`, top: `${place.y}%` }}
                >
                  <button
                    type="button"
                    ref={(node) => {
                      markerRefs.current[i] = node;
                    }}
                    onClick={() => setActiveId(place.id)}
                    aria-label={`${place.label} — ${statusLabel(hasLesson)}`}
                    className={`${markerBase} ${
                      hasLesson ? markerFeatured : markerRegular
                    }`}
                  >
                    {/* A soft pulse draws the eye to the live lesson. */}
                    {hasLesson && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 animate-ping rounded-full bg-gold/70 [animation-duration:2.4s] motion-reduce:hidden"
                      />
                    )}
                    <span aria-hidden="true" className="relative">
                      {place.world.icon}
                    </span>

                    {/* Always-on "Start here" tag for the sample lesson. */}
                    {hasLesson && (
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 right-full mr-[0.55em] -translate-y-1/2 rounded-full bg-navy px-[0.8em] py-[0.4em] text-[clamp(0.625rem,1.45cqw,0.9375rem)] font-bold whitespace-nowrap text-white shadow-md ring-2 ring-white"
                      >
                        Start here
                        <span className="ml-[0.35em] text-gold">→</span>
                      </span>
                    )}

                    {/* Name tag, shown on hover and keyboard focus. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-full bg-navy px-2.5 py-1 text-xs font-bold whitespace-nowrap text-white shadow-md group-hover:block group-focus-visible:block sm:text-sm"
                    >
                      {place.label}
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
          Tap a button on the map, or pick a place from the list below.
        </p>

        {/* ---- Same places as a list of big buttons (easy to tap) -------- */}
        <h3 className="mt-14 text-center font-display text-xl font-bold text-navy sm:text-2xl">
          Every stop in BABES World
        </h3>
        <ul className="mt-6 grid list-none grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => {
            const hasLesson = Boolean(place.world.lessonId);
            const accent = accentClasses[place.world.accent];

            return (
              <li key={place.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(place.id)}
                  className="flex h-full w-full cursor-pointer items-center gap-4 rounded-blob bg-white p-4 text-left shadow-sm ring-1 ring-navy/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-navy/25"
                >
                  <span
                    className={`${accent.marker} flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl shadow-inner`}
                    aria-hidden="true"
                  >
                    {place.world.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-lg leading-snug font-bold">
                      {place.label}
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
