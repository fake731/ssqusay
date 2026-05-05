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

      {/* Play/Pause toggle */}
      <button
        onClick={() => setPlaying((p) => !p)}
        className="fixed bottom-5 left-5 z-40 w-11 h-11 rounded-full glass-section flex items-center justify-center text-foreground hover:border-primary/40 transition-all"
        aria-label={playing ? "إيقاف الفيديو" : "تشغيل الفيديو"}
        title={playing ? "إيقاف الحركة" : "تشغيل الحركة السينمائية"}
      >
        {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 mr-[-2px]" />}
      </button>
    </>
  );
};

export default CinematicVideoBackground;