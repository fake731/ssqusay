import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import WarriorCard from "@/components/WarriorCard";
import WarriorModal from "@/components/WarriorModal";
import { warriors, Warrior } from "@/data/ottomanData";

const WarriorsPage = () => {
  const [selectedWarrior, setSelectedWarrior] = useState<Warrior | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar title="المحاربون العثمانيون" />

      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تعرف على فئات المحاربين الذين صنعوا مجد الإمبراطورية - من الإنكشارية إلى السيباهي
            </p>
          </motion.div>

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

      <WarriorModal
        warrior={selectedWarrior}
        isOpen={!!selectedWarrior}
        onClose={() => setSelectedWarrior(null)}
      />

      <SectionNavigation currentPath="/الجنود" />
      <Footer />
    </div>
  );
};

export default WarriorsPage;
