import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/config/site";
import { lessons } from "@/data/lessons";
import { worlds } from "@/data/worlds";

export const metadata: Metadata = {
  title: `Lesson studio (preview) — ${site.wordmark}`,
  description: "Preview of the staff tool for adding and editing BabesWorld lessons.",
  robots: { index: false },
};

const sidebar = [
  { icon: "📚", label: "Lessons", active: true },
  { icon: "🗺️", label: "Map stops" },
  { icon: "❓", label: "Quizzes" },
  { icon: "🖼️", label: "Media library" },
  { icon: "🔑", label: "Access keys" },
  { icon: "📈", label: "Reports" },
];

const inputClass =
  "mt-1.5 block w-full rounded-xl border-2 border-ink/10 bg-cream/60 px-3.5 py-2.5 text-ink disabled:cursor-not-allowed";

/**
 * Static mock-up of the staff "lesson studio": a lesson list built from the
 * real lesson data, plus an editor panel. Nothing here saves — it shows
 * where staff will add and edit lessons in the full platform.
 */
export default function AdminPage() {
  const rows = worlds.map((world) => {
    const lesson = world.lessonId ? lessons[world.lessonId] : undefined;
    return {
      id: world.id,
      icon: world.icon,
      stop: world.name,
      title: lesson?.title ?? "—",
      slides: lesson?.slides.length ?? 0,
      quiz: lesson?.quiz.length ?? 0,
      status: lesson ? "Published" : "Draft",
    };
  });
  const editing = lessons["feeling-forest"];

  return (
    <>
      <Header />
      <main id="main" className="bg-cream-deep px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* ---- Title bar ------------------------------------------------- */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/90 px-4 py-1.5 text-xs font-extrabold tracking-[0.14em] text-sky uppercase shadow-sm">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-sky" />
                Staff screen preview
              </p>
              <h1 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight text-navy sm:text-5xl">
                Lesson studio
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-ink-soft">
                Where BABES staff will create, edit and publish lessons and
                quizzes for every stop on the map. This is a static mock-up —
                nothing on this page saves.
              </p>
            </div>
            <button
              type="button"
              disabled
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-crimson px-6 py-3 font-bold text-white opacity-60"
              title="Available in the full platform"
            >
              <span aria-hidden="true">＋</span> New lesson
            </button>
          </div>

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
            {/* ---- Sidebar ------------------------------------------------- */}
            <nav aria-label="Studio sections (preview)" className="min-w-0">
              <ul className="flex list-none gap-2 overflow-x-auto lg:flex-col">
                {sidebar.map((item) => (
                  <li key={item.label} className="shrink-0">
                    <span
                      aria-current={item.active ? "page" : undefined}
                      className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold whitespace-nowrap ${
                        item.active
                          ? "bg-navy text-white shadow-sm"
                          : "text-ink-soft"
                      }`}
                    >
                      <span aria-hidden="true">{item.icon}</span>
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6">
              {/* ---- Lesson table ------------------------------------------ */}
              <section
                aria-labelledby="lesson-list-heading"
                className="overflow-hidden rounded-blob bg-white shadow-sm ring-1 ring-navy/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream-deep px-5 py-4 sm:px-6">
                  <h2
                    id="lesson-list-heading"
                    className="font-display text-xl font-bold text-navy"
                  >
                    All lessons
                  </h2>
                  <p className="text-sm font-bold text-ink-soft">
                    {rows.filter((row) => row.status === "Published").length}{" "}
                    published · {rows.length} map stops
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[36rem] text-left text-sm">
                    <thead className="bg-cream/70 text-xs tracking-wide text-ink-soft uppercase">
                      <tr>
                        <th scope="col" className="px-5 py-3 font-bold sm:px-6">Map stop</th>
                        <th scope="col" className="px-3 py-3 font-bold">Lesson</th>
                        <th scope="col" className="px-3 py-3 font-bold">Slides</th>
                        <th scope="col" className="px-3 py-3 font-bold">Quiz</th>
                        <th scope="col" className="px-5 py-3 font-bold sm:px-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-deep">
                      {rows.map((row) => (
                        <tr
                          key={row.id}
                          className={row.id === editing.id ? "bg-sky-light/60" : ""}
                        >
                          <th scope="row" className="px-5 py-3 font-bold whitespace-nowrap sm:px-6">
                            <span aria-hidden="true" className="mr-2">
                              {row.icon}
                            </span>
                            {row.stop}
                          </th>
                          <td className="px-3 py-3 text-ink-soft">{row.title}</td>
                          <td className="px-3 py-3 text-ink-soft">{row.slides || "—"}</td>
                          <td className="px-3 py-3 text-ink-soft">
                            {row.quiz ? `${row.quiz} questions` : "—"}
                          </td>
                          <td className="px-5 py-3 sm:px-6">
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                row.status === "Published"
                                  ? "bg-mint/12 text-mint"
                                  : "bg-ink/5 text-ink-soft"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ---- Editor mock-up ---------------------------------------- */}
              <section
                aria-labelledby="editor-heading"
                className="rounded-blob bg-white p-5 shadow-sm ring-1 ring-navy/10 sm:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 id="editor-heading" className="font-display text-xl font-bold text-navy">
                    Editing: {editing.title}
                  </h2>
                  <span className="rounded-full bg-gold/20 px-3 py-1 text-xs font-bold">
                    Read-only preview
                  </span>
                </div>

                <fieldset disabled className="mt-5 grid gap-5 md:grid-cols-2">
                  <legend className="sr-only">Lesson details (preview, not editable)</legend>
                  <label className="block text-sm font-bold">
                    Lesson title
                    <input className={inputClass} defaultValue={editing.title} />
                  </label>
                  <label className="block text-sm font-bold">
                    Map stop
                    <select className={inputClass} defaultValue="feeling-forest">
                      {worlds.map((world) => (
                        <option key={world.id} value={world.id}>
                          {world.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm font-bold md:col-span-2">
                    Subtitle
                    <input className={inputClass} defaultValue={editing.subtitle} />
                  </label>
                </fieldset>

                <h3 className="mt-7 text-sm font-extrabold tracking-[0.14em] text-ink-soft uppercase">
                  Slides
                </h3>
                <ol className="mt-3 flex list-none gap-3 overflow-x-auto pb-2">
                  {editing.slides.map((slide, i) => (
                    <li
                      key={slide.title}
                      className="w-40 shrink-0 overflow-hidden rounded-2xl bg-cream ring-1 ring-navy/10"
                    >
                      <img
                        src={slide.image.src}
                        alt=""
                        width={160}
                        height={120}
                        className="aspect-[4/3] w-full object-cover"
                      />
                      <p className="px-3 py-2 text-xs font-bold leading-snug">
                        {i + 1}. {slide.title}
                      </p>
                    </li>
                  ))}
                  <li className="flex w-40 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-navy/20 text-sm font-bold text-ink-soft">
                    ＋ Add slide
                  </li>
                </ol>

                <h3 className="mt-6 text-sm font-extrabold tracking-[0.14em] text-ink-soft uppercase">
                  Quiz questions
                </h3>
                <ul className="mt-3 grid list-none gap-2">
                  {editing.quiz.map((q) => (
                    <li
                      key={q.question}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-cream px-4 py-3 text-sm"
                    >
                      <span className="font-bold">{q.question}</span>
                      <span className="text-ink-soft">
                        Answer: {q.choices[q.answer]}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-cream-deep pt-5">
                  <button
                    type="button"
                    disabled
                    className="min-h-12 rounded-full border-2 border-ink/15 px-6 py-2.5 font-bold text-ink opacity-60"
                  >
                    Save draft
                  </button>
                  <button
                    type="button"
                    disabled
                    className="min-h-12 rounded-full bg-navy px-6 py-2.5 font-bold text-white opacity-60"
                  >
                    Publish
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
