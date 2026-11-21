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
 * QUIZ: after the last slide, each lesson ends with a short quiz. Each
 * question has a `question`, a list of `choices`, the `answer` (the number of
 * the right choice, counting from 0) and an `explain` line shown afterwards.
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

export type QuizQuestion = {
  question: string;
  choices: string[];
  /** Which choice is right, counting from 0. */
  answer: number;
  /** One friendly sentence shown after the child answers. */
  explain: string;
};

export type Lesson = {
  id: string;
  title: string;
  /** One line shown above the slides, e.g. who it's for / how long it takes. */
  subtitle: string;
  slides: LessonSlide[];
  /** Short check-in quiz shown after the last slide. */
  quiz: QuizQuestion[];
  /** One sentence shown on the "Great job!" screen. */
  wrapUp: string;
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
  quiz: [
    {
      question: "Which of these is a feeling?",
      choices: ["A tree", "Happy", "A backpack"],
      answer: 1,
      explain: "Happy is a feeling. Sad, mad and scared are feelings too.",
    },
    {
      question: "Is it okay to feel mad sometimes?",
      choices: ["Yes — all feelings are okay", "No — mad is a bad feeling"],
      answer: 0,
      explain: "Every feeling is okay to have. What matters is what we do next.",
    },
    {
      question: "A feeling is too big to carry alone. What can you do?",
      choices: ["Hide it", "Tell a grown-up you trust", "Pretend it isn't there"],
      answer: 1,
      explain: "Helpers want to listen. Telling someone makes big feelings smaller.",
    },
  ],
  wrapUp: "Feelings are easier to carry when we name them out loud.",
};

/** Sample lesson for Helping Harbor — placeholder art and copy. */
const helpingHarbor: Lesson = {
  id: "helping-harbor",
  title: "Finding My Helpers",
  subtitle: "Helping Harbor · sample lesson · about 5 minutes",
  slides: [
    {
      title: "Welcome to Helping Harbor",
      body: "The lighthouse at Helping Harbor shines so every boat can find its way home. Today we will find the helpers who light the way for us.",
      prompt: "What do you think a helper does?",
      image: {
        src: "/images/lessons/helping-harbor/slide-1.svg",
        alt: "Placeholder illustration: a lighthouse shining over a sunny harbor",
      },
    },
    {
      title: "Helpers are all around",
      body: "Parents, grandparents, teachers, coaches, doctors and school counselors are all helpers. They keep us safe and help us learn.",
      prompt: "Name one helper at home and one at school.",
      image: {
        src: "/images/lessons/helping-harbor/slide-2.svg",
        alt: "Placeholder illustration: a group of friendly grown-ups waving from the dock",
      },
    },
    {
      title: "Big problems need big helpers",
      body: "Some problems are small, like a lost pencil. Some are big, like feeling unsafe or someone hurting you. Big problems always go to a grown-up.",
      prompt: "Is a scraped knee a small problem or a big one?",
      image: {
        src: "/images/lessons/helping-harbor/slide-3.svg",
        alt: "Placeholder illustration: a small boat and a big ship side by side",
      },
    },
    {
      title: "How to ask for help",
      body: 'Look at the helper, use a clear voice and say what happened: "I need help. Something is wrong." If the first helper is busy, find another one.',
      prompt: 'Practise it: "I need help because ______."',
      image: {
        src: "/images/lessons/helping-harbor/slide-4.svg",
        alt: "Placeholder illustration: a child talking with a lighthouse keeper",
      },
    },
    {
      title: "Being a helper too",
      body: "You can be a helper for your friends! You can listen, be kind, and walk with them to a grown-up when they need one.",
      prompt: "How could you help a friend who looks sad?",
      image: {
        src: "/images/lessons/helping-harbor/slide-5.svg",
        alt: "Placeholder illustration: two friends walking together toward the lighthouse",
      },
    },
  ],
  quiz: [
    {
      question: "Who is a helper?",
      choices: ["A teacher", "A stranger online", "A cartoon on TV"],
      answer: 0,
      explain: "Teachers, parents and counselors are trusted helpers.",
    },
    {
      question: "Someone is hurting you. What kind of problem is that?",
      choices: ["A small problem", "A big problem — tell a grown-up"],
      answer: 1,
      explain: "Big problems always go to a grown-up you trust.",
    },
    {
      question: "The first helper you ask is too busy. What should you do?",
      choices: ["Give up", "Find another helper", "Keep it a secret"],
      answer: 1,
      explain: "Keep asking until a helper listens. You deserve help.",
    },
  ],
  wrapUp: "There is always a helper ready to light the way.",
};

