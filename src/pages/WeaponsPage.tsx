import { useState } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import WeaponCard from "@/components/WeaponCard";
import WeaponModal from "@/components/WeaponModal";
import { weapons, Weapon } from "@/data/ottomanData";

const WeaponsPage = () => {
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  const handleBattleClick = (battleId: number) => {
    console.log("Battle clicked:", battleId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar title="الأسلحة والجيش" />

      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اكتشف تطور الأسلحة العثمانية من السيوف إلى المدافع العملاقة
            </p>
          </motion.div>

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

      <WeaponModal
        weapon={selectedWeapon}
        isOpen={!!selectedWeapon}
        onClose={() => setSelectedWeapon(null)}
        onBattleClick={handleBattleClick}
      />

      <SectionNavigation currentPath="/weapons" />
      <Footer />
    </div>
  );
};

export default WeaponsPage;
