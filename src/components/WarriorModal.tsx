import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Calendar, Swords, Users, Crown, MapPin } from "lucide-react";
import { Warrior } from "@/data/ottomanData";
import { getWarriorImage } from "@/utils/warriorImages";
import HistoricalProse from "./HistoricalProse";

interface WarriorModalProps {
  warrior: Warrior | null;
  isOpen: boolean;
  onClose: () => void;
}

const WarriorModal = ({ warrior, isOpen, onClose }: WarriorModalProps) => {
  if (!warrior) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass-section rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-10 p-2 bg-card/90 rounded-full hover:bg-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="relative lg:w-2/5 h-96 lg:h-auto">
                <img
                  src={getWarriorImage(warrior.image)}
                  alt={warrior.nameAr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:bg-gradient-to-r" />
                
                {/* Type Badge */}
                <div className="absolute bottom-6 right-6 px-4 py-2 bg-primary rounded-lg">
                  <span className="text-primary-foreground font-bold text-lg">{warrior.typeAr}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-8">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                  <span className="text-primary">محاربو الإمبراطورية العثمانية</span>
                </div>

                <h2 className="text-4xl font-amiri font-bold text-gradient-gold mb-2">
                  {warrior.nameAr}
                </h2>
                <p className="text-xl text-muted-foreground mb-6">{warrior.name}</p>

                {/* Period */}
                <div className="flex items-center gap-2 mb-6 text-lg">
                  <Calendar className="w-5 h-5 text-secondary" />
                  <span className="text-secondary font-semibold">{warrior.period}</span>
                </div>

                {/* Role */}
                <div className="mb-6 p-4 glass-section rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Swords className="w-5 h-5 text-primary" />
                    <span className="text-primary font-semibold">الدور القتالي</span>
                  </div>
                  <p className="text-foreground">{warrior.role}</p>
                </div>

                {/* Equipment */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    التجهيزات والأسلحة
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {warrior.equipment.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 glass-section text-foreground rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Battles */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    المعارك الرئيسية
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {warrior.battles.map((battle) => (
                      <span
                        key={battle}
                        className="px-3 py-1 glass-section text-foreground rounded-full"
                      >
                        {battle}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sultans Served */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-primary" />
                    السلاطين الذين خدموا تحتهم
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {warrior.sultansServed.map((sultan) => (
                      <span
                        key={sultan}
                        className="px-3 py-1 glass-section text-foreground rounded-full"
                      >
                        {sultan}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Full Description */}
                <div className="border-t border-border pt-6">
                  <h4 className="text-xl font-bold text-foreground mb-4">القصة الكاملة</h4>
                  <HistoricalProse text={warrior.fullDescription} className="text-muted-foreground leading-relaxed text-lg" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WarriorModal;
