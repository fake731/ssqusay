import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Crown, Sword, Shield, ChevronUp, Users, Instagram } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import SultanCard from "@/components/SultanCard";
import SultanModal from "@/components/SultanModal";
import BattleCard from "@/components/BattleCard";
import BattleModal from "@/components/BattleModal";
import WeaponCard from "@/components/WeaponCard";
import WeaponModal from "@/components/WeaponModal";
import WarriorCard from "@/components/WarriorCard";
import WarriorModal from "@/components/WarriorModal";
import Timeline from "@/components/Timeline";
import { sultans, battles, weapons, warriors, Sultan, Battle, Warrior, Weapon } from "@/data/ottomanData";

const Index = () => {
  const [selectedSultan, setSelectedSultan] = useState<Sultan | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [selectedWarrior, setSelectedWarrior] = useState<Warrior | null>(null);
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const battlesRef = useRef<HTMLDivElement>(null);

  // Show scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle battle click from timeline or weapons
  const handleBattleClick = (battleId: number) => {
    const battle = battles.find(b => b.id === battleId);
    if (battle) {
      // Close other modals first
      setSelectedSultan(null);
      setSelectedWarrior(null);
      setSelectedWeapon(null);
      setSelectedBattle(battle);
    }
  };

  // Handle sultan click from battle modal or timeline
  const handleSultanClick = (sultanId: number) => {
    const sultan = sultans.find(s => s.id === sultanId);
    if (sultan) {
      // Close other modals first
      setSelectedBattle(null);
      setSelectedWarrior(null);
      setSelectedWeapon(null);
      setSelectedSultan(sultan);
    }
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
        <section id="battles" ref={battlesRef} className="py-20 bg-background">
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
                <WeaponCard 
                  key={weapon.id} 
                  weapon={weapon} 
                  index={index} 
                  onClick={() => setSelectedWeapon(weapon)}
                />
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
        <Timeline onBattleClick={handleBattleClick} onSultanClick={handleSultanClick} />

        {/* Footer */}
        <footer className="py-12 sm:py-16 bg-card border-t border-border">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl sm:text-2xl font-amiri text-gradient-gold mb-4">
              الدولة العثمانية
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              رحلة تفاعلية عبر 600 عام من التاريخ
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mb-8">
              تجربة تعليمية مرئية • شاهد التاريخ لا تقرأه
            </p>
            {/* Professional Instagram Link */}
            <a 
              href="https://www.instagram.com/1oscp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[hsl(280,80%,45%)] via-[hsl(330,80%,50%)] to-[hsl(30,90%,55%)] rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="text-right">
                <span className="block text-lg">تابعنا على انستغرام</span>
                <span className="block text-xs opacity-80">@1oscp</span>
              </div>
            </a>
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
        onSultanClick={handleSultanClick}
      />
      <WarriorModal
        warrior={selectedWarrior}
        isOpen={!!selectedWarrior}
        onClose={() => setSelectedWarrior(null)}
      />
      <WeaponModal
        weapon={selectedWeapon}
        isOpen={!!selectedWeapon}
        onClose={() => setSelectedWeapon(null)}
        onBattleClick={handleBattleClick}
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
