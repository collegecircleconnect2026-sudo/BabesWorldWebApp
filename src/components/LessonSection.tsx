import LessonTabs from "@/components/LessonTabs";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/config/site";
import { getLesson } from "@/data/lessons";
import { worlds } from "@/data/worlds";

/**
 * Shows the sample lessons inline on the page (the same viewer the map
 * pop-up uses), with a tab for every world that has a lesson.
 */
export default function LessonSection() {
  const entries = worlds.flatMap((world) => {
    const lesson = getLesson(world.lessonId);
    return lesson ? [{ worldName: world.name, icon: world.icon, lesson }] : [];
  });

  // Nothing to show if no world has a lesson yet.
  if (entries.length === 0) return null;

  return (
    <section
      id={site.sections.lesson.id}
      aria-labelledby="lesson-heading"
      className="bg-cream-deep px-4 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          id="lesson-heading"
          eyebrow={`${entries.length} sample lessons · each with a quiz`}
          title={site.sections.lesson.title}
          intro={site.sections.lesson.intro}
        />
        <div className="mt-10">
          <LessonTabs entries={entries} />
        </div>
      </div>
    </section>
  );
}
