"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Small wrapper around the browser's built-in SpeechSynthesis API
 * (no external service, nothing leaves the device).
 *
 * Returns:
 *   supported  false on browsers without speech synthesis — hide the button
 *   speaking   true while text is being read out loud
 *   speak()    reads the given text (cancels anything already playing)
 *   stop()     stops immediately
 */
export function useSpeech() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);

    // Never leave a voice talking after the component disappears.
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      // Starting fresh avoids two voices overlapping.
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.9; // a little slower — the audience is 5–8 years old
      utterance.pitch = 1.1;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      setSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [],
  );

  /** Convenience: press once to play, press again to stop. */
  const toggle = useCallback(
    (text: string) => {
      if (speaking) {
        stop();
      } else {
        speak(text);
      }
    },
    [speaking, speak, stop],
  );

  return { supported, speaking, speak, stop, toggle };
}
