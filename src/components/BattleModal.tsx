import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Sword, Users, Crown, Trophy, Target, Zap } from "lucide-react";
import { Battle } from "@/data/ottomanData";
import battleImage from "@/assets/battle-scene.jpg";

interface BattleModalProps {
  battle: Battle | null;
  isOpen: boolean;
  onClose: () => void;
}

const BattleModal = ({ battle, isOpen, onClose }: BattleModalProps) => {
  if (!battle) return null;

  const resultColor = battle.result === "victory" 
    ? "text-green-500" 
    : battle.result === "defeat" 
    ? "text-red-500" 
    : "text-yellow-500";

  const resultText = battle.result === "victory" 
    ? "نصر عظيم" 
    : battle.result === "defeat" 
    ? "هزيمة" 
    : "تعادل";

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
            <div className="min-h-full bg-card border border-primary/20 rounded-2xl overflow-hidden battle-glow">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 z-10 p-2 bg-card/80 backdrop-blur rounded-full hover:bg-primary/20 transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              {/* Hero Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={battleImage}
                  alt={battle.nameAr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sword className="w-5 h-5 text-primary" />
                    <span className="text-primary">معركة ملحمية</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-amiri font-bold text-gradient-gold mb-2">
                    {battle.nameAr}
                  </h2>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{battle.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{battle.location}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${resultColor}`}>
                      <Trophy className="w-4 h-4" />
                      <span>{resultText}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">
                {/* Sultan & Forces */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-muted/30 p-6 rounded-xl border border-primary/10">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <Crown className="w-5 h-5" />
                      <span className="font-semibold">السلطان</span>
                    </div>
                    <p className="text-2xl font-amiri text-foreground">{battle.sultanName}</p>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-xl border border-primary/10">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">القوات العثمانية</span>
                    </div>
                    <p className="text-xl text-foreground">{battle.ottomanForces}</p>
                  </div>
                  <div className="bg-muted/30 p-6 rounded-xl border border-secondary/10">
                    <div className="flex items-center gap-2 text-secondary mb-3">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">قوات العدو</span>
                    </div>
                    <p className="text-xl text-foreground">{battle.enemyForces}</p>
                  </div>
                </div>

                {/* Narrative */}
                <div className="mb-8">
                  <h3 className="text-2xl font-amiri text-primary mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    قصة المعركة
                  </h3>
                  <p className="text-lg text-foreground leading-relaxed">
                    {battle.narrative}
                  </p>
                </div>

                {/* Strategy */}
                <div className="mb-8">
                  <h3 className="text-2xl font-amiri text-primary mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    الاستراتيجية العسكرية
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {battle.militaryStrategy}
                  </p>
                </div>

                {/* Significance */}
                <div className="mb-8 bg-primary/10 p-6 rounded-xl border border-primary/20">
                  <h3 className="text-xl font-amiri text-primary mb-2">أهمية المعركة</h3>
                  <p className="text-foreground">{battle.significance}</p>
                </div>

                {/* Weapons & Opponents */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-amiri text-primary mb-3">الأسلحة المستخدمة</h3>
                    <div className="flex flex-wrap gap-2">
                      {battle.weaponsUsed.map((weapon) => (
                        <span
                          key={weapon}
                          className="px-4 py-2 bg-muted rounded-full text-foreground text-sm"
                        >
                          {weapon}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-amiri text-primary mb-3">الأعداء</h3>
                    <div className="flex flex-wrap gap-2">
                      {battle.opponents.map((opponent) => (
                        <span
                          key={opponent}
                          className="px-4 py-2 bg-secondary/20 rounded-full text-secondary-foreground text-sm"
                        >
                          {opponent}
                        </span>
                      ))}
                    </div>
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

export default BattleModal;
