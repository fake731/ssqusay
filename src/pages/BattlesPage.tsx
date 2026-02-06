import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Sword } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import BattleCard from "@/components/BattleCard";
import BattleModal from "@/components/BattleModal";
import { battles, Battle, sultans } from "@/data/ottomanData";

const BattlesPage = () => {
  const [selectedBattle, setSelectedBattle] = useState<Battle | null>(null);

  // ترتيب المعارك تصاعدياً حسب السنة (من 1299 إلى 1922)
  const sortedBattles = useMemo(() => {
    return [...battles].sort((a, b) => a.year - b.year);
  }, []);

  const handleSultanClick = (sultanId: number) => {
    console.log("Sultan clicked:", sultanId);
  };

  return (
    <div className="min-h-screen bg-background">
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

      <BattleModal
        battle={selectedBattle}
        isOpen={!!selectedBattle}
        onClose={() => setSelectedBattle(null)}
        onSultanClick={handleSultanClick}
      />

      <SectionNavigation currentPath="/battles" />
      <Footer />
    </div>
  );
};

export default BattlesPage;
