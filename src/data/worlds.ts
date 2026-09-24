/**
 * =============================================================================
 * BABES WORLD PLACES — safe for non-developers to edit
 * =============================================================================
 * Each entry below is one place you can click on the map. This file holds
 * what the pop-up says; WHERE each button sits on the map picture lives in
 * `src/data/mapButtons.ts`.
 *
 * To edit a place, change the text between the quotes:
 *   name        the place's name, shown as the pop-up title
 *   blurb       one or two friendly sentences shown inside the pop-up
 *   icon        a single emoji used on the map button and the list below it
 *   image       OPTIONAL. A picture shown at the top of the pop-up
 *               (see `public/images/worlds/`). Leave it out and the pop-up
 *               shows a colourful banner with the emoji instead.
 *   lessonId    "feeling-forest" -> opens the real sample lesson.
 *               null            -> shows the friendly "coming soon" pop-up.
 *   accent      the icon colour in the list under the map — pick one of the
 *               names listed in `accentClasses` at the bottom of this file.
 *
 * To make another place "live" later: create its lesson in
 * `src/data/lessons.ts` and put that lesson's id here instead of `null`.
 * =============================================================================
 */

/** Colour names available for markers (defined in `src/app/theme.css`). */
export type WorldAccent =
  | "forest"
  | "sky"
  | "harbor"
  | "sunshine"
  | "rose"
  | "canyon"
  | "grape"
  | "crimson"
  | "rainbow";

export type World = {
  id: string;
  name: string;
  blurb: string;
  icon: string;
  image?: { src: string; alt: string };
  lessonId: string | null;
  accent: WorldAccent;
};

export const worlds = [
  /* ---- The live sample lesson ------------------------------------------ */
  {
    id: "feeling-forest",
    name: "Feeling Forest",
    blurb:
      "The heart of BABES World — a calm woodland around the fountain where kids learn to notice, name and share how they feel.",
    icon: "🌳",
    image: {
      src: "/images/worlds/feeling-forest.svg",
      alt: "Illustration of a friendly forest with tall rounded trees",
    },
    lessonId: "feeling-forest", // <- the one place with a real lesson
    accent: "forest",
  },

  /* ---- Upper map: the journey in --------------------------------------- */
  {
    id: "decision-delta",
    name: "Decision Delta",
    blurb:
      "Where the river splits into many channels — kids learn to slow down, weigh their choices and pick the one that's right for them.",
    icon: "🧭",
    lessonId: null,
    accent: "sky",
  },
  {
    id: "coping-canyon",
    name: "Coping Canyon",
    blurb:
      "A steep, rocky pass where kids practise healthy ways to handle hard days instead of bottling them up.",
    icon: "⛰️",
    lessonId: null,
    accent: "canyon",
  },
  {
    id: "divergent-paths",
    name: "Divergent Paths",
    blurb:
      "The winding red roads that criss-cross BABES World — every fork is a chance to stop, think and choose well.",
    icon: "🛤️",
    lessonId: null,
    accent: "crimson",
  },
  {
    id: "helping-harbor",
    name: "Helping Harbor",
    blurb:
      "A lighthouse port full of kind helpers — and the trusted grown-ups kids can always go to for help.",
    icon: "⛵",
    lessonId: null,
    accent: "harbor",
  },
  {
    id: "prevention-place",
    name: "Prevention Place",
    blurb:
      "A gift-wrapped house of good habits — where awareness starts early, before problems ever do.",
    icon: "🎁",
    lessonId: null,
    accent: "crimson",
  },

  /* ---- Left side: the grown-ups who bring BABES to kids ----------------- */
  {
    id: "clinicians",
    name: "Clinicians",
    blurb:
      "Counselors and health professionals who bring BABES lessons into clinics and care settings.",
    icon: "🩺",
    lessonId: null,
    accent: "sky",
  },
  {
    id: "educators",
    name: "Educators",
    blurb:
      "Teachers who weave BABES into their classrooms, from preschool circle time through 12th grade.",
    icon: "🍎",
    lessonId: null,
    accent: "canyon",
  },
  {
    id: "childrens-adventure",
    name: "Children's Adventure",
    blurb:
      "The kids' own journey through BABES World — stories, puppets and games that make life skills stick.",
    icon: "🎒",
    lessonId: null,
    accent: "rose",
  },
  {
    id: "community-activists",
    name: "Community/Activists",
    blurb:
      "Neighbours, volunteers and local champions who carry the prevention message beyond the classroom.",
    icon: "📣",
    lessonId: null,
    accent: "forest",
  },

  /* ---- Center-left: peer pressure -------------------------------------- */
  {
    id: "peer-pressure-pier",
    name: "Peer Pressure Pier",
    blurb:
      "A long boardwalk over deep water where kids practise saying 'no thanks' — and still keeping their friends.",
    icon: "🎣",
    lessonId: null,
    accent: "grape",
  },

  /* ---- Right side: celebrations and programs ---------------------------- */
  {
    id: "prizes-galore",
    name: "Prizes Galore",
    blurb:
      "Where good choices get celebrated — badges, cheers and prizes for every brave step.",
    icon: "🎉",
    lessonId: null,
    accent: "rose",
  },
  {
    id: "party-park",
    name: "Party Park",
    blurb:
      "Balloons, games and big feelings — a place to practise safe, healthy fun together.",
    icon: "🎈",
    lessonId: null,
    accent: "rose",
  },
  {
    id: "teen-institute",
    name: "Teen Institute",
    blurb:
      "Where older students become leaders — training teens to mentor younger kids through BABES World.",
    icon: "🎓",
    lessonId: null,
    accent: "sunshine",
  },
  {
    id: "safe-city",
    name: "Safe City",
    blurb:
      "A bright little town where healthy habits and good choices become everyday routines.",
    icon: "🏙️",
    lessonId: null,
    accent: "sky",
  },

  /* ---- The rainbow: Building a Community -------------------------------- */
  {
    id: "building-a-community",
    name: "Building a Community",
    blurb:
      "The rainbow that ties it all together: Government, Business, Media, Churches, Social Agencies, Schools and Families — every arc leading to the goal of a Drug Free Community.",
    icon: "🌈",
    lessonId: null,
    accent: "rainbow",
  },
] as const satisfies readonly World[];

