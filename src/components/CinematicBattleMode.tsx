import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play, Pause, Sword } from "lucide-react";
import { Battle } from "@/data/ottomanData";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface CinematicBattleModeProps {
  battle: Battle | null;
  isOpen: boolean;
  onClose: () => void;
}

// Cinematic slide images loaded via glob
const cinematicImages = import.meta.glob('../assets/battles/battle-*-*.jpg', { eager: true, as: 'url' });

const getCinematicImage = (battleKey: string, phase: string): string | null => {
  const entry = Object.entries(cinematicImages).find(([path]) =>
    path.includes(`battle-${battleKey}-${phase}`)
  );
  return entry ? entry[1] as string : null;
};

const getBattleKey = (name: string): string => {
  const map: Record<string, string> = {
    'constantinople': 'constantinople', 'istanbul': 'constantinople',
    'kosovo': 'kosovo', 'mohacs': 'mohacs', 'varna': 'varna',
    'nicopolis': 'nicopolis', 'preveza': 'preveza', 'gallipoli': 'gallipoli',
    'çanakkale': 'gallipoli', 'chaldiran': 'chaldiran',
    'marj-dabiq': 'marjdabiq', 'marjdabiq': 'marjdabiq',
    'vienna': 'vienna',
  };
  const slug = name.toLowerCase().replace(/\s+/g, '-')
    .replace('battle-of-', '').replace('fall-of-', '').replace('siege-of-', '');
  return map[slug] || Object.keys(map).find(k => slug.includes(k)) || slug;
};

const buildSlides = (b: Battle) => {
  const narrative = b.fullNarrative || b.narrative || "";
  const parts = narrative.split(/\n\n|\. /).filter(s => s.trim().length > 20);
  const key = getBattleKey(b.name);

  // Try cinematic images first, fallback to a placeholder
  const fallback = Object.values(cinematicImages)[0] as string || '';
  const openingImg = getCinematicImage(key, 'opening') || fallback;
  const prepImg = getCinematicImage(key, 'preparation') || fallback;
  const climaxImg = getCinematicImage(key, 'climax') || fallback;
  const resultImg = getCinematicImage(key, 'result') || fallback;

  return [
    {
      title: `${b.year} — ${b.location}`,
      subtitle: "البداية",
      text: parts[0] || `في عام ${b.year}، في ${b.location}، بدأت واحدة من أعظم المعارك العثمانية.\n\nواجهت قوات السلطان ${b.sultanName} أعداءها بقوة قوامها ${b.ottomanForces}.\n\nكانت الأجواء مشحونة بالترقب والتوتر، والجنود يستعدون لما سيكون نقطة تحول في تاريخ المنطقة بأسرها.`,
      image: openingImg,
    },
    {
      title: "الجيوش تتقابل",
      subtitle: "الاستعداد للمواجهة",
      text: parts[1] || `قوات عثمانية: ${b.ottomanForces}\nقوات العدو: ${b.enemyForces}\n\nالخصوم: ${b.opponents.join(' • ')}\n\nبدأ القادة العثمانيون بتوزيع الجنود على المواقع الاستراتيجية، وتجهيز المدافع والأسلحة الثقيلة. كانت الروح المعنوية عالية بين الجند، وصوت الطبول يملأ أرجاء المعسكر.`,
      image: prepImg,
    },
    {
      title: "الاستراتيجية",
      subtitle: "العقول قبل السيوف",
      text: b.militaryStrategy || parts[2] || "خطط القادة للمعركة بعناية فائقة، موزعين قواتهم على التضاريس بأفضل شكل ممكن.\n\nاستخدموا تكتيكات الكمين والمناورة التي اشتهر بها الجيش العثماني عبر القرون.",
      image: climaxImg,
    },
    {
      title: "ساعة الحسم",
      subtitle: "الذروة",
      text: parts[3] || parts[2] || `اشتعلت المعركة بكل ضراوة، صليل السيوف يملأ الأفق.\n\nالأسلحة المستخدمة: ${b.weaponsUsed.join('، ')}\n\nتحصد أرواح الفرسان من الجانبين في مشهد ملحمي لا يُنسى. الدخان يغطي ساحة المعركة والمدافع تهدر بلا توقف.`,
      image: climaxImg,
    },
    {
      title: b.result === "victory" ? "النصر العثماني" : b.result === "defeat" ? "الهزيمة" : "الحسم",
      subtitle: b.significance,
      text: `الخسائر: ${b.casualties || 'غير محددة'}\n\n${b.significance}\n\nالقائد: ${b.commander || b.sultanName}\n\nهذه المعركة شكّلت نقطة تحول جوهرية في مسار الدولة العثمانية وتاريخ المنطقة بأكملها.`,
      image: resultImg,
    },
  ];
};

const CinematicBattleMode = ({ battle, isOpen, onClose }: CinematicBattleModeProps) => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIndex(0);
      setPlaying(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !playing || !battle) return;
    timer.current = window.setTimeout(() => {
      setIndex((i) => Math.min(i + 1, 4));
    }, 7000);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, playing, isOpen, battle]);

  if (!battle) return null;
  const slides = buildSlides(battle);
  const slide = slides[index];

  const next = () => { setIndex((i) => Math.min(i + 1, 4)); setPlaying(false); };
  const prev = () => { setIndex((i) => Math.max(i - 1, 0)); setPlaying(false); };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 overflow-hidden bg-black/40 backdrop-blur-xl border border-primary/20 rounded-3xl">
        <DialogTitle className="sr-only">{battle.nameAr} - وضع السرد السينمائي</DialogTitle>
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex items-center justify-between z-10">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <Sword className="w-4 h-4 text-primary" />
              <span className="text-white text-sm font-iphone">{battle.nameAr}</span>
            </div>
            <button
              onClick={() => setPlaying(p => !p)}
              className="w-10 h-10 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80"
            >
              {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>

          {/* Progress dots */}
          <div className="absolute top-20 left-0 right-0 flex justify-center gap-2 z-10">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => { setIndex(i); setPlaying(false); }}
                className={`h-1 rounded-full cursor-pointer transition-all ${
                  i === index ? "w-12 bg-primary" : "w-6 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-6 left-4 right-4 md:left-8 md:right-8 z-10"
            >
              <div className="max-w-4xl mx-auto text-center text-white glass-section rounded-3xl p-6 md:p-10">
                <p className="text-xs md:text-sm text-primary font-iphone tracking-widest uppercase mb-2">
                  {slide.subtitle}
                </p>
                <h2 className="text-3xl md:text-5xl font-amiri text-gradient-gold mb-6">
                  {slide.title}
                </h2>
                <p className="text-base md:text-lg leading-relaxed font-iphone whitespace-pre-line max-h-48 overflow-y-auto">
                  {slide.text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={prev}
            disabled={index === 0}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 disabled:opacity-20 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            disabled={index === 4}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:bg-black/80 disabled:opacity-20 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CinematicBattleMode;
