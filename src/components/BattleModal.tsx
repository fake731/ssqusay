import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Sword, Users, Crown, Trophy, Target, Zap, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Battle } from "@/data/ottomanData";
import { getBattleImage } from "@/utils/battleImages";
import HistoricalProse from "./HistoricalProse";

interface BattleModalProps {
  battle: Battle | null;
  isOpen: boolean;
  onClose: () => void;
  onSultanClick?: (sultanId: number) => void;
}

const BattleModal = ({ battle, isOpen, onClose, onSultanClick }: BattleModalProps) => {
  const navigate = useNavigate();
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
            <div className="min-h-full glass-section border border-primary/20 rounded-2xl overflow-hidden battle-glow">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 left-4 z-10 p-2 glass-section rounded-full hover:bg-primary/20 transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>

              {/* Hero Image */}
              <div className="relative h-72 md:h-96">
                <img
                  src={getBattleImage(battle.name.toLowerCase().replace(/\s+/g, '-').replace('battle-of-', '').replace('fall-of-', '').replace('siege-of-', ''))}
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
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/السلاطين");
                    }}
                    className="glass-section p-6 rounded-xl hover:border-primary/40 transition-colors group text-right"
                  >
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <Crown className="w-5 h-5" />
                      <span className="font-semibold">السلطان</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity mr-auto" />
                    </div>
                    <p className="text-2xl font-amiri text-foreground group-hover:text-primary transition-colors">{battle.sultanName}</p>
                    <p className="text-xs text-muted-foreground mt-1">اضغط للانتقال لصفحة السلاطين</p>
                  </button>
                  <div className="glass-section p-6 rounded-xl">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">القوات العثمانية</span>
                    </div>
                    <p className="text-xl text-foreground">{battle.ottomanForces}</p>
                  </div>
                  <div className="glass-section p-6 rounded-xl">
                    <div className="flex items-center gap-2 text-secondary mb-3">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">قوات العدو</span>
                    </div>
                    <p className="text-xl text-foreground">{battle.enemyForces}</p>
                  </div>
                </div>

                {/* Full Narrative - Detailed Story */}
                <div className="mb-8 p-6 glass-section rounded-xl">
                  <h3 className="text-2xl font-amiri text-primary mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    قصة المعركة الكاملة
                  </h3>
                  <HistoricalProse
                    text={battle.fullNarrative || battle.narrative}
                    className="text-lg text-foreground leading-relaxed"
                  />
                </div>

                {/* Strategy */}
                <div className="mb-8">
                  <h3 className="text-2xl font-amiri text-primary mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    الاستراتيجية العسكرية
                  </h3>
                  <HistoricalProse
                    text={battle.militaryStrategy}
                    className="text-lg text-muted-foreground leading-relaxed"
                  />
                </div>

                {/* Casualties */}
                {battle.casualties && (
                  <div className="mb-8 p-4 glass-section rounded-xl">
                    <h3 className="text-xl font-amiri text-secondary mb-2">الخسائر</h3>
                    <p className="text-foreground">{battle.casualties}</p>
                  </div>
                )}

                {/* Significance */}
                <div className="mb-8 glass-section p-6 rounded-xl">
                  <h3 className="text-xl font-amiri text-primary mb-2">أهمية المعركة التاريخية</h3>
                  <HistoricalProse text={battle.significance} className="text-lg text-foreground" />
                </div>

                {/* Commander */}
                {battle.commander && (
                  <div className="mb-8 flex items-center gap-4 p-4 glass-section rounded-xl">
                    <Crown className="w-8 h-8 text-primary" />
                    <div>
                      <span className="text-muted-foreground text-sm">القائد العثماني</span>
                      <p className="text-xl font-amiri text-foreground">{battle.commander}</p>
                    </div>
                  </div>
                )}

                {/* Weapons & Opponents */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-amiri text-primary mb-3">الأسلحة المستخدمة</h3>
                    <div className="flex flex-wrap gap-2">
                      {battle.weaponsUsed.map((weapon) => (
                        <span
                          key={weapon}
                          className="px-4 py-2 glass-section rounded-full text-foreground text-sm hover:bg-primary/20 transition-colors cursor-pointer"
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
                          className="px-4 py-2 glass-section rounded-full text-foreground text-sm"
                        >
                          {opponent.includes("بيزنط") ? <span className="text-byzantine font-semibold">{opponent}</span> : opponent}
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