/** The id of any place above (used by `src/data/mapButtons.ts`). */
export type WorldId = (typeof worlds)[number]["id"];

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
  sky: {
    marker: "bg-world-sky",
    ring: "focus-visible:outline-world-sky",
    chip: "bg-world-sky/15 text-ink",
  },
  harbor: {
    marker: "bg-world-harbor",
    ring: "focus-visible:outline-world-harbor",
    chip: "bg-world-harbor/15 text-ink",
  },
  sunshine: {
    marker: "bg-world-sunshine",
    ring: "focus-visible:outline-world-sunshine",
    chip: "bg-world-sunshine/15 text-ink",
  },
  rose: {
    marker: "bg-world-rose",
    ring: "focus-visible:outline-world-rose",
    chip: "bg-world-rose/15 text-ink",
  },
  canyon: {
    marker: "bg-world-canyon",
    ring: "focus-visible:outline-world-canyon",
    chip: "bg-world-canyon/15 text-ink",
  },
  grape: {
    marker: "bg-world-grape",
    ring: "focus-visible:outline-world-grape",
    chip: "bg-world-grape/15 text-ink",
  },
  crimson: {
    marker: "bg-crimson",
    ring: "focus-visible:outline-crimson",
    chip: "bg-crimson/15 text-ink",
  },
  /* The "Building a Community" rainbow gets all seven colours at once. */
  rainbow: {
    marker:
      "bg-[linear-gradient(135deg,var(--color-rainbow-red),var(--color-rainbow-orange),var(--color-rainbow-yellow),var(--color-rainbow-green),var(--color-rainbow-teal),var(--color-rainbow-blue),var(--color-rainbow-violet))]",
    ring: "focus-visible:outline-rainbow-violet",
    chip: "bg-rainbow-violet/15 text-ink",
  },
};

/** Helper used by the map + lesson section. */
export function getWorld(id: string): World | undefined {
  return worlds.find((world) => world.id === id);
}
