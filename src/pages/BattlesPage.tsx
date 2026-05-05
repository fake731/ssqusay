import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sword, Film } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import BattleCard from "@/components/BattleCard";
import BattleModal from "@/components/BattleModal";
import CinematicBattleMode from "@/components/CinematicBattleMode";
import { battles, Battle, sultans } from "@/data/ottomanData";

const BattlesPage = () => {
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);
  const [cinematicBattle, setCinematicBattle] = useState<Battle | null>(null);

  // ترتيب المعارك تصاعدياً حسب السنة (من 1299 إلى 1922)
  const sortedBattles = useMemo(() => {
    return [...battles].sort((a, b) => a.year - b.year);
  }, []);

  const handleSultanClick = (sultanId: number) => {
    console.log("Sultan clicked:", sultanId);
  };

  return (
    <div className="min-h-screen relative">
      <Navbar title="المعارك الملحمية" />

      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              شاهد أعظم المعارك التي غيرت مجرى التاريخ، بالتفاصيل العسكرية والسرد الحماسي
            </p>
            <p className="text-lg text-primary font-amiri">
              {sortedBattles.length} معركة من عام {sortedBattles[0]?.year} إلى {sortedBattles[sortedBattles.length - 1]?.year}
            </p>
          </motion.div>

          <div className="space-y-8">
            {sortedBattles.map((battle, index) => (
              <div key={battle.id} className="relative">
                <BattleCard
                  battle={battle}
                  index={index}
                  onClick={() => setSelectedBattle(battle)}
                />
                <button
                  onClick={(e) => { e.stopPropagation(); setCinematicBattle(battle); }}
                  className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full glass-section text-foreground/90 text-xs font-iphone hover:border-primary/40 transition-all"
                >
                  <Film className="w-3.5 h-3.5" /> سرد سينمائي
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BattleModal
        battle={selectedBattle}
        isOpen={!!selectedBattle}
        onClose={() => setSelectedBattle(null)}
        onSultanClick={handleSultanClick}
      />

      <CinematicBattleMode
        battle={cinematicBattle}
        isOpen={!!cinematicBattle}
        onClose={() => setCinematicBattle(null)}
      />

      <SectionNavigation currentPath="/المعارك" />
      <Footer />
    </div>
  );
};

export default BattlesPage;
