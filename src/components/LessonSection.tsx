import LessonViewer from "@/components/LessonViewer";
import { site } from "@/config/site";
import { getLesson } from "@/data/lessons";
import { getWorld, worlds } from "@/data/worlds";

/**
 * Shows the sample lesson inline on the page (the same component the map
 * pop-up uses). It automatically picks the first world that has a lesson.
 */
export default function LessonSection() {
  const world = worlds.find((entry) => entry.lessonId);
  const lesson = getLesson(world?.lessonId);

  // Nothing to show if no world has a lesson yet.
  if (!world || !lesson) return null;

  const worldName = getWorld(world.id)?.name ?? world.name;

  return (
    <section
      id={site.sections.lesson.id}
      aria-labelledby="lesson-heading"
      className="bg-cream-deep px-4 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="lesson-heading"
          className="text-center font-display text-3xl font-bold text-navy sm:text-4xl"
        >
          {site.sections.lesson.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-ink-soft">
          {site.sections.lesson.intro}
        </p>
        <p className="mt-3 text-center text-sm font-bold tracking-wide text-crimson uppercase">
          Sample lesson from {worldName}
        </p>

        <div className="mt-9 overflow-hidden rounded-blob bg-white shadow-xl ring-1 ring-navy/10">
          <LessonViewer lesson={lesson} />
        </div>
      </div>
    </section>
  );
}
