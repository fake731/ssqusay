import scene1 from "@/assets/siege-scene-1.mp4.asset.json";
import scene2 from "@/assets/siege-scene-2.mp4.asset.json";
import scene3 from "@/assets/siege-scene-3.mp4.asset.json";
import { useEffect, useRef, useState } from "react";

const scenes = [scene1.url, scene2.url, scene3.url];

const CinematicVideoBackground = () => {
  const reduced = typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [current, setCurrent] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || reduced) return;
    const onEnded = () => setCurrent((c) => (c + 1) % scenes.length);
    vid.addEventListener("ended", onEnded);
    return () => vid.removeEventListener("ended", onEnded);
  }, [reduced]);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || reduced) return;
    vid.src = scenes[current];
    vid.play().catch(() => {});
  }, [current, reduced]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {!reduced && (
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
  );
};

export default CinematicVideoBackground;