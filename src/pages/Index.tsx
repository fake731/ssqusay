import { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Sword, Shield, Map, ChevronUp, Users } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SultanCard from "@/components/SultanCard";
import SultanModal from "@/components/SultanModal";
import BattleCard from "@/components/BattleCard";
import BattleModal from "@/components/BattleModal";
import WeaponCard from "@/components/WeaponCard";
import WarriorCard from "@/components/WarriorCard";
import WarriorModal from "@/components/WarriorModal";
import Timeline from "@/components/Timeline";
import { sultans, battles, weapons, warriors, Sultan, Battle, Warrior } from "@/data/ottomanData";

const Index = () => {
  const [selectedSultan, setSelectedSultan] = useState<Sultan | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [selectedWarrior, setSelectedWarrior] = useState<Warrior | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowScrollTop(window.scrollY > 500);
    });
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div id="content">
        {/* Sultans Section */}
        <section id="sultans" className="py-20 bg-gradient-epic">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 border border-primary/50 rounded-full text-primary text-sm mb-4">
                القسم الأول
              </span>
              <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-4 flex items-center justify-center gap-3">
                <Crown className="w-10 h-10 text-primary" />
                السلاطين العظماء
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                تعرف على السلاطين الذين صنعوا التاريخ وأسسوا إمبراطورية امتدت لستة قرون
              </p>
            </motion.div>

            {/* Sultans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sultans.map((sultan, index) => (
                <SultanCard
                  key={sultan.id}
                  sultan={sultan}
                  index={index}
                  onClick={() => setSelectedSultan(sultan)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Battles Section */}
        <section id="battles" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 border border-secondary/50 rounded-full text-secondary text-sm mb-4">
                القسم الثاني
              </span>
              <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-4 flex items-center justify-center gap-3">
                <Sword className="w-10 h-10 text-primary" />
                المعارك الملحمية
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                شاهد أعظم المعارك التي غيرت مجرى التاريخ، بالتفاصيل العسكرية والسرد الحماسي
              </p>
            </motion.div>

            {/* Battles List */}
            <div className="space-y-8">
              {battles.map((battle, index) => (
                <BattleCard
                  key={battle.id}
                  battle={battle}
                  index={index}
                  onClick={() => setSelectedBattle(battle)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Weapons Section */}
        <section id="weapons" className="py-20 bg-gradient-epic">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 border border-primary/50 rounded-full text-primary text-sm mb-4">
                القسم الثالث
              </span>
              <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-4 flex items-center justify-center gap-3">
                <Shield className="w-10 h-10 text-primary" />
                الأسلحة والجيش
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                اكتشف تطور الأسلحة العثمانية من السيوف إلى المدافع العملاقة
              </p>
            </motion.div>

            {/* Weapons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weapons.map((weapon, index) => (
                <WeaponCard key={weapon.id} weapon={weapon} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Warriors Section */}
        <section id="warriors" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1 border border-secondary/50 rounded-full text-secondary text-sm mb-4">
                القسم الرابع
              </span>
              <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-4 flex items-center justify-center gap-3">
                <Users className="w-10 h-10 text-primary" />
                المحاربون العثمانيون
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                تعرف على فئات المحاربين الذين صنعوا مجد الإمبراطورية - من الإنكشارية إلى السيباهي
              </p>
            </motion.div>

            {/* Warriors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {warriors.map((warrior, index) => (
                <WarriorCard
                  key={warrior.id}
                  warrior={warrior}
                  index={index}
                  onClick={() => setSelectedWarrior(warrior)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <Timeline />

        {/* Footer */}
        <footer className="py-12 bg-card border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl font-amiri text-gradient-gold mb-4">
              الدولة العثمانية
            </h3>
            <p className="text-muted-foreground mb-6">
              رحلة تفاعلية عبر 600 عام من التاريخ
            </p>
            <p className="text-sm text-muted-foreground">
              تجربة تعليمية مرئية • شاهد التاريخ لا تقرأه
            </p>
          </div>
        </footer>
      </div>

      {/* Modals */}
      <SultanModal
        sultan={selectedSultan}
        isOpen={!!selectedSultan}
        onClose={() => setSelectedSultan(null)}
      />
      <BattleModal
        battle={selectedBattle}
        isOpen={!!selectedBattle}
        onClose={() => setSelectedBattle(null)}
      />
      <WarriorModal
        warrior={selectedWarrior}
        isOpen={!!selectedWarrior}
        onClose={() => setSelectedWarrior(null)}
      />

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
        onClick={scrollToTop}
        className="fixed bottom-8 left-8 p-4 bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-colors z-40"
      >
        <ChevronUp className="w-6 h-6 text-primary-foreground" />
      </motion.button>
    </div>
  );
};

export default Index;
