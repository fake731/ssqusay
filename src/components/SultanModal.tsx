import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Calendar, Sword, MapPin, Flag, Shield } from "lucide-react";
import { Sultan } from "@/data/ottomanData";
import sultanImage from "@/assets/sultan-silhouette.jpg";

interface SultanModalProps {
  sultan: Sultan | null;
  isOpen: boolean;
  onClose: () => void;
}

const SultanModal = ({ sultan, isOpen, onClose }: SultanModalProps) => {
  if (!sultan) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 z-50 overflow-auto"
          >
            <div className="min-h-full bg-card border border-primary/20 rounded-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 z-10 p-2 bg-card/80 backdrop-blur rounded-full hover:bg-primary/20 transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="relative lg:w-2/5 h-64 lg:h-auto lg:min-h-[600px]">
                  <img
                    src={sultanImage}
                    alt={sultan.nameAr}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-card via-card/60 to-transparent lg:bg-gradient-to-r" />
                  
                  {/* Sultan Number */}
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <span className="text-primary-foreground font-bold text-2xl">{sultan.id}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-6 md:p-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-5 h-5 text-primary" />
                    <span className="text-primary">{sultan.title}</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-4">
                    {sultan.nameAr}
                  </h2>

                  <div className="flex items-center gap-4 text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{sultan.reign}</span>
                    </div>
                    <span className="text-primary">({sultan.reignYears})</span>
                  </div>

                  <p className="text-lg text-foreground leading-relaxed mb-8">
                    {sultan.description}
                  </p>

                  {/* Conquests */}
                  <div className="mb-6">
                    <h3 className="text-xl font-amiri text-primary mb-3 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      أهم الفتوحات
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sultan.majorConquests.map((conquest) => (
                        <span
                          key={conquest}
                          className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-full text-foreground text-sm"
                        >
                          {conquest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Battles */}
                  <div className="mb-6">
                    <h3 className="text-xl font-amiri text-primary mb-3 flex items-center gap-2">
                      <Sword className="w-5 h-5" />
                      أهم المعارك
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sultan.majorBattles.map((battle) => (
                        <span
                          key={battle}
                          className="px-4 py-2 bg-secondary/10 border border-secondary/30 rounded-full text-foreground text-sm"
                        >
                          {battle}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Military Decisions */}
                  <div>
                    <h3 className="text-xl font-amiri text-primary mb-3 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      القرارات العسكرية المؤثرة
                    </h3>
                    <ul className="space-y-2">
                      {sultan.militaryDecisions.map((decision, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{decision}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SultanModal;
