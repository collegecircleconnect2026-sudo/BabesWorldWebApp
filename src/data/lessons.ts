/**
 * =============================================================================
 * LESSON CONTENT — safe for non-developers to edit
 * =============================================================================
 * A lesson is a list of slides. Each slide has:
 *
 *   title      the big heading on the slide
 *   body       the sentence(s) a grown-up (or the read-aloud button) reads
 *   prompt     an optional "talk about it" question, shown in a tinted box
 *   image      the picture: `src` is a file inside the `public` folder,
 *              `alt` describes the picture for screen readers (please fill it in!)
 *   readAloud  OPTIONAL. If present, this is what the read-aloud button speaks.
 *              If left out, it reads the title + body + prompt.
 *
 * To change lesson text: edit the words between the quotes.
 * To change a picture: drop your image into `public/images/lessons/...` and put
 * its path in `src` (for example "/images/lessons/feeling-forest/slide-1.png").
 * To add a slide: copy a whole `{ ... },` block and edit it.
 *
 * To add a NEW lesson: copy the whole "feeling-forest" block at the bottom,
 * give it a new id, then set that id as the `lessonId` of a world in
 * `src/data/worlds.ts`.
 * =============================================================================
 */

export type LessonSlide = {
  title: string;
  body: string;
  prompt?: string;
  image: { src: string; alt: string };
  readAloud?: string;
};

export type Lesson = {
  id: string;
  title: string;
  /** One line shown above the slides, e.g. who it's for / how long it takes. */
  subtitle: string;
  slides: LessonSlide[];
};

/** Sample lesson for Feeling Forest — placeholder art, real-ish copy. */
const feelingForest: Lesson = {
  id: "feeling-forest",
  title: "Naming My Feelings",
  subtitle: "Feeling Forest · sample lesson · about 5 minutes",
  slides: [
    {
      title: "Welcome to Feeling Forest",
      body: "In this forest, every animal has feelings — just like you. Today we will learn to name our feelings out loud.",
      prompt: "How are you feeling right now?",
      image: {
        src: "/images/lessons/feeling-forest/slide-1.svg",
        alt: "Placeholder illustration: a sunny forest path with friendly animals waving hello",
      },
    },
    {
      title: "Feelings live in our bodies",
      body: "When we feel something big, our body tells us first. Your tummy might flutter. Your face might get warm. Your hands might squeeze tight.",
      prompt: "Where do you feel things in your body?",
      image: {
        src: "/images/lessons/feeling-forest/slide-2.svg",
        alt: "Placeholder illustration: a child pointing to their tummy, heart and hands",
      },
    },
    {
      title: "Happy, sad, mad, scared",
      body: "Four feelings show up a lot: happy, sad, mad and scared. All of them are okay to have. None of them are bad.",
      prompt: "Can you make a happy face? Now a sad face!",
      image: {
        src: "/images/lessons/feeling-forest/slide-3.svg",
        alt: "Placeholder illustration: four cartoon faces showing happy, sad, mad and scared",
      },
    },
    {
      title: "Naming it helps",
      body: 'When we say "I feel sad," the feeling gets a little smaller and easier to carry. Naming a feeling is a brave, healthy choice.',
      prompt: 'Try it: "I feel ______ because ______."',
      image: {
        src: "/images/lessons/feeling-forest/slide-4.svg",
        alt: "Placeholder illustration: a rabbit telling a friend how it feels while the friend listens",
      },
    },
    {
      title: "Tell a helper",
      body: "If a feeling is too big to carry alone, tell a grown-up you trust. Helpers want to listen — that is their favourite job.",
      prompt: "Who are two grown-ups you could tell?",
      image: {
        src: "/images/lessons/feeling-forest/slide-5.svg",
        alt: "Placeholder illustration: a child talking with a trusted adult under a big tree",
      },
    },
  ],
};

/** Every lesson on the site, looked up by id. */
export const lessons: Record<string, Lesson> = {
  "feeling-forest": feelingForest,
};

/** Helper used by the lesson viewer. */
export function getLesson(id: string | null | undefined): Lesson | undefined {
  if (!id) return undefined;
  return lessons[id];
}
