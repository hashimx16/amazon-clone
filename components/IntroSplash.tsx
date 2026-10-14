"use client";

import { useEffect, useRef, useState } from "react";

const frameNames = [
  "8th", "9th", "10th", "11st", "12nd", "13rd", "14th", "15th", "16th",
  "17th", "18th", "19th", "20th", "21st", "22nd", "23rd", "24th",
  "25th", "26th", "27th", "28th", "29th", "30th",
];
const frames = frameNames.map((name) => `/animation/${encodeURIComponent(`${name} Frame.png`)}`);
const frameDuration = 75;
const finalFrameHold = 500;
const fadeDuration = 700;

export default function IntroSplash() {
  const [phase, setPhase] = useState<"loading" | "playing" | "fading" | "done">("loading");
  const [frameIndex, setFrameIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animation = useRef<number | null>(null);
  const dismissed = useRef(false);
  const loadedFrames = useRef<HTMLImageElement[]>([]);

  useEffect(() => {
    let cancelled = false;
    try {
      if (sessionStorage.getItem("hasSeenSplash") === "true" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setPhase("done");
        return;
      }
    } catch {
      // Storage can be unavailable in privacy-restricted contexts; playback still works.
    }

    Promise.all(frames.map((src) => new Promise<HTMLImageElement>((resolve) => {
      const image = new window.Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(image);
      image.src = src;
    }))).then((images) => {
      if (cancelled || dismissed.current) return;
      loadedFrames.current = images;
      setPhase("playing");
      const started = performance.now();
      const advance = (now: number) => {
        if (dismissed.current) return;
        const next = Math.min(frames.length - 1, Math.floor((now - started) / frameDuration));
        setFrameIndex(next);
        if (next === frames.length - 1) {
          timer.current = setTimeout(() => dismiss(), finalFrameHold);
        } else {
          animation.current = requestAnimationFrame(advance);
        }
      };
      animation.current = requestAnimationFrame(advance);
    });

    return () => {
      cancelled = true;
      if (animation.current !== null) cancelAnimationFrame(animation.current);
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, []);

  function dismiss() {
    if (dismissed.current) return;
    dismissed.current = true;
    if (animation.current !== null) cancelAnimationFrame(animation.current);
    if (timer.current !== null) clearTimeout(timer.current);
    try { sessionStorage.setItem("hasSeenSplash", "true"); } catch { /* Continue without persistence. */ }
    setPhase("fading");
    timer.current = setTimeout(() => {
      document.documentElement.dataset.hasSeenSplash = "true";
      setPhase("done");
    }, fadeDuration);
  }

  if (phase === "done") return null;

  return <div id="intro-splash" role="dialog" aria-modal="true" aria-label="Intro animation" className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-700 ease-out ${phase === "fading" ? "pointer-events-none opacity-0" : "opacity-100"}`}>
    <img src={frames[frameIndex]} alt="" className="max-h-full max-w-full object-contain" />
    <button type="button" onClick={dismiss} className="absolute right-4 top-4 rounded-sm border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-gray-600">Skip</button>
  </div>;
}
