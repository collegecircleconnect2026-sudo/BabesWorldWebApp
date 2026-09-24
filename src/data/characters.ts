/**
 * =============================================================================
 * "MEET THE BABES CHARACTERS" SLIDESHOW — safe for non-developers to edit
 * =============================================================================
 * Each `{ … },` block below is one slide. The slideshow shows them in this
 * order, one at a time, and loops back to the first after the last.
 *
 * TO ADD A PHOTO
 *   1. Drop the picture (.jpg, .png or .webp) into the `public/images/` folder.
 *   2. Copy a whole `{ … },` block, paste it where you want it in the list,
 *      and change:
 *        src      — the file's path, starting with "/images/"
 *        name     — the big caption under the photo (the character's name)
 *        caption  — an optional smaller line under the name
 *        alt      — a description of the photo for screen readers
 *        trim     — optional; see "BLACK BARS" below. Leave it out if the
 *                   photo has none.
 *
 * TO REORDER    Move a whole `{ … },` block up or down.
 * TO REMOVE     Delete its whole `{ … },` block (the file can stay in
 *               `public/images/`; it just won't be shown).
 *
 * Photos can be any shape — each one is shown whole inside the same rounded
 * frame, never stretched. If a file is missing, a friendly placeholder is
 * shown in its place instead of a broken image.
 *
 * BLACK BARS
 *   Some photos (e.g. phone screenshots) have black strips along the top and
 *   bottom. `trim: { top: 3, bottom: 4 }` hides 3% of the photo's height from
 *   the top and 4% from the bottom when it is shown. The file itself is not
 *   changed. Nudge the numbers until the strips disappear.
 *
 * NOTE: the names below are descriptive stand-ins. Replace them with each
 * character's real name.
 * =============================================================================
 */

export type Character = {
  /** Path to the photo inside `public/`, e.g. "/images/character-group.jpg". */
  src: string;
  /** Big caption under the photo — the character's name. */
  name: string;
  /** Optional smaller line under the name. */
  caption?: string;
  /** Description of the photo for screen readers. */
  alt: string;
  /** Percent of the photo's height to hide from the top / bottom edge. */
  trim?: { top: number; bottom: number };
};

export const characters: Character[] = [
  {
    src: "/images/character-group.jpg",
    name: "The BABES Friends",
    caption: "The whole gang together under the treehouse.",
    alt: "Six costumed BABES characters, including a pink bird, a beaver in a red bonnet, a white cat, a grey cat in a sailor hat and a grey bunny in a pink dress, posing together in front of a painted treehouse.",
    trim: { top: 6.4, bottom: 5.5 },
  },
  {
    src: "/images/beaver-and-bird.jpg",
    name: "Beaver & Pink Bird",
    caption: "Two BABES friends visiting Party Park.",
    alt: "A costumed beaver in glasses, a red bonnet and apron standing next to a big pink bird with yellow feet, in front of a painted park mural.",
    trim: { top: 3.2, bottom: 4.3 },
  },
];
