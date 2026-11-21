"use client";

import { useRef, useState } from "react";

/** The key that unlocks the preview dashboard in this demo. */
const DEMO_KEY = "BABES-DEMO-2026";

type Status = "idle" | "checking" | "error" | "unlocked";

/** Formats typing into groups like ABCD-EFGH-1234 and uppercases it. */
function formatKey(raw: string) {
  return raw
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .slice(0, 20);
}

const previewLessons = [
  { icon: "🌳", name: "Feeling Forest", done: 100 },
  { icon: "⛵", name: "Helping Harbor", done: 60 },
  { icon: "🧭", name: "Decision Delta", done: 20 },
  { icon: "⛰️", name: "Coping Canyon", done: 0 },
];

/**
 * Access-key entry with a pretend "unlock". Nothing is sent anywhere: the
 * key is compared with the demo key in the browser. Real accounts arrive
 * with the full platform.
 */
export default function AccessKeyForm() {
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!key.trim()) {
      setStatus("error");
      inputRef.current?.focus();
      return;
    }
    setStatus("checking");
    window.setTimeout(() => {
      if (key === DEMO_KEY) {
        setStatus("unlocked");
        window.setTimeout(() => headingRef.current?.focus(), 0);
      } else {
        setStatus("error");
        inputRef.current?.focus();
      }
    }, 700);
  }

  if (status === "unlocked") {
    return (
      <div className="animate-fade-up rounded-blob bg-white p-6 shadow-xl ring-1 ring-navy/10 sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-mint/12 px-3 py-1 text-xs font-bold text-mint">
            <span aria-hidden="true">🔓</span> Unlocked
          </p>
          <button
            type="button"
            onClick={() => {
              setKey("");
              setStatus("idle");
            }}
            className="rounded-full px-3 py-2 text-sm font-bold text-ink-soft transition hover:bg-cream hover:text-navy"
          >
            Sign out
          </button>
        </div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 font-display text-3xl font-bold tracking-tight text-navy outline-none"
        >
          Welcome back, Rivera family
        </h2>
        <p className="mt-2 text-ink-soft">
          Sample family dashboard — the full platform will show each child's
          real progress here.
        </p>

        <ul className="mt-6 grid list-none gap-3">
          {previewLessons.map((lesson) => (
            <li
              key={lesson.name}
              className="flex items-center gap-4 rounded-2xl bg-cream p-4"
            >
              <span aria-hidden="true" className="text-2xl">
                {lesson.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex justify-between gap-2 text-sm font-bold">
                  <span>{lesson.name}</span>
                  <span className="text-ink-soft">
                    {lesson.done === 100
                      ? "Complete"
                      : lesson.done === 0
                        ? "Not started"
                        : `${lesson.done}%`}
                  </span>
                </span>
                <span
                  className="mt-2 block h-2 overflow-hidden rounded-full bg-cream-deep"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={lesson.done}
                  aria-label={`${lesson.name} progress`}
                >
                  <span
                    className="block h-full rounded-full bg-mint"
                    style={{ width: `${lesson.done}%` }}
                  />
                </span>
              </span>
            </li>
          ))}
        </ul>

        <a
          href="/#worlds"
          className="mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-crimson px-7 py-3 text-lg font-bold text-white transition hover:bg-crimson-deep"
        >
          Open the map
        </a>
      </div>
    );
  }

  const checking = status === "checking";

  return (
    <div className="rounded-blob bg-white p-6 shadow-xl ring-1 ring-navy/10 sm:p-10">
      <p className="text-4xl" aria-hidden="true">
        🔑
      </p>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        Enter your access key
      </h2>
      <p className="mt-2 text-ink-soft">
        You'll find it on the welcome letter from your school or BABES
        program.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6">
        <label htmlFor="access-key" className="block text-sm font-bold text-ink">
          Access key
        </label>
        <input
          ref={inputRef}
          id="access-key"
          name="access-key"
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="XXXX-XXXX-XXXX"
          value={key}
          onChange={(event) => {
            setKey(formatKey(event.target.value));
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby="access-key-help"
          className="mt-2 block min-h-14 w-full rounded-2xl border-2 border-ink/15 bg-cream/50 px-4 py-3 font-mono text-lg tracking-[0.12em] text-ink transition placeholder:text-ink/30 focus:border-navy focus:bg-white focus:outline-none aria-invalid:border-crimson"
        />
        <p
          id="access-key-help"
          aria-live="polite"
          className={`mt-2 text-sm ${status === "error" ? "font-bold text-crimson" : "text-ink-soft"}`}
        >
          {status === "error"
            ? key
              ? "We couldn't find that key. Check the letters and try again."
              : "Please type your access key."
            : "Keys are 12–16 letters and numbers."}
        </p>

        <button
          type="submit"
          disabled={checking}
          className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-crimson px-7 py-3 text-lg font-bold text-white shadow-md transition duration-200 hover:-translate-y-px hover:bg-crimson-deep hover:shadow-lg disabled:cursor-wait disabled:opacity-70"
        >
          {checking ? (
            <>
              <span
                aria-hidden="true"
                className="size-5 animate-spin rounded-full border-[3px] border-white/40 border-t-white"
              />
              Checking…
            </>
          ) : (
            "Unlock BabesWorld"
          )}
        </button>
      </form>

      <div className="mt-6 rounded-2xl bg-gold/15 px-4 py-3 text-sm leading-relaxed">
        <p className="font-bold">Demo only</p>
        <p className="mt-0.5 text-ink-soft">
          Real family accounts are part of the full platform. To preview the
          unlocked dashboard, use the key{" "}
          <button
            type="button"
            onClick={() => {
              setKey(DEMO_KEY);
              setStatus("idle");
              inputRef.current?.focus();
            }}
            className="rounded font-mono font-bold text-navy underline decoration-navy/30 underline-offset-2 hover:decoration-navy"
          >
            {DEMO_KEY}
          </button>
          .
        </p>
      </div>
    </div>
  );
}
