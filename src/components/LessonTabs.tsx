"use client";

import { useRef, useState } from "react";

import LessonViewer from "@/components/LessonViewer";
import type { Lesson } from "@/data/lessons";

type LessonTabsProps = {
  entries: { worldName: string; icon: string; lesson: Lesson }[];
};

/**
 * Lets visitors switch between the sample lessons. Uses the WAI-ARIA tabs
 * pattern: ←/→ move between tabs, and each lesson remounts fresh.
 */
export default function LessonTabs({ entries }: LessonTabsProps) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next = (active + step + entries.length) % entries.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const current = entries[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Sample lessons"
        onKeyDown={handleKeyDown}
        className="mx-auto grid grid-cols-3 gap-1.5 rounded-3xl bg-white/70 p-1.5 shadow-sm ring-1 ring-navy/10 sm:flex sm:w-fit sm:rounded-full"
      >
        {entries.map((entry, i) => {
          const selected = i === active;
          return (
            <button
              key={entry.lesson.id}
              ref={(node) => {
                tabRefs.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`lesson-tab-${entry.lesson.id}`}
              aria-selected={selected}
              aria-controls={`lesson-panel-${entry.lesson.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`flex min-h-12 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2 text-sm leading-tight font-bold transition duration-200 sm:flex-row sm:gap-1.5 sm:rounded-full sm:px-5 sm:text-base sm:whitespace-nowrap ${
                selected
                  ? "bg-navy text-white shadow-md"
                  : "text-ink-soft hover:bg-navy/5 hover:text-navy"
              }`}
            >
              <span aria-hidden="true" className="text-lg sm:text-base">
                {entry.icon}
              </span>
              {entry.worldName}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`lesson-panel-${current.lesson.id}`}
        aria-labelledby={`lesson-tab-${current.lesson.id}`}
        className="mt-8 overflow-hidden rounded-blob bg-white shadow-xl ring-1 ring-navy/10"
      >
        <LessonViewer key={current.lesson.id} lesson={current.lesson} />
      </div>
    </div>
  );
}