/** Sample lesson for Decision Delta — placeholder art and copy. */
const decisionDelta: Lesson = {
  id: "decision-delta",
  title: "Stop, Think, Choose",
  subtitle: "Decision Delta · sample lesson · about 5 minutes",
  slides: [
    {
      title: "Welcome to Decision Delta",
      body: "At Decision Delta the river splits into lots of little streams. Every stream is a different choice — and we get to pick which way to go.",
      prompt: "What is one choice you made today?",
      image: {
        src: "/images/lessons/decision-delta/slide-1.svg",
        alt: "Placeholder illustration: a river splitting into many streams",
      },
    },
    {
      title: "Stop",
      body: "Before a big choice, stop. Take one slow breath in through your nose and out through your mouth. Stopping gives your brain time to catch up.",
      prompt: "Let's try one slow breath together.",
      image: {
        src: "/images/lessons/decision-delta/slide-2.svg",
        alt: "Placeholder illustration: a stop sign beside the riverbank",
      },
    },
    {
      title: "Think",
      body: "Ask yourself: Is it safe? Is it kind? Would my helpers be okay with it? Think about what might happen next.",
      prompt: "What questions can you ask before you choose?",
      image: {
        src: "/images/lessons/decision-delta/slide-3.svg",
        alt: "Placeholder illustration: a child thinking with a thought bubble",
      },
    },
    {
      title: "Choose",
      body: "Now pick the choice that is safe, kind and healthy. Even when friends choose something else, you can choose what is right for you.",
      prompt: 'Practise saying: "No thanks, I choose ______."',
      image: {
        src: "/images/lessons/decision-delta/slide-4.svg",
        alt: "Placeholder illustration: a canoe paddling down one bright stream",
      },
    },
    {
      title: "Check how it went",
      body: "Afterwards, check: How did that choice feel? If it didn't go well, that's okay — every choice helps us learn for next time.",
      prompt: "What is a good choice you are proud of?",
      image: {
        src: "/images/lessons/decision-delta/slide-5.svg",
        alt: "Placeholder illustration: a child smiling on the riverbank at sunset",
      },
    },
  ],
  quiz: [
    {
      question: "What is the first step before a big choice?",
      choices: ["Choose fast", "Stop and breathe", "Ask a friend to choose"],
      answer: 1,
      explain: "Stopping first gives your brain time to think.",
    },
    {
      question: "Which question helps you think about a choice?",
      choices: ["Is it safe and kind?", "Is it the fastest?", "Will it look cool?"],
      answer: 0,
      explain: "Safe, kind and healthy choices are the strongest ones.",
    },
    {
      question: "A choice didn't go well. What now?",
      choices: ["Learn from it for next time", "Never choose again"],
      answer: 0,
      explain: "Every choice teaches us something. You can try again.",
    },
  ],
  wrapUp: "Stop, think, choose — you are the captain of your own canoe.",
};

/** Every lesson on the site, looked up by id. */
export const lessons: Record<string, Lesson> = {
  "feeling-forest": feelingForest,
  "helping-harbor": helpingHarbor,
  "decision-delta": decisionDelta,
};

/** Helper used by the lesson viewer. */
export function getLesson(id: string | null | undefined): Lesson | undefined {
  if (!id) return undefined;
  return lessons[id];
}
