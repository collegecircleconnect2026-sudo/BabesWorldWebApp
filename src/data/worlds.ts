/**
 * =============================================================================
 * WORLD DEFINITIONS — safe for non-developers to edit
 * =============================================================================
 * Each entry below is one marker on the interactive map.
 *
 * To edit a world, change the text between the quotes:
 *   name        the world's name, shown on the map and in the pop-up
 *   blurb       one or two friendly sentences shown inside the pop-up
 *   icon        a single emoji used on the map marker
 *   image       a picture shown at the top of the pop-up (see `public/images/worlds/`)
 *   lessonId    "feeling-forest" -> opens the real lesson.
 *               null            -> shows the friendly "Coming soon" pop-up.
 *   position    where the marker sits on the map, in percent
 *               (x: 0 = far left, 100 = far right | y: 0 = top, 100 = bottom)
 *   accent      the marker colour — pick one of the names listed in `accentClasses`
 *               at the bottom of this file.
 *
 * To make another world "live" later: create its lesson in `src/data/lessons.ts`
 * and put that lesson's id here instead of `null`.
 * =============================================================================
 */

/** Colour names available for markers (defined in `src/app/theme.css`). */
export type WorldAccent =
  | "forest"
  | "delta"
  | "pier"
  | "harbor"
  | "party"
  | "pitfalls"
  | "safe";

export type World = {
  id: string;
  name: string;
  blurb: string;
  icon: string;
  image: { src: string; alt: string };
  lessonId: string | null;
  position: { x: number; y: number };
  accent: WorldAccent;
};

export const worlds: World[] = [
  {
    id: "feeling-forest",
    name: "Feeling Forest",
    blurb:
      "A calm woodland where kids learn to notice, name and share how they feel.",
    icon: "🌳",
    image: {
      src: "/images/worlds/feeling-forest.svg",
      alt: "Illustration of a friendly forest with tall rounded trees",
    },
    lessonId: "feeling-forest", // <- the one world with a real lesson
    position: { x: 17, y: 32 },
    accent: "forest",
  },
  {
    id: "decision-delta",
    name: "Decision Delta",
    blurb:
      "Winding rivers where every path is a choice — and kids practise stopping to think first.",
    icon: "🌊",
    image: {
      src: "/images/worlds/decision-delta.svg",
      alt: "Illustration of a river splitting into two paths",
    },
    lessonId: null,
    position: { x: 38, y: 17 },
    accent: "delta",
  },
  {
    id: "peer-pressure-pier",
    name: "Peer Pressure Pier",
    blurb:
      "A busy boardwalk where kids practise saying 'no thanks' and still keeping friends.",
    icon: "🎣",
    image: {
      src: "/images/worlds/peer-pressure-pier.svg",
      alt: "Illustration of a wooden pier stretching over blue water",
    },
    lessonId: null,
    position: { x: 62, y: 22 },
    accent: "pier",
  },
  {
    id: "helping-harbor",
    name: "Helping Harbor",
    blurb:
      "A sunny port full of kind helpers — and the grown-ups kids can go to for help.",
    icon: "⛵",
    image: {
      src: "/images/worlds/helping-harbor.svg",
      alt: "Illustration of a small sailboat in a calm harbor",
    },
    lessonId: null,
    position: { x: 83, y: 38 },
    accent: "harbor",
  },
  {
    id: "party-park",
    name: "Party Park",
    blurb:
      "Balloons, games and big feelings — a place to practise safe, healthy fun.",
    icon: "🎈",
    image: {
      src: "/images/worlds/party-park.svg",
      alt: "Illustration of a park with balloons and bunting",
    },
    lessonId: null,
    position: { x: 72, y: 64 },
    accent: "party",
  },
  {
    id: "pitfalls",
    name: "Pitfalls",
    blurb:
      "Tricky ground where kids spot risky situations early and choose a safer way around.",
    icon: "🕳️",
    image: {
      src: "/images/worlds/pitfalls.svg",
      alt: "Illustration of a bumpy path with holes and warning signs",
    },
    lessonId: null,
    position: { x: 45, y: 72 },
    accent: "pitfalls",
  },
  {
    id: "safe-city",
    name: "Safe City",
    blurb:
      "A bright little town where healthy habits and good choices become everyday routines.",
    icon: "🏙️",
    image: {
      src: "/images/worlds/safe-city.svg",
      alt: "Illustration of a cheerful town skyline",
    },
    lessonId: null,
    position: { x: 19, y: 63 },
    accent: "safe",
  },
];

/**
 * Marker / badge colours for each accent name above.
 * These are Tailwind classes; the colours themselves are defined in
 * `src/app/theme.css` so you only have to change them in one place.
 */
export const accentClasses: Record<
  WorldAccent,
  { marker: string; ring: string; chip: string }
> = {
  forest: {
    marker: "bg-world-forest",
    ring: "focus-visible:outline-world-forest",
    chip: "bg-world-forest/15 text-ink",
  },
  delta: {
    marker: "bg-world-delta",
    ring: "focus-visible:outline-world-delta",
    chip: "bg-world-delta/15 text-ink",
  },
  pier: {
    marker: "bg-world-pier",
    ring: "focus-visible:outline-world-pier",
    chip: "bg-world-pier/15 text-ink",
  },
  harbor: {
    marker: "bg-world-harbor",
    ring: "focus-visible:outline-world-harbor",
    chip: "bg-world-harbor/15 text-ink",
  },
  party: {
    marker: "bg-world-party",
    ring: "focus-visible:outline-world-party",
    chip: "bg-world-party/15 text-ink",
  },
  pitfalls: {
    marker: "bg-world-pitfalls",
    ring: "focus-visible:outline-world-pitfalls",
    chip: "bg-world-pitfalls/15 text-ink",
  },
  safe: {
    marker: "bg-world-safe",
    ring: "focus-visible:outline-world-safe",
    chip: "bg-world-safe/15 text-ink",
  },
};

/** Helper used by the map + lesson section. */
export function getWorld(id: string): World | undefined {
  return worlds.find((world) => world.id === id);
}
