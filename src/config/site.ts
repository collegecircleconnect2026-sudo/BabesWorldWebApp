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
  /** The program's name, shown in the header, hero and footer. */
  name: "BABES World",

  /** What the acronym stands for — shown under the name in the hero and footer. */
  fullName: "Beginning Awareness Basic Education Studies",

  /** The two official taglines. */
  taglines: {
    evidenceBased: "An Evidence-Based Program",
    notJustForBabies: "BABES Is Not Just For Babies",
  },

  /** The public web address, shown in the footer. */
  url: "babesworld.org",

  /** Short line for the browser tab description. */
  shortTagline: "An Evidence-Based Program",

  /** The big sentence on the hero. */
  tagline:
    "Helping young people from preschool through 12th grade build the life skills for happy, healthy, empowered, productive lives — free of self-defeating behavior.",

  /** Smaller supporting sentence under the hero tagline. */
  heroSupportingText:
    "Travel the BABES World map with Buttons and Bows and all their friends — from the Feeling Forest and Helping Harbor to Safe City — each stop a short, guided story with talk-about-it moments for classrooms and families.",

  /** Small line above the hero heading. */
  heroEyebrow: "An Evidence-Based Program · Trusted for more than 30 years",

  /** Text on the main hero button. */
  heroButtonLabel: "Explore the Map",

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
      navLabel: "The Map",
      title: "Explore the BABES World map",
      intro:
        "Every place on the map is a stop on the journey — from Coping Canyon to the rainbow that builds a drug-free community. The Feeling Forest is open to explore today; every other stop opens in the complete platform.",
    },
    lesson: {
      id: "lesson",
      navLabel: "Sample lesson",
      title: "Inside a BABES World lesson",
      intro:
        "Every lesson is a short set of slides with big pictures, simple words, and a read-aloud button so early readers can follow along.",
    },
    community: {
      id: "community",
      navLabel: "Community",
      title: "Building a BABES Community",
      intro:
        "Lasting prevention is a community effort. BABES World grows strongest when every layer of a community carries the same message — from the family table all the way to public policy.",
      outro:
        "Each arc of the rainbow strengthens the next. Licensing BABES World across a community aligns homes, classrooms and institutions around one consistent, evidence-based program.",
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

  /**
   * The seven layers of a BABES Community, innermost first.
   * Shown as the rainbow graphic in the "Building a BABES Community" section.
   * Each `accent` is a rainbow color name from `src/app/theme.css`.
   */
  communityTiers: [
    {
      name: "Families",
      blurb: "Where awareness begins — at home, from the very first years.",
      accent: "red",
    },
    {
      name: "Schools",
      blurb: "Classrooms from preschool through 12th grade, one shared language.",
      accent: "orange",
    },
    {
      name: "Social Agencies",
      blurb: "Counselors and community programs reinforcing the same skills.",
      accent: "yellow",
    },
    {
      name: "Churches",
      blurb: "Congregations extending the message of healthy, empowered living.",
      accent: "green",
    },
    {
      name: "Media",
      blurb: "Local voices amplifying prevention instead of pressure.",
      accent: "teal",
    },
    {
      name: "Business",
      blurb: "Employers and sponsors investing in the next generation.",
      accent: "blue",
    },
    {
      name: "Government",
      blurb: "Policy and public health sustaining the program community-wide.",
      accent: "violet",
    },
  ],

  /** Footer. */
  footer: {
    /** Small print under the footer logo. */
    blurb:
      "BABES World — Beginning Awareness Basic Education Studies — helps young people from preschool through 12th grade build life skills for happy, healthy, empowered, productive lives free of self-defeating behavior, with Buttons and Bows and all their friends.",
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
