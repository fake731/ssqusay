import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Calendar, Zap, Sword, Link } from "lucide-react";
import { Weapon, battles } from "@/data/ottomanData";
import { getWeaponImage } from "@/utils/weaponImages";
import HistoricalProse from "./HistoricalProse";

interface WeaponModalProps {
  weapon: Weapon | null;
  isOpen: boolean;
  onClose: () => void;
  onBattleClick?: (battleId: number) => void;
}

const WeaponModal = ({ weapon, isOpen, onClose, onBattleClick }: WeaponModalProps) => {
  if (!weapon) return null;

  // Find battles that used this weapon
  const relatedBattles = battles.filter(battle => 
    battle.weaponsUsed.some(w => 
      w.toLowerCase().includes(weapon.name.toLowerCase()) ||
      weapon.nameAr.includes(w)
    )
  );

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
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-section rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Hero Image */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={getWeaponImage(weapon.name.toLowerCase())}
                alt={weapon.nameAr}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              
              {/* Type Badge */}
              <div className="absolute top-4 right-4 px-4 py-2 bg-primary/90 rounded-full">
                <span className="text-primary-foreground font-bold">{weapon.type}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 -mt-20 relative">
              {/* Title */}
              <h2 className="text-4xl font-amiri font-bold text-gradient-gold mb-2">
                {weapon.nameAr}
              </h2>
              <p className="text-xl text-muted-foreground mb-6">{weapon.name}</p>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="glass-section p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">فترة الاستخدام</span>
                  </div>
                  <p className="text-foreground">{weapon.era}</p>
                </div>
                <div className="glass-section p-4 rounded-xl">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Zap className="w-5 h-5" />
                    <span className="font-semibold">التأثير</span>
                  </div>
                  <p className="text-foreground text-sm">{weapon.impact}</p>
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-amiri font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  القصة الكاملة
                </h3>
                <div className="glass-section p-6 rounded-xl">
                  <HistoricalProse text={weapon.fullDescription} className="text-muted-foreground leading-relaxed text-lg" />
                </div>
              </div>

              {/* Related Battles */}
              {relatedBattles.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-amiri font-bold text-foreground mb-4 flex items-center gap-2">
                    <Sword className="w-6 h-6 text-primary" />
                    المعارك التي استُخدم فيها
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {relatedBattles.map((battle) => (
                      <button
                        key={battle.id}
                        onClick={() => {
                          onClose();
                          onBattleClick?.(battle.id);
                        }}
                        className="flex items-center gap-3 p-4 glass-section rounded-xl hover:border-primary/40 transition-colors text-right group"
                      >
                        <Link className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <p className="text-foreground font-semibold">{battle.nameAr}</p>
                          <p className="text-sm text-muted-foreground">{battle.year} - {battle.sultanName}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WeaponModal;
