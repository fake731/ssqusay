import heroBg from "@/assets/ottoman-hero-bg.jpg";

/**
 * Cinematic still background with a slow drone-like Ken Burns motion.
 * No video, no toggle — just the hero image gently panning/zooming.
 */
const CinematicVideoBackground = () => {
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
            animation: "droneKenBurns 40s ease-in-out infinite alternate",
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
    </>
  );
};

export default CinematicVideoBackground;