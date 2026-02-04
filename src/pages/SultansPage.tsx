import { useState } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SultanCard from "@/components/SultanCard";
import SultanModal from "@/components/SultanModal";
import { sultans, Sultan } from "@/data/ottomanData";

const SultansPage = () => {
  const [selectedSultan, setSelectedSultan] = useState<Sultan | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar title="السلاطين العظماء" />

      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تعرف على السلاطين الذين صنعوا التاريخ وأسسوا إمبراطورية امتدت لستة قرون
            </p>
          </motion.div>

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

      <SultanModal
        sultan={selectedSultan}
        isOpen={!!selectedSultan}
        onClose={() => setSelectedSultan(null)}
      />

      <Footer />
    </div>
  );
};

export default SultansPage;
