import { useEffect, useRef } from "react";

/**
 * Cinematic site-wide animated background.
 * Pure Canvas (no video assets) — performant, seamless loop, parallax depth.
 *
 * Layers (back → front):
 *  1. Atmospheric gradient + slow drifting fog
 *  2. Distant city silhouette (Constantinople domes & minarets)
 *  3. Mid hills with cannons & periodic muzzle-flash + smoke puffs
 *  4. Floating Ottoman motifs (crescent, star, sword) at varying depths
 *  5. Dust particles + soft god-ray shimmer + dark vignette overlay
 *
 * Honors prefers-reduced-motion (renders a single static frame).
 */
const CinematicBackground = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0, h = 0, dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Particles (dust)
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      sp: Math.random() * 0.00015 + 0.00005,
      a: Math.random() * 0.4 + 0.1,
    }));

    // Floating motifs
    type Motif = { x: number; y: number; sp: number; size: number; rot: number; rotSp: number; type: "crescent" | "star" | "sword" | "dome" };
    const motifs: Motif[] = Array.from({ length: 14 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.7,
      sp: Math.random() * 0.00008 + 0.00002,
      size: Math.random() * 18 + 10,
      rot: Math.random() * Math.PI * 2,
      rotSp: (Math.random() - 0.5) * 0.0003,
      type: (["crescent", "star", "sword", "dome"] as const)[Math.floor(Math.random() * 4)],
    }));

    // Cannons (5 of them on ridge)
    const cannons = [0.12, 0.28, 0.46, 0.66, 0.84].map((x, i) => ({
      x,
      lastFire: -Math.random() * 8000 - i * 2000,
      cooldown: 7000 + Math.random() * 5000,
    }));

    // Smoke puffs
    type Puff = { x: number; y: number; r: number; life: number; max: number };
    const puffs: Puff[] = [];

    // Drawing helpers
    const drawCity = (offX: number) => {
      ctx.save();
      ctx.translate(-offX * 30, 0);
      const baseY = h * 0.72;
      // Distant hill silhouette
      ctx.fillStyle = "rgba(20,12,18,0.85)";
      ctx.beginPath();
      ctx.moveTo(-50, baseY);
      for (let x = -50; x <= w + 50; x += 20) {
        const y = baseY - Math.sin(x * 0.008) * 14 - Math.sin(x * 0.02) * 6;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w + 50, h);
      ctx.lineTo(-50, h);
      ctx.closePath();
      ctx.fill();

      // Domes & minarets
      const domes = [0.1, 0.22, 0.34, 0.5, 0.62, 0.78, 0.9];
      domes.forEach((dx, i) => {
        const cx = dx * w;
        const cy = baseY - 8;
        const r = 10 + (i % 3) * 4;
        // dome
        ctx.fillStyle = "rgba(30,18,22,0.95)";
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0);
        ctx.fill();
        // crescent on top
        ctx.fillStyle = "rgba(212,175,55,0.35)";
        ctx.fillRect(cx - 0.5, cy - r - 6, 1, 4);
        ctx.beginPath();
        ctx.arc(cx, cy - r - 8, 1.6, 0, Math.PI * 2);
        ctx.fill();
        // minaret
        if (i % 2 === 0) {
          ctx.fillStyle = "rgba(25,15,18,0.95)";
          ctx.fillRect(cx + r + 2, cy - 28, 3, 28);
          ctx.beginPath();
          ctx.moveTo(cx + r + 0.5, cy - 28);
          ctx.lineTo(cx + r + 3.5, cy - 34);
          ctx.lineTo(cx + r + 6.5, cy - 28);
          ctx.fill();
        }
      });
      ctx.restore();
    };

    const drawCannon = (cx: number, cy: number, flash: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      // Wheel base
      ctx.fillStyle = "rgba(40,25,15,0.95)";
      ctx.beginPath();
      ctx.arc(-6, 4, 5, 0, Math.PI * 2);
      ctx.arc(6, 4, 5, 0, Math.PI * 2);
      ctx.fill();
      // Carriage
      ctx.fillStyle = "rgba(60,38,20,0.95)";
      ctx.fillRect(-10, -2, 20, 6);
      // Barrel — angled up & right
      ctx.fillStyle = "rgba(80,55,30,0.95)";
      ctx.save();
      ctx.rotate(-0.25);
      ctx.fillRect(-2, -10, 22, 5);
      ctx.fillStyle = "rgba(15,8,4,1)";
      ctx.beginPath();
      ctx.arc(20, -7.5, 2.4, 0, Math.PI * 2);
      ctx.fill();
      // Muzzle flash
      if (flash > 0) {
        const a = flash;
        const grad = ctx.createRadialGradient(22, -7.5, 0, 22, -7.5, 30 * a);
        grad.addColorStop(0, `rgba(255,220,140,${0.95 * a})`);
        grad.addColorStop(0.4, `rgba(255,140,40,${0.6 * a})`);
        grad.addColorStop(1, "rgba(255,80,20,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(22, -7.5, 30 * a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
      ctx.restore();
    };

    const drawMotif = (m: Motif) => {
      const px = m.x * w;
      const py = m.y * h;
      const depth = (m.y + 0.3); // closer to top = farther
      const alpha = 0.08 + depth * 0.07;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(m.rot);
      ctx.strokeStyle = `rgba(212,175,55,${alpha})`;
      ctx.fillStyle = `rgba(212,175,55,${alpha * 0.8})`;
      ctx.lineWidth = 1.2;
      const s = m.size;
      switch (m.type) {
        case "crescent":
          ctx.beginPath();
          ctx.arc(0, 0, s / 2, 0.3, Math.PI * 1.7);
          ctx.arc(s / 6, 0, s / 2.4, Math.PI * 1.7, 0.3, true);
          ctx.closePath();
          ctx.fill();
          break;
        case "star":
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const a = (i * 2 * Math.PI) / 5 - Math.PI / 2;
            const r = i % 2 === 0 ? s / 2 : s / 5;
            ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          }
          ctx.closePath();
          ctx.fill();
          break;
        case "sword":
          ctx.beginPath();
          ctx.moveTo(-s / 2, 0);
          ctx.lineTo(s / 3, -1.5);
          ctx.lineTo(s / 2, 0);
          ctx.lineTo(s / 3, 1.5);
          ctx.closePath();
          ctx.fill();
          ctx.fillRect(-s / 2 - 3, -3, 4, 6);
          break;
        case "dome":
          ctx.beginPath();
          ctx.arc(0, 0, s / 2, Math.PI, 0);
          ctx.lineTo(s / 2, 4);
          ctx.lineTo(-s / 2, 4);
          ctx.closePath();
          ctx.fill();
          break;
      }
      ctx.restore();
    };

    const render = (t: number) => {
      // 1. Background gradient (warm to dark)
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#1a0e0a");
      g.addColorStop(0.4, "#2a1810");
      g.addColorStop(0.75, "#1a0c08");
      g.addColorStop(1, "#0a0604");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // 2. Soft moving god-rays
      const rayShift = Math.sin(t * 0.0001) * 60;
      const rg = ctx.createRadialGradient(w * 0.3 + rayShift, -50, 50, w * 0.3 + rayShift, -50, h * 1.2);
      rg.addColorStop(0, "rgba(255,200,120,0.12)");
      rg.addColorStop(0.5, "rgba(255,160,80,0.04)");
      rg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);

      // 3. Distant fog band
      const fogY = h * 0.55;
      const fg = ctx.createLinearGradient(0, fogY - 80, 0, fogY + 60);
      fg.addColorStop(0, "rgba(120,90,70,0)");
      fg.addColorStop(0.5, "rgba(160,120,90,0.18)");
      fg.addColorStop(1, "rgba(40,25,18,0)");
      ctx.fillStyle = fg;
      ctx.fillRect(0, fogY - 80, w, 140);

      // 4. City (parallax)
      drawCity(Math.sin(t * 0.00005));

      // 5. Cannons + flashes
      const ridgeY = h * 0.78;
      cannons.forEach((c) => {
        if (!reduced && t - c.lastFire > c.cooldown) {
          c.lastFire = t;
          c.cooldown = 6000 + Math.random() * 6000;
          // emit smoke puff sequence
          for (let k = 0; k < 6; k++) {
            puffs.push({
              x: c.x * w + 18 + (Math.random() - 0.5) * 6,
              y: ridgeY - 7,
              r: 4 + Math.random() * 4,
              life: 0,
              max: 4500 + Math.random() * 2500,
            });
          }
        }
        const since = t - c.lastFire;
        const flash = Math.max(0, 1 - since / 220);
        drawCannon(c.x * w, ridgeY, flash);
      });

      // 6. Smoke puffs
      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];
        p.life += 16;
        const lt = p.life / p.max;
        if (lt >= 1) { puffs.splice(i, 1); continue; }
        const a = (1 - lt) * 0.35;
        const r = p.r + lt * 28;
        ctx.fillStyle = `rgba(180,160,140,${a})`;
        ctx.beginPath();
        ctx.arc(p.x + lt * 12, p.y - lt * 50, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Floating motifs (parallax)
      motifs.forEach((m) => {
        if (!reduced) {
          m.x += m.sp;
          m.rot += m.rotSp;
          if (m.x > 1.1) m.x = -0.1;
        }
        drawMotif(m);
      });

      // 8. Dust particles
      particles.forEach((p) => {
        if (!reduced) {
          p.x += p.sp;
          p.y += Math.sin((t + p.x * 1000) * 0.001) * 0.0002;
          if (p.x > 1.05) p.x = -0.05;
        }
        ctx.fillStyle = `rgba(220,190,140,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // 9. Vignette + dark overlay for text contrast
      const vg = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.85);
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "rgba(10,6,4,0.55)";
      ctx.fillRect(0, 0, w, h);

      if (!reduced) raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <canvas ref={ref} className="w-full h-full" aria-hidden="true" />
    </div>
  );
};

export default CinematicBackground;
