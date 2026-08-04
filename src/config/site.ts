/**
 * =============================================================================
 * SITE CONFIG — safe for non-developers to edit
 * =============================================================================
 * Everything in this file is plain text. Change the words between the quotes
 * and the website updates. Keep the quotes, commas and curly braces as they are.
 *
 * (Brand COLORS live in `src/app/theme.css`. Lesson text lives in
 * `src/data/lessons.ts`. World names live in `src/data/worlds.ts`.)
 * =============================================================================
 */

export const site = {
  /** The nonprofit's name, shown in the header, hero and footer. */
  name: "BABES World",

  /** Short line under the logo in the header / browser tab description. */
  shortTagline: "Healthy choices start early.",

  /** The big sentence on the hero. */
  tagline:
    "A playful place where children ages 5–8 learn to name their feelings, build healthy behaviors, and make positive life decisions.",

  /** Smaller supporting sentence under the hero tagline. */
  heroSupportingText:
    "Explore seven friendly worlds together — each one is a short, guided story with talk-about-it moments for grown-ups and kids.",

  /** Text on the main hero button. */
  heroButtonLabel: "Explore the Worlds",

  /** Secondary hero button (scrolls to the sample lesson). */
  heroSecondaryButtonLabel: "See a sample lesson",

  /**
   * Logo. Drop your real logo into `public/images/` and point to it here,
   * e.g. "/images/babes-world-logo.svg".
   */
  logo: {
    src: "/images/logo-placeholder.svg",
    alt: "BABES World logo",
  },

  /** Section headings and intro copy. */
  sections: {
    worlds: {
      id: "worlds",
      navLabel: "Worlds",
      title: "Choose a world to explore",
      intro:
        "Tap a glowing marker on the map. Feeling Forest is ready to explore — the other worlds are on the way!",
    },
    lesson: {
      id: "lesson",
      navLabel: "Sample lesson",
      title: "Inside a BABES World lesson",
      intro:
        "Every lesson is a short set of slides with big pictures, simple words, and a read-aloud button so early readers can follow along.",
    },
    signup: {
      id: "signup",
      navLabel: "Stay in touch",
      title: "Be the first to know",
      intro:
        "Join our list for launch news, free classroom resources, and new worlds as they open.",
      successTitle: "You're on the list!",
      successBody:
        "Thanks for joining the BABES World community. We'll be in touch soon.",
      buttonLabel: "Join the list",
    },
  },

  /** Footer. */
  footer: {
    /** Small print under the footer logo. */
    blurb:
      "BABES World is an educational nonprofit helping young children build healthy behaviors and make positive life decisions.",
    /** Change this to the real year/organisation line if you like. */
    legalName: "BABES World",
    note: "Demo site — placeholder artwork and sample lesson content.",
  },
} as const;

/**
 * Your Formspree form ID, read from the environment variable
 * NEXT_PUBLIC_FORMSPREE_ID (see `.env.example` and the README).
 * Nothing is stored on this website's server — the form posts straight to
 * Formspree.
 */
export const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "";

/** Full Formspree endpoint, or an empty string when it isn't configured yet. */
export const FORMSPREE_ENDPOINT = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : "";
