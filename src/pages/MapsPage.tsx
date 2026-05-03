import { useState } from "react";
import { motion } from "framer-motion";
import { Map, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import MapCard from "@/components/MapCard";
import MapModal from "@/components/MapModal";
import InteractiveMapsGallery from "@/components/InteractiveMapsGallery";
import { ottomanMaps, OttomanMap } from "@/data/ottomanData";

const MapsPage = () => {
  const [selectedMap, setSelectedMap] = useState<OttomanMap | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const handleSultanClick = (sultanId: number) => {
    console.log("Sultan clicked:", sultanId);
  };

  return (
    <div className="min-h-screen relative">
      <Navbar title="خرائط الإمبراطورية" />

      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تتبع تطور حدود الدولة العثمانية عبر 623 عاماً - من إمارة صغيرة إلى إمبراطورية عظيمة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ottomanMaps.map((map, index) => (
              <MapCard
                key={map.id}
                map={map}
                index={index}
                onClick={() => setSelectedMap(map)}
              />
            ))}
          </div>
        </div>
      </section>

      <MapModal
        map={selectedMap}
        isOpen={!!selectedMap}
        onClose={() => setSelectedMap(null)}
        onSultanClick={handleSultanClick}
      />

      <InteractiveMapsGallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />

      <SectionNavigation currentPath="/الخرائط" />
      <Footer />
    </div>
  );
};

export default MapsPage;
