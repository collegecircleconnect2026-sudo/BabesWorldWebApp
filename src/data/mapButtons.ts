/**
 * =============================================================================
 * MAP PICTURE + MAP BUTTONS — safe for non-developers to edit
 * =============================================================================
 * This file controls the BABES World map picture and the round clickable
 * buttons that sit on top of it. (What each place's pop-up SAYS lives in
 * `src/data/worlds.ts`.)
 *
 * HOW THE POSITIONS WORK
 *   Every button has an `x` and a `y`, measured in PERCENT of the picture:
 *     x:  0 = left edge of the picture    100 = right edge
 *     y:  0 = top edge of the picture     100 = bottom edge
 *   The numbers mark the CENTRE of the round button. Because they are
 *   percentages, each button stays on its spot at every screen size.
 *
 * TO NUDGE A BUTTON
 *   Change its `x` (left/right) or `y` (up/down) by 0.5 – 1 at a time, save,
 *   and look at the page — `npm run dev` refreshes it automatically.
 *
 * TO FIND A SPOT FROM SCRATCH
 *   Open the map picture in any viewer that shows pixel positions (Preview,
 *   Paint, Photoshop, GIMP, …), point at the spot and read off its pixels:
 *     x = pixels from the left ÷ picture width  × 100
 *     y = pixels from the top  ÷ picture height × 100
 *   Example: a spot 445 px from the left and 650 px from the top of the
 *   1060 × 921 picture is  x = 445 ÷ 1060 × 100 = 42,  y = 650 ÷ 921 × 100 = 70.6.
 *
 * WHAT EACH BUTTON OPENS
 *   `id` links the button to a place in `src/data/worlds.ts`. Feeling Forest
 *   opens the sample lesson; every other button opens the friendly
 *   "coming in the full platform" pop-up.
 *
 * NOT BUTTONS, ON PURPOSE
 *   BABES Choir, Self Help Groups, BABES Alive and Smoking Cessation Clinic
 *   are painted on the artwork as labels only, so they have no entry here.
 * =============================================================================
 */

import type { WorldId } from "@/data/worlds";

/**
 * The map picture. To swap it, replace the file at
 * `public/images/babes-world-map.png` (or point `src` at a new file in
 * `public/images/`). If the new picture has a different size or crop,
 * update `width`/`height` and re-check the button positions below.
 */
export const mapArtwork = {
  src: "/images/babes-world-map.png",
  alt: "Hand-painted map of BABES World: a round island world beneath a snowy mountain, with Decision Delta, Coping Canyon, Helping Harbor and Prevention Place along the top, the Feeling Forest ringed around a crystal fountain in the middle, and a rainbow sweeping down to the goal of a drug-free community.",
  /** The picture's size in pixels (used to keep its shape while it loads). */
  width: 1060,
  height: 921,
};

export type MapButton = {
  /** Which place the button opens — must match an `id` in `src/data/worlds.ts`. */
  id: WorldId;
  /** The place's name: read out by screen readers, shown on hover, and used in the list under the map. */
  label: string;
  /** Percent from the LEFT edge of the picture to the button's centre (0–100). */
  x: number;
  /** Percent from the TOP edge of the picture to the button's centre (0–100). */
  y: number;
};

/**
 * One entry per clickable place. This order is also the Tab / arrow-key
 * order on the map and the order of the list under it.
 */
export const mapButtons: MapButton[] = [
  /* ---- THE SAMPLE LESSON — keep this one first ------------------------- */
  // Just below the painted "THE FEELING FOREST" sign, on the forest trees.
  { id: "feeling-forest", label: "Feeling Forest", x: 42, y: 71.5 },

  /* ---- Top of the map, left to right ------------------------------------ */
  // On the yellow marsh under the "DECISION DELTA" sign.
  { id: "decision-delta", label: "Decision Delta", x: 22, y: 12.5 },
  // On the canyon wall, up and to the left of the "COPING CANYON" sign.
  { id: "coping-canyon", label: "Coping Canyon", x: 35.5, y: 11.5 },
  // On the red road just under the top "DIVERGENT PATHS" sign.
  { id: "divergent-paths", label: "Divergent Paths", x: 55.8, y: 11.5 },
  // In the lighthouse picture, above the "HELPING HARBOR" sign.
  { id: "helping-harbor", label: "Helping Harbor", x: 70.5, y: 19.5 },
  // On the bow on top of the gift-wrapped "PREVENTION PLACE" house.
  { id: "prevention-place", label: "Prevention Place", x: 79, y: 7.5 },

  /* ---- Left side, top to bottom ----------------------------------------- */
  // On the Rx building, above the "CLINICIANS" sign.
  { id: "clinicians", label: "Clinicians", x: 28, y: 29.5 },
  // On the water under the "PEER PRESSURE PIER" sign.
  { id: "peer-pressure-pier", label: "Peer Pressure Pier", x: 36.5, y: 39.5 },
  // On the roof of the little red schoolhouse.
  { id: "educators", label: "Educators", x: 19.8, y: 44 },
  // Just off the lower-left edge of the "CHILDREN'S ADVENTURE" balloon.
  { id: "childrens-adventure", label: "Children's Adventure", x: 15.8, y: 60 },
  // On the rooftops of the "COMMUNITY" block houses.
  { id: "community-activists", label: "Community/Activists", x: 28, y: 60 },

  /* ---- Right side, top to bottom ---------------------------------------- */
  // Just off the lower-right edge of the "PRIZES GALORE!" balloon.
  { id: "prizes-galore", label: "Prizes Galore", x: 76, y: 34.6 },
  // On the green hill, left of the "PARTY PARK" sign.
  { id: "party-park", label: "Party Park", x: 63.2, y: 40.2 },
  // On the upper-right rim of the "TEEN INSTITUTE" balloon.
  { id: "teen-institute", label: "Teen Institute", x: 82.7, y: 43.5 },
  // On the city buildings, left of the "SAFE CITY" sign.
  { id: "safe-city", label: "Safe City", x: 73.5, y: 52 },

  /* ---- Bottom: the rainbow ---------------------------------------------- */
  // On the rainbow, beside its seven community labels (Government → Families).
  { id: "building-a-community", label: "Building a Community", x: 38, y: 81.5 },
];
