import videoAsset from "@/assets/cinematic-ottoman-bg.mp4.asset.json";

/**
 * Site-wide cinematic video background.
 * Fixed full-viewport, plays muted/looped, with a dark overlay for text contrast.
 * Honors prefers-reduced-motion (shows poster only, no playback).
 */
const CinematicVideoBackground = () => {
  const reduced = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden bg-background"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {!reduced && (
        <video
          src={videoAsset.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Light overlay so the cinematic video stays visible while text remains readable */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
};

export default CinematicVideoBackground;