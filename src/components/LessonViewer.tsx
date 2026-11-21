"use client";

import { useEffect, useRef, useState } from "react";

import type { Lesson } from "@/data/lessons";
import { useSpeech } from "@/hooks/useSpeech";

type LessonViewerProps = {
  lesson: Lesson;
  /** Passed in when the viewer is inside a pop-up, so we can show a close button. */
  onClose?: () => void;
};

/** What the read-aloud button says when a slide has no custom `readAloud` text. */
function slideSpeech(lesson: Lesson, index: number) {
  const slide = lesson.slides[index];
  if (slide.readAloud) return slide.readAloud;
  return [slide.title, slide.body, slide.prompt].filter(Boolean).join(". ");
}

type Phase = "slides" | "quiz" | "done";

/**
 * Slide-based lesson player: picture + text per slide, Next / Back buttons,
 * a progress indicator, and a read-aloud button powered by the browser's
 * built-in speech synthesis. After the last slide comes a short quiz, then a
 * "Great job!" screen with the score.
 */
export default function LessonViewer({ lesson, onClose }: LessonViewerProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("slides");
  const [quizIndex, setQuizIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const finished = phase !== "slides";
  const { supported: speechSupported, speaking, toggle, stop } = useSpeech();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  const total = lesson.slides.length;
  const slide = lesson.slides[index];
  const isLast = index === total - 1;

  // Stop any read-aloud when the slide changes, and move screen-reader focus
  // to the new slide title so the change is announced.
  useEffect(() => {
    stop();
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [index, phase, quizIndex, stop]);

  const hasQuiz = lesson.quiz.length > 0;
  const question = lesson.quiz[quizIndex];
  const isLastQuestion = quizIndex === lesson.quiz.length - 1;

  function goNext() {
    if (isLast) {
      setQuizIndex(0);
      setPicked(null);
      setScore(0);
      setPhase(hasQuiz ? "quiz" : "done");
    } else {
      setIndex((current) => Math.min(current + 1, total - 1));
    }
  }

  function goBack() {
    if (finished) return;
    setIndex((current) => Math.max(current - 1, 0));
  }

  function restart() {
    setPhase("slides");
    setIndex(0);
  }

  function pick(choice: number) {
    if (picked !== null || !question) return;
    setPicked(choice);
    if (choice === question.answer) setScore((current) => current + 1);
  }

  function nextQuestion() {
    if (isLastQuestion) {
      setPhase("done");
    } else {
      setQuizIndex((current) => current + 1);
      setPicked(null);
    }
  }

  /** Left / right arrow keys move between slides. */
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (finished) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goBack();
    }
  }

  return (
    <div
      className="flex flex-col"
      onKeyDown={handleKeyDown}
      role="group"
      aria-roledescription="lesson"
      aria-label={`${lesson.title} lesson`}
    >
      {/* ---- Header: lesson name + close button ---------------------------- */}
      <div className="flex items-start justify-between gap-4 border-b border-cream-deep px-5 py-4 sm:px-7">
        <div>
          <h2 className="font-display text-2xl leading-tight font-bold text-navy sm:text-3xl">
            {lesson.title}
          </h2>
          <p className="mt-1 text-sm text-ink-soft">{lesson.subtitle}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full bg-cream-deep px-4 py-3 text-sm font-bold text-ink transition hover:bg-gold/30"
          >
            Close
            <span className="sr-only"> lesson</span>
          </button>
        )}
      </div>

      {phase === "quiz" && question ? (
        /* ---- Quiz ------------------------------------------------------- */
        <div className="animate-fade-up px-5 py-6 sm:px-7 sm:py-8">
          <p className="text-xs font-bold tracking-[0.14em] text-crimson uppercase">
            Quick check · Question {quizIndex + 1} of {lesson.quiz.length}
          </p>
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="mt-2 font-display text-2xl leading-tight font-bold text-balance outline-none sm:text-3xl"
          >
            {question.question}
          </h3>

          <ul className="mt-6 grid list-none gap-3" aria-label="Answer choices">
            {question.choices.map((choice, i) => {
              const isAnswer = i === question.answer;
              const isPicked = i === picked;
              const revealed = picked !== null;
              let tone =
                "border-ink/10 bg-white hover:border-navy/40 hover:bg-sky-light";
              if (revealed && isAnswer) tone = "border-mint bg-mint/10";
              else if (revealed && isPicked) tone = "border-crimson bg-crimson/10";
              else if (revealed) tone = "border-ink/10 bg-white opacity-60";

              return (
                <li key={choice}>
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-disabled={revealed}
                    className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 px-5 py-3 text-left text-lg font-bold text-ink transition duration-200 ${tone} ${
                      revealed ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-cream-deep text-sm"
                    >
                      {revealed && isAnswer
                        ? "✓"
                        : revealed && isPicked
                          ? "✕"
                          : String.fromCharCode(65 + i)}
                    </span>
                    {choice}
                    {revealed && isAnswer && (
                      <span className="sr-only"> (correct answer)</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div aria-live="polite">
            {picked !== null && (
              <p
                className={`animate-fade-up mt-5 rounded-2xl px-4 py-3 text-lg font-semibold ${
                  picked === question.answer ? "bg-mint/10" : "bg-gold/15"
                }`}
              >
                <span className="mr-2" aria-hidden="true">
                  {picked === question.answer ? "🌟" : "💡"}
                </span>
                {picked === question.answer ? "That's right! " : "Good try! "}
                {question.explain}
              </p>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => {
                setPhase("slides");
                setIndex(total - 1);
              }}
              className="min-h-14 flex-1 rounded-full border-2 border-ink/15 px-6 py-3 text-lg font-bold text-ink transition hover:bg-cream"
            >
              ← Lesson
            </button>
            <button
              type="button"
              onClick={nextQuestion}
              disabled={picked === null}
              className="min-h-14 flex-1 rounded-full bg-crimson px-6 py-3 text-lg font-bold text-white transition hover:bg-crimson-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLastQuestion ? "See results" : "Next →"}
            </button>
          </div>
        </div>
      ) : phase === "done" ? (
        /* ---- Finished state --------------------------------------------- */
        <div className="animate-fade-up px-5 py-10 text-center sm:px-7">
          <p className="text-6xl" aria-hidden="true">
            🎉
          </p>
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="mt-4 font-display text-2xl font-bold outline-none sm:text-3xl"
          >
            Great job!
          </h3>
          <p className="mx-auto mt-2 max-w-md text-lg text-ink-soft">
            You finished {lesson.title}. {lesson.wrapUp}
          </p>
          {hasQuiz && (
            <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-mint/10 px-5 py-2 text-base font-bold text-mint">
              <span aria-hidden="true">⭐</span>
              Quiz score: {score} of {lesson.quiz.length}
            </p>
          )}
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={restart}
              className="min-h-14 rounded-full bg-crimson px-7 py-3 text-lg font-bold text-white transition hover:bg-crimson-deep"
            >
              Start over
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="min-h-14 rounded-full border-2 border-ink/15 px-7 py-3 text-lg font-bold text-ink transition hover:bg-cream"
              >
                Back to the map
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* ---- Slide ---------------------------------------------------- */}
          <div key={index} className="animate-fade-up px-5 py-5 sm:px-7 sm:py-6">
            <img
              src={slide.image.src}
              alt={slide.image.alt}
              className="aspect-[4/3] w-full rounded-blob bg-cream-deep object-cover"
              width={800}
              height={600}
            />

            <h3
              ref={headingRef}
              tabIndex={-1}
              className="mt-5 font-display text-2xl leading-tight font-bold outline-none sm:text-3xl"
            >
              {slide.title}
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-ink sm:text-xl">
              {slide.body}
            </p>

            {slide.prompt && (
              <p className="mt-4 rounded-2xl bg-gold/15 px-4 py-3 text-lg font-semibold text-ink">
                <span className="mr-2" aria-hidden="true">
                  💬
                </span>
                {slide.prompt}
              </p>
            )}

            {/* Read-aloud (hidden when the browser has no speech support). */}
            {speechSupported && (
              <button
                type="button"
                onClick={() => toggle(slideSpeech(lesson, index))}
                aria-pressed={speaking}
                className="mt-5 inline-flex min-h-14 items-center gap-2 rounded-full bg-navy px-6 py-3 text-lg font-bold text-white transition hover:bg-navy-deep"
              >
                <span aria-hidden="true">{speaking ? "⏹️" : "🔊"}</span>
                {speaking ? "Stop reading" : "Read this to me"}
              </button>
            )}
          </div>

          {/* ---- Progress + navigation ------------------------------------ */}
          <div className="border-t border-cream-deep px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <div
                className="h-3 flex-1 overflow-hidden rounded-full bg-cream-deep"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={total}
                aria-valuenow={index + 1}
                aria-label={`Slide ${index + 1} of ${total}`}
              >
                <div
                  className="h-full rounded-full bg-mint transition-[width] duration-300"
                  style={{ width: `${((index + 1) / total) * 100}%` }}
                />
              </div>
              <p className="text-sm font-bold whitespace-nowrap text-ink-soft">
                Slide {index + 1} of {total}
              </p>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={index === 0}
                className="min-h-14 flex-1 rounded-full border-2 border-ink/15 px-6 py-3 text-lg font-bold text-ink transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="min-h-14 flex-1 rounded-full bg-crimson px-6 py-3 text-lg font-bold text-white transition hover:bg-crimson-deep"
              >
                {isLast ? (hasQuiz ? "Take the quiz →" : "Finish") : "Next →"}
              </button>
            </div>

            <p className="sr-only" aria-live="polite">
              Slide {index + 1} of {total}: {slide.title}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
