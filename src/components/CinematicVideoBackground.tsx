import { useState } from "react";
import { Play, Pause } from "lucide-react";
import heroBg from "@/assets/ottoman-hero-bg.jpg";

/**
 * Cinematic still background. Defaults to a still image; the user can press
 * the play button to enable a slow drone-like Ken Burns motion over the image.
 */
const CinematicVideoBackground = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -2 }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-[-6%] will-change-transform"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: playing
              ? "droneKenBurns 40s ease-in-out infinite alternate"
              : "none",
            transform: playing ? undefined : "scale(1.05)",
          }}
        />
      </div>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -2,
          background:
            "linear-gradient(180deg, hsl(20 14% 4% / 0.55) 0%, hsl(20 14% 4% / 0.78) 60%, hsl(20 14% 4% / 0.92) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Play/Pause toggle — classic video-style button, top-left */}
      <button
        onClick={() => setPlaying((p) => !p)}
        className="fixed top-20 left-5 z-40 w-12 h-12 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6)] backdrop-blur flex items-center justify-center transition-all hover:scale-105"
        aria-label={playing ? "إيقاف الفيديو" : "تشغيل الفيديو"}
        title={playing ? "إيقاف الحركة" : "تشغيل الحركة السينمائية"}
      >
        {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
      </button>
    </>
  );
};

export default CinematicVideoBackground;