"use client";

import type { World } from "@/data/worlds";

type ComingSoonProps = {
  world: World;
  onClose: () => void;
  /** Sends the visitor to the world that does have a lesson. */
  onExploreAvailable?: () => void;
  availableWorldName?: string;
};

/** Friendly "not built yet" pop-up for the worlds without a lesson. */
export default function ComingSoon({
  world,
  onClose,
  onExploreAvailable,
  availableWorldName,
}: ComingSoonProps) {
  return (
    <div>
      <img
        src={world.image.src}
        alt={world.image.alt}
        className="h-44 w-full rounded-t-blob bg-cream-deep object-cover sm:h-52"
        width={800}
        height={400}
      />

      <div className="px-5 py-6 text-center sm:px-8 sm:py-8">
        <p className="text-5xl" aria-hidden="true">
          {world.icon}
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
          {world.name}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-lg text-ink-soft">
          {world.blurb}
        </p>

        <p className="mx-auto mt-5 max-w-md rounded-2xl bg-gold/15 px-4 py-3 text-lg font-semibold">
          <span className="mr-2" aria-hidden="true">
            ✨
          </span>
          Coming soon — the full lesson for this world is part of the complete
          BABES World platform.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {onExploreAvailable && availableWorldName && (
            <button
              type="button"
              onClick={onExploreAvailable}
              className="min-h-14 rounded-full bg-crimson px-7 py-3 text-lg font-bold text-white transition hover:bg-crimson-deep"
            >
              Explore {availableWorldName} instead
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="min-h-14 rounded-full border-2 border-ink/15 px-7 py-3 text-lg font-bold text-ink transition hover:bg-cream"
          >
            Back to the map
          </button>
        </div>
      </div>
    </div>
  );
}
