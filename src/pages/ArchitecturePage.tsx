import { useState } from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import ArchitectureCard from "@/components/ArchitectureCard";
import ArchitectureModal from "@/components/ArchitectureModal";
import { architectures, Architecture } from "@/data/ottomanData";

const ArchitecturePage = () => {
  const [selectedArchitecture, setSelectedArchitecture] = useState<Architecture | null>(null);

  const handleSultanClick = (sultanId: number) => {
    console.log("Sultan clicked:", sultanId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar title="المعمار العثماني" />

      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-muted-foreground max-w-2xl mx-auto">
              اكتشف روائع العمارة العثمانية من المساجد العظيمة إلى القصور الفخمة - تحف معمارية خالدة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {architectures.map((architecture, index) => (
              <ArchitectureCard
                key={architecture.id}
                architecture={architecture}
                index={index}
                onClick={() => setSelectedArchitecture(architecture)}
              />
            ))}
          </div>
        </div>
      </section>

      <ArchitectureModal
        architecture={selectedArchitecture}
        isOpen={!!selectedArchitecture}
        onClose={() => setSelectedArchitecture(null)}
        onSultanClick={handleSultanClick}
      />

      <SectionNavigation currentPath="/المعمار" />
      <Footer />
    </div>
  );
};

export default ArchitecturePage;
