/**
 * =============================================================================
 * BABES WORLD MAP LOCATIONS — safe for non-developers to edit
 * =============================================================================
 * Each entry below is one clickable place (hotspot) on the interactive map.
 *
 * To edit a place, change the text between the quotes:
 *   name        the place's name, shown on the map and in the pop-up
 *   blurb       one or two friendly sentences shown inside the pop-up
 *   icon        a single emoji used on the map marker
 *   image       OPTIONAL. A picture shown at the top of the pop-up
 *               (see `public/images/worlds/`). Leave it out and the pop-up
 *               shows a colourful banner with the emoji instead.
 *   lessonId    "feeling-forest" -> opens the real sample lesson.
 *               null            -> shows the friendly "coming soon" pop-up.
 *   position    where the hotspot sits on the map artwork, in percent:
 *                 x: 0 = left edge of the artwork, 100 = right edge
 *                 y: 0 = top edge of the artwork,  100 = bottom edge
 *               HOW TO ADJUST: open the site, look at where a marker lands,
 *               then nudge these numbers (1 = one percent of the map's width
 *               or height). Save, and the page refreshes with the new spot.
 *   accent      the marker colour — pick one of the names listed in
 *               `accentClasses` at the bottom of this file.
 *
 * The positions below already match the real hand-painted BABES World map
 * (the one with the sky-and-clouds border, the mountain, the central
 * fountain and the rainbow). If you crop your scan differently, just nudge
 * the numbers.
 *
 * To make another place "live" later: create its lesson in
 * `src/data/lessons.ts` and put that lesson's id here instead of `null`.
 * =============================================================================
 */

/**
 * The real map artwork. Drop your scan at `public/images/babes-world-map.png`
 * and the site uses it automatically as the map background; until the file
 * exists, a built-in illustrated map is shown instead.
 */
export const mapArtwork = {
  src: "/images/babes-world-map.png",
  alt: "Hand-painted map of BABES World: a round island world with a snowy mountain, a waterfall, the Feeling Forest around a fountain, and a rainbow leading to a drug-free community.",
  /**
   * Width / height of the artwork. Used to keep the map's shape (and the
   * hotspot positions) correct before the image finishes loading.
   * If your scan has different proportions, update these two numbers.
   */
  width: 855,
  height: 925,
};

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
  position: { x: number; y: number };
  accent: WorldAccent;
};

export const worlds: World[] = [
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
    position: { x: 38.5, y: 67 },
    accent: "forest",
  },

  /* ---- Upper map: the journey in --------------------------------------- */
  {
    id: "coping-canyon",
    name: "Coping Canyon",
    blurb:
      "A steep, rocky pass where kids practise healthy ways to handle hard days instead of bottling them up.",
    icon: "⛰️",
    lessonId: null,
    position: { x: 33, y: 14 },
    accent: "canyon",
  },
  {
    id: "divergent-paths",
    name: "Divergent Paths",
    blurb:
      "The winding red roads that criss-cross BABES World — every fork is a chance to stop, think and choose well.",
    icon: "🛤️",
    lessonId: null,
    position: { x: 54, y: 9 },
    accent: "crimson",
  },
  {
    id: "helping-harbor",
    name: "Helping Harbor",
    blurb:
      "A lighthouse port full of kind helpers — and the trusted grown-ups kids can always go to for help.",
    icon: "⛵",
    lessonId: null,
    position: { x: 66, y: 23 },
    accent: "harbor",
  },
  {
    id: "prevention-place",
    name: "Prevention Place",
    blurb:
      "A gift-wrapped house of good habits — where awareness starts early, before problems ever do.",
    icon: "🎁",
    lessonId: null,
    position: { x: 85, y: 13.5 },
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
    position: { x: 12, y: 35 },
    accent: "sky",
  },
  {
    id: "educators",
    name: "Educators",
    blurb:
      "Teachers who weave BABES into their classrooms, from preschool circle time through 12th grade.",
    icon: "🍎",
    lessonId: null,
    position: { x: 10.5, y: 48.5 },
    accent: "canyon",
  },
  {
    id: "childrens-adventure",
    name: "Children's Adventure",
    blurb:
      "The kids' own journey through BABES World — stories, puppets and games that make life skills stick.",
    icon: "🎒",
    lessonId: null,
    position: { x: 10, y: 56.5 },
    accent: "rose",
  },
  {
    id: "babes-choir",
    name: "BABES Choir",
    blurb:
      "Songs that carry the BABES message — because a tune you love is a lesson you remember.",
    icon: "🎵",
    lessonId: null,
    position: { x: 24, y: 53 },
    accent: "sky",
  },
  {
    id: "community-activists",
    name: "Community/Activists",
    blurb:
      "Neighbours, volunteers and local champions who carry the prevention message beyond the classroom.",
    icon: "📣",
    lessonId: null,
    position: { x: 16, y: 66 },
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
    position: { x: 28, y: 34 },
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
    position: { x: 76, y: 29 },
    accent: "rose",
  },
  {
    id: "party-park",
    name: "Party Park",
    blurb:
      "Balloons, games and big feelings — a place to practise safe, healthy fun together.",
    icon: "🎈",
    lessonId: null,
    position: { x: 68, y: 39.5 },
    accent: "rose",
  },
  {
    id: "teen-institute",
    name: "Teen Institute",
    blurb:
      "Where older students become leaders — training teens to mentor younger kids through BABES World.",
    icon: "🎓",
    lessonId: null,
    position: { x: 84, y: 46 },
    accent: "sunshine",
  },
  {
    id: "safe-city",
    name: "Safe City",
    blurb:
      "A bright little town where healthy habits and good choices become everyday routines.",
    icon: "🏙️",
    lessonId: null,
    position: { x: 80, y: 53.5 },
    accent: "sky",
  },
  {
    id: "smoking-cessation-clinic",
    name: "Smoking Cessation Clinic",
    blurb:
      "Real help for quitting — support, encouragement and a clear path to smoke-free living.",
    icon: "🚭",
    lessonId: null,
    position: { x: 87, y: 60 },
    accent: "harbor",
  },
  {
    id: "self-help-groups",
    name: "Self Help Groups",
    blurb:
      "Circles of people helping each other grow — because nobody has to make changes alone.",
    icon: "🤝",
    lessonId: null,
    position: { x: 76.5, y: 64.5 },
    accent: "grape",
  },
  {
    id: "babes-alive",
    name: "BABES Alive",
    blurb:
      "BABES on stage! Live performances that bring Buttons, Bows and their friends to whole audiences at once.",
    icon: "🎭",
    lessonId: null,
    position: { x: 81, y: 72.5 },
    accent: "rose",
  },

  /* ---- The rainbow: Building a Community -------------------------------- */
  {
    id: "building-a-community",
    name: "Building a Community",
    blurb:
      "The rainbow that ties it all together: Government, Business, Media, Churches, Social Agencies, Schools and Families — every arc leading to the goal of a Drug Free Community.",
    icon: "🌈",
    lessonId: null,
    position: { x: 27, y: 85 },
    accent: "rainbow",
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
