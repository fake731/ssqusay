import { useState, useRef, MouseEvent, WheelEvent } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ottomanMaps } from "@/data/maps";
import { getMapImage } from "@/utils/mapImages";

interface InteractiveMapsGalleryProps {
  isOpen: boolean;
  onClose: () => void;
}

const InteractiveMapsGallery = ({ isOpen, onClose }: InteractiveMapsGalleryProps) => {
  const [activeId, setActiveId] = useState<number>(ottomanMaps[0].id);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0 });

  const active = ottomanMaps.find(m => m.id === activeId) || ottomanMaps[0];
  const idx = ottomanMaps.findIndex(m => m.id === activeId);

  const reset = () => { setScale(1); setPos({ x: 0, y: 0 }); };

  const onMouseDown = (e: MouseEvent) => {
    dragging.current = true;
    start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };
  const onMouseUp = () => { dragging.current = false; };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    setScale(s => Math.min(4, Math.max(0.5, s + (e.deltaY > 0 ? -0.15 : 0.15))));
  };

  const goPrev = () => { const p = ottomanMaps[idx - 1]; if (p) { setActiveId(p.id); reset(); } };
  const goNext = () => { const n = ottomanMaps[idx + 1]; if (n) { setActiveId(n.id); reset(); } };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[92vh] p-0 overflow-hidden bg-card border-primary/30">
        <DialogTitle className="sr-only">معرض الخرائط التفاعلي</DialogTitle>
        <div className="flex flex-col h-full">
          {/* Top bar */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur z-10">
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-iphone">{active.period}</p>
              <h3 className="text-xl font-amiri text-gradient-gold">{active.year} — {active.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setScale(s => Math.min(4, s + 0.25))} className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/70 flex items-center justify-center">
                <ZoomIn className="w-4 h-4" />
              </button>
              <button onClick={() => setScale(s => Math.max(0.5, s - 0.25))} className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/70 flex items-center justify-center">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button onClick={reset} className="w-9 h-9 rounded-lg bg-muted hover:bg-muted/70 flex items-center justify-center">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Map viewport */}
          <div
            className="flex-1 relative overflow-hidden bg-black/40 cursor-grab active:cursor-grabbing"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onWheel={onWheel}
          >
            <motion.img
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={getMapImage(active.year)}
              alt={active.title}
              draggable={false}
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                transition: dragging.current ? "none" : "transform 0.2s",
              }}
              className="w-full h-full object-contain select-none"
            />

            {/* Side arrows */}
            <button
              onClick={goPrev}
              disabled={idx === 0}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur text-white hover:bg-black/80 disabled:opacity-20 flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <button
              onClick={goNext}
              disabled={idx === ottomanMaps.length - 1}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur text-white hover:bg-black/80 disabled:opacity-20 flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Tip */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-xs font-iphone">
              اسحب لتحريك الخريطة • استخدم العجلة للتكبير
            </div>
          </div>

          {/* Timeline thumbnails */}
          <div className="border-t border-border bg-card/80 backdrop-blur p-3 overflow-x-auto">
            <div className="flex gap-2 min-w-min">
              {ottomanMaps.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setActiveId(m.id); reset(); }}
                  className={`flex-shrink-0 w-20 rounded-xl overflow-hidden border-2 transition-all ${
                    m.id === activeId ? "border-primary scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={getMapImage(m.year)} alt={`${m.year}`} className="w-20 h-14 object-cover" />
                  <p className="text-[10px] text-center py-1 font-iphone bg-card">{m.year}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InteractiveMapsGallery;
