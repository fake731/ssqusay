import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Swords, Trophy, ChevronDown, ArrowLeftRight } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import { sultans, battles, Sultan } from "@/data/ottomanData";
import { getSultanImage } from "@/utils/sultanImages";

const SultanColumn = ({ sultan, color }: { sultan: Sultan | null; color: string }) => {
  if (!sultan) {
    return (
      <div className="flex-1 min-h-[400px] flex items-center justify-center border-2 border-dashed border-border rounded-3xl bg-card/40">
        <p className="text-muted-foreground font-iphone">اختر سلطاناً للمقارنة</p>
      </div>
    );
  }
  const img = getSultanImage(sultan.id);
  const sultanBattles = battles.filter(b => b.sultanId === sultan.id);
  const wins = sultanBattles.filter(b => b.result === "victory").length;

  return (
    <motion.div
      key={sultan.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 bg-card/60 backdrop-blur-md border border-border rounded-3xl overflow-hidden"
    >
      <div className={`relative h-80 bg-gradient-to-b ${color}`}>
        {img && (
          <img src={img} alt={sultan.nameAr} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-6 text-center">
          <Crown className="w-7 h-7 text-primary mx-auto mb-2" />
          <h3 className="text-2xl font-amiri text-gradient-gold">{sultan.nameAr}</h3>
          <p className="text-sm text-muted-foreground font-iphone mt-1">{sultan.title}</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <Stat label="فترة الحكم" value={sultan.reign} />
        <Stat label="مدة الحكم" value={sultan.reignYears} />
        <Stat label="عدد الفتوحات" value={`${sultan.majorConquests.length}`} />
        <Stat label="عدد المعارك المسجلة" value={`${sultanBattles.length}`} />
        <Stat label="انتصارات" value={`${wins}`} />
        <Stat label="عدد الإنجازات" value={`${sultan.achievements.length}`} />

        <Section title="أبرز الفتوحات" items={sultan.majorConquests.slice(0, 6)} />
        <Section title="أبرز المعارك" items={sultan.majorBattles.slice(0, 6)} />
        <Section title="أهم الإنجازات" items={sultan.achievements.slice(0, 6)} />
      </div>
    </motion.div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
    <span className="text-xs text-muted-foreground font-iphone">{label}</span>
    <span className="text-sm font-amiri text-primary">{value}</span>
  </div>
);

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="text-sm font-amiri text-gradient-gold mb-2 flex items-center gap-2">
      <Trophy className="w-4 h-4" /> {title}
    </h4>
    <ul className="space-y-1.5">
      {items.map((it, i) => (
        <li key={i} className="text-xs text-muted-foreground font-iphone flex items-start gap-2 leading-relaxed">
          <span className="text-primary mt-1">•</span> {it}
        </li>
      ))}
    </ul>
  </div>
);

const CompareSultansPage = () => {
  const [aId, setAId] = useState<string>("1");
  const [bId, setBId] = useState<string>("10");

  const a = sultans.find(s => s.id === Number(aId)) || null;
  const b = sultans.find(s => s.id === Number(bId)) || null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar title="مقارنة السلاطين" />

      <section className="py-12 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="text-muted-foreground max-w-2xl mx-auto font-iphone">
              اختر سلطانين وقارن بينهما في المدة، الفتوحات، المعارك، والإنجازات
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-3xl mx-auto">
            <Select value={aId} onValueChange={setAId}>
              <SelectTrigger className="bg-card/60 backdrop-blur-md h-14 rounded-2xl">
                <SelectValue placeholder="السلطان الأول" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {sultans.map(s => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    {s.nameAr} — {s.reign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={bId} onValueChange={setBId}>
              <SelectTrigger className="bg-card/60 backdrop-blur-md h-14 rounded-2xl">
                <SelectValue placeholder="السلطان الثاني" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                {sultans.map(s => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    {s.nameAr} — {s.reign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-primary" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <SultanColumn sultan={a} color="from-primary/20 to-transparent" />
            <SultanColumn sultan={b} color="from-accent/20 to-transparent" />
          </div>
        </div>
      </section>

      <SectionNavigation currentPath="/مقارنة-السلاطين" />
      <Footer />
    </div>
  );
};

export default CompareSultansPage;
