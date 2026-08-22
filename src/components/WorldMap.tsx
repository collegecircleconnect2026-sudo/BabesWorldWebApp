"use client";

import { useRef, useState } from "react";

import ComingSoon from "@/components/ComingSoon";
import LessonViewer from "@/components/LessonViewer";
import MapScene from "@/components/MapScene";
import Modal from "@/components/Modal";
import { site } from "@/config/site";
import { getLesson } from "@/data/lessons";
import { accentClasses, getWorld, worlds } from "@/data/worlds";

/**
 * The interactive world map.
 *
 * - Markers sit on top of an illustrated background at the positions set in
 *   `src/data/worlds.ts`.
 * - Every marker is a real <button>, so Tab and Enter work out of the box;
 *   the arrow keys also hop between markers.
 * - Clicking a world opens a pop-up: the lesson if it has one, otherwise a
 *   friendly "coming soon" message.
 */
export default function WorldMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const markerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeWorld = activeId ? getWorld(activeId) : undefined;
  const activeLesson = getLesson(activeWorld?.lessonId);

  /** The first world with a real lesson — offered as an alternative. */
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
    return hasLesson ? "lesson ready" : "coming soon";
  }

  return (
    <section
      id={site.sections.worlds.id}
      aria-labelledby="worlds-heading"
      className="bg-cream px-4 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
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
          className="relative mt-10 aspect-4/3 w-full overflow-hidden rounded-blob shadow-xl ring-1 ring-navy/15 sm:aspect-16/9"
          onKeyDown={handleMapKeyDown}
        >
          <div className="absolute inset-0">
            <MapScene />
          </div>

          <ul className="absolute inset-0 list-none">
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
                    className="group flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1"
                  >
                    <span
                      className={`${accent.marker} animate-bob flex h-11 w-11 items-center justify-center rounded-full text-xl shadow-lg ring-4 ring-white transition group-hover:scale-110 sm:h-16 sm:w-16 sm:text-3xl`}
                      aria-hidden="true"
                    >
                      {world.icon}
                    </span>
                    <span className="rounded-full bg-white/95 px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-ink shadow-sm sm:px-3 sm:py-1 sm:text-sm">
                      {world.name}
                      {hasLesson && (
                        <span className="ml-1" aria-hidden="true">
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

        <p className="mt-4 text-center text-sm text-ink-soft">
          Tip: use <kbd className="font-bold">Tab</kbd> and the arrow keys to
          move between worlds, then press <kbd className="font-bold">Enter</kbd>{" "}
          to open one.
        </p>

        {/* ---- Same worlds as a simple list (easy tapping on phones) ------ */}
        <h3 className="mt-14 text-center font-display text-xl font-bold text-navy sm:text-2xl">
          All seven worlds
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
                  className="flex h-full w-full cursor-pointer items-center gap-4 rounded-blob bg-white p-4 text-left shadow-sm ring-1 ring-navy/10 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-navy/20"
                >
                  <span
                    className={`${accent.marker} flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl`}
                    aria-hidden="true"
                  >
                    {world.icon}
                  </span>
                  <span>
                    <span className="block font-display text-lg font-bold">
                      {world.name}
                    </span>
                    <span
                      className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-bold ${
                        hasLesson
                          ? "bg-mint/20 text-mint"
                          : "bg-ink/10 text-ink-soft"
                      }`}
                    >
                      {hasLesson ? "Lesson ready" : "Coming soon"}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---- Pop-up: lesson or "coming soon" ----------------------------- */}
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
