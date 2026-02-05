import { useState } from "react";
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

  const handleSultanClick = (sultanId: number) => {
    // Could navigate to sultans page or show modal
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
            <p className="text-muted-foreground max-w-2xl mx-auto">
              شاهد أعظم المعارك التي غيرت مجرى التاريخ، بالتفاصيل العسكرية والسرد الحماسي
            </p>
          </motion.div>

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
