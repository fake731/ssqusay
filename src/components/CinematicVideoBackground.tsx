import scene1 from "@/assets/siege-scene-1.mp4.asset.json";
import scene2 from "@/assets/siege-scene-2.mp4.asset.json";
import scene3 from "@/assets/siege-scene-3.mp4.asset.json";
import { useEffect, useRef, useState, useCallback } from "react";
import { Video, VideoOff } from "lucide-react";

const scenes = [scene1.url, scene2.url, scene3.url];

const CinematicVideoBackground = () => {
  const reduced = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("bg-video-enabled");
    return saved !== null ? saved === "true" : true;
  });
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("bg-video-enabled", String(next));
      if (!next && videoRef.current) videoRef.current.pause();
      if (next && videoRef.current) videoRef.current.play().catch(() => {});
      return next;
    });
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || reduced || !enabled) return;
    const onEnded = () => setCurrent((c) => (c + 1) % scenes.length);
    vid.addEventListener("ended", onEnded);
    return () => vid.removeEventListener("ended", onEnded);
  }, [reduced, enabled]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || reduced || !enabled) return;
    vid.src = scenes[current];
    vid.play().catch(() => {});
  }, [current, reduced, enabled]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggle}
        className="fixed top-20 left-4 z-50 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center text-primary hover:bg-card transition-colors"
        aria-label={enabled ? "إيقاف الفيديو" : "تشغيل الفيديو"}
        style={{ cursor: "pointer" }}
      >
        {enabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
      </button>

      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
      {!reduced && enabled && (
        <video
          ref={videoRef}
          src={scenes[0]}
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/25" />
      </div>
    </>
  );
};

export default CinematicVideoBackground;