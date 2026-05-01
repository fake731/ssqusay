import siegeVideo from "@/assets/siege-cinematic.mp4.asset.json";
import heroBg from "@/assets/ottoman-hero-bg.jpg";
import { useEffect, useRef, useState, useCallback } from "react";
import { Film, FilmIcon } from "lucide-react";

const CinematicVideoBackground = () => {
  const reduced = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  // Default: image background (video OFF). User opts in to play the video.
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("bg-video-enabled");
    return saved === "true";
  });
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("bg-video-enabled", String(next));
      return next;
    });
  }, []);

  return (
    <>
      {/* Always-on image background — hero of Constantinople with Ottoman flag */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -2,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -2,
          background:
            "linear-gradient(180deg, hsl(20 14% 4% / 0.55) 0%, hsl(20 14% 4% / 0.78) 60%, hsl(20 14% 4% / 0.92) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Toggle: dark themed pill — never white. Pressing it plays/stops the cinematic video on top of the image. */}
      <button
        onClick={toggle}
        className="fixed top-20 left-4 z-50 h-10 px-3 rounded-full bg-[hsl(20_14%_8%)]/90 backdrop-blur-md border border-primary/30 flex items-center gap-2 text-primary hover:border-primary/60 hover:bg-[hsl(20_14%_10%)] transition-all shadow-lg shadow-black/40"
        aria-label={enabled ? "إيقاف الفيديو" : "تشغيل الفيديو"}
        title={enabled ? "إيقاف الفيديو" : "تشغيل الفيديو"}
        style={{ cursor: "pointer" }}
      >
        {enabled ? <FilmIcon className="w-4 h-4" /> : <Film className="w-4 h-4" />}
        <span className="text-xs font-iphone">{enabled ? "إيقاف الفيديو" : "تشغيل الفيديو"}</span>
      </button>

      {/* Video layer renders only when user enables it — sits above the image, below content */}
      {!reduced && enabled && (
        <div
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: -1 }}
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            src={siegeVideo.url}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}
    </>
  );
};

export default CinematicVideoBackground;