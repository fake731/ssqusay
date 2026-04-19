import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Event {
  year: number;
  title: string;
  desc: string;
  color: string;
  major?: boolean;
}

const events: Event[] = [
  { year: 1299, title: "تأسيس الدولة", desc: "أعلن عثمان الأول استقلاله في سُكوت وأسّس الدولة العثمانية.", color: "#22c55e", major: true },
  { year: 1326, title: "فتح بورصة", desc: "أصبحت أول عاصمة للدولة في عهد أورخان غازي.", color: "#84cc16" },
  { year: 1389, title: "معركة كوسوفو", desc: "انتصار حاسم وضع الأناضول والبلقان تحت السيطرة العثمانية.", color: "#eab308" },
  { year: 1453, title: "فتح القسطنطينية", desc: "محمد الفاتح ينهي الإمبراطورية البيزنطية ويفتح أعظم مدن العصور الوسطى.", color: "#f59e0b", major: true },
  { year: 1517, title: "ضمّ الحجاز ومصر", desc: "سليم الأول يدخل القاهرة ويصبح خادم الحرمين الشريفين.", color: "#f97316" },
  { year: 1529, title: "حصار فيينا الأول", desc: "سليمان القانوني يصل أبواب أوروبا الوسطى — ذروة التوسع.", color: "#ef4444", major: true },
  { year: 1571, title: "معركة ليبانتو", desc: "أول كسر بحري كبير — نهاية الهيمنة البحرية المطلقة.", color: "#dc2626" },
  { year: 1683, title: "حصار فيينا الثاني", desc: "نقطة التحوّل الكبرى نحو التراجع التدريجي.", color: "#b91c1c", major: true },
  { year: 1774, title: "معاهدة كوتشوك كاينارجي", desc: "خسائر كبيرة أمام روسيا وبداية المسألة الشرقية.", color: "#991b1b" },
  { year: 1839, title: "التنظيمات", desc: "إصلاحات جذرية لمحاولة اللحاق بأوروبا.", color: "#7f1d1d" },
  { year: 1914, title: "دخول الحرب العالمية الأولى", desc: "تحالف مع ألمانيا — مقامرة كلّفت الإمبراطورية وجودها.", color: "#581c87" },
  { year: 1922, title: "إلغاء السلطنة", desc: "نهاية 623 سنة من الحكم العثماني.", color: "#1e3a8a", major: true },
];

const startYear = 1299;
const endYear = 1922;
const totalYears = endYear - startYear;

function EventNode({ event, position, onClick, isActive }: { event: Event; position: [number, number, number]; onClick: () => void; isActive: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.5;
      const s = isActive ? 1.4 : 1;
      ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    }
  });
  const size = event.major ? 0.4 : 0.25;
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={position} onClick={onClick} onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }} onPointerOut={() => { document.body.style.cursor = "none"; }}>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial color={event.color} emissive={event.color} emissiveIntensity={isActive ? 1.2 : 0.5} metalness={0.6} roughness={0.2} />
      </mesh>
      {event.major && (
        <mesh position={position}>
          <ringGeometry args={[size * 1.6, size * 1.8, 32]} />
          <meshBasicMaterial color={event.color} transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      )}
      <Html position={[position[0], position[1] - 0.7, position[2]]} center distanceFactor={10}>
        <div className="text-[10px] font-amiri text-amber-200 whitespace-nowrap pointer-events-none select-none drop-shadow-[0_0_4px_rgba(0,0,0,0.9)]">
          {event.year}
        </div>
      </Html>
    </Float>
  );
}

function TimelineLine() {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 100; i++) {
    const t = i / 100;
    const x = (t - 0.5) * 18;
    const y = Math.sin(t * Math.PI * 2) * 0.3;
    const z = Math.cos(t * Math.PI * 1.5) * 0.5;
    points.push(new THREE.Vector3(x, y, z));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const tubeGeo = new THREE.TubeGeometry(curve, 200, 0.04, 8, false);
  return (
    <mesh geometry={tubeGeo}>
      <meshStandardMaterial color="#d4af37" emissive="#d4af37" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

function getEventPosition(year: number): [number, number, number] {
  const t = (year - startYear) / totalYears;
  const x = (t - 0.5) * 18;
  const y = Math.sin(t * Math.PI * 2) * 0.3 + 0.5;
  const z = Math.cos(t * Math.PI * 1.5) * 0.5;
  return [x, y, z];
}

const Timeline3D = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? events[activeIndex] : null;

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-b from-background via-background/95 to-background">
      <Canvas camera={{ position: [0, 3, 10], fov: 55 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.2} color="#fbbf24" />
          <pointLight position={[-10, -5, -5]} intensity={0.6} color="#dc2626" />
          <Stars radius={50} depth={30} count={1500} factor={2} fade speed={0.5} />
          <TimelineLine />
          {events.map((ev, i) => (
            <EventNode
              key={ev.year}
              event={ev}
              position={getEventPosition(ev.year)}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(i)}
            />
          ))}
          <OrbitControls enablePan={false} minDistance={6} maxDistance={18} autoRotate autoRotateSpeed={0.3} />
        </Suspense>
      </Canvas>

      {/* Top instruction */}
      <div className="absolute top-4 right-4 left-4 flex justify-between items-start pointer-events-none">
        <div className="bg-background/70 backdrop-blur-md border border-primary/20 rounded-xl px-4 py-2">
          <p className="font-amiri text-xs text-primary">623 سنة من التاريخ العثماني</p>
          <p className="font-iphone text-[10px] text-muted-foreground">{startYear} — {endYear}</p>
        </div>
        <div className="bg-background/70 backdrop-blur-md border border-primary/20 rounded-xl px-4 py-2 max-w-[180px] text-right">
          <p className="font-iphone text-[10px] text-muted-foreground">اسحب للدوران • اضغط على نقطة</p>
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-4 right-4 left-4 md:left-auto md:max-w-md bg-background/85 backdrop-blur-xl border border-primary/30 rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <p className="font-amiri text-3xl font-bold" style={{ color: active.color }}>{active.year}</p>
                <h3 className="font-amiri text-lg text-primary">{active.title}</h3>
              </div>
              <button onClick={() => setActiveIndex(null)} className="w-8 h-8 rounded-lg bg-muted/30 hover:bg-muted/50 flex items-center justify-center text-muted-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="font-iphone text-sm text-foreground/85 leading-relaxed">{active.desc}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline3D;
