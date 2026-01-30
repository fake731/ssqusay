import { motion } from "framer-motion";
import { Calendar, Users, Crown, Sword, ExternalLink } from "lucide-react";
import { cities, sultans, battles } from "@/data/ottomanData";
import { getBattleImage } from "@/utils/battleImages";

interface TimelineProps {
  onBattleClick?: (battleId: number) => void;
  onSultanClick?: (sultanId: number) => void;
}

const Timeline = ({ onBattleClick, onSultanClick }: TimelineProps) => {
  const sortedCities = [...cities].sort((a, b) => a.year - b.year);

  // Determine if it's a loss (خسارة) or conquest (فتح)
  const isLoss = (city: typeof cities[0]) => {
    return city.nameAr.includes("خسارة") || 
           city.nameAr.includes("استقلال") || 
           city.description.includes("خسارة") ||
           city.description.includes("استقلال") ||
           city.description.includes("احتلال") ||
           city.forces === "-";
  };

  // Get conquest image based on city name
  const getConquestImage = (city: typeof cities[0]) => {
    const battle = battles.find((b) => b.id === city.battleId);
    if (battle) {
      return getBattleImage(battle.name.toLowerCase().replace(/\s+/g, '-').replace('battle-of-', '').replace('fall-of-', '').replace('siege-of-', ''));
    }
    // Try to get image based on city name
    const cityKey = city.name.toLowerCase().replace(/\s+/g, '-');
    return getBattleImage(cityKey);
  };

  return (
    <section id="timeline" className="py-20 bg-gradient-epic">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 border border-primary/50 rounded-full text-primary text-sm mb-4">
            الجدول الزمني
          </span>
          <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-4">
            رحلة الفتوحات
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            تتبع مسيرة التوسع العثماني عبر القرون
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent transform -translate-x-1/2 hidden md:block" />

          {sortedCities.map((city, index) => {
            const isEven = index % 2 === 0;
            const battle = battles.find((b) => b.id === city.battleId);
            const isLossEvent = isLoss(city);

            return (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className={`relative flex items-center mb-12 md:mb-16 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year Badge (Center) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-10">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center animate-glow-pulse ${
                    isLossEvent ? 'bg-destructive' : 'bg-primary'
                  }`}>
                    <span className="text-primary-foreground font-bold">{city.year}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ${
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <div className={`ottoman-card p-6 group hover:border-primary/40 transition-colors ${
                    isLossEvent ? 'border-destructive/30' : ''
                  }`}>
                    {/* Mobile Year */}
                    <div className="flex items-center gap-2 mb-3 md:hidden">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className={`font-bold ${isLossEvent ? 'text-destructive' : 'text-primary'}`}>{city.year}</span>
                    </div>

                    {/* Conquest Image - Always show for non-loss events */}
                    {!isLossEvent && (
                      <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={getConquestImage(city)}
                          alt={city.nameAr}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      </div>
                    )}
                    
                    {/* Battle Image if available (for loss events) */}
                    {isLossEvent && battle && (
                      <div className="relative h-40 mb-4 rounded-lg overflow-hidden">
                        <img
                          src={getBattleImage(battle.name.toLowerCase().replace(/\s+/g, '-').replace('battle-of-', '').replace('fall-of-', '').replace('siege-of-', ''))}
                          alt={battle.nameAr}
                          className="w-full h-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-destructive/20 to-transparent" />
                      </div>
                    )}

                    <h3 className={`text-2xl font-amiri font-bold group-hover:text-gradient-gold transition-colors mb-2 ${
                      isLossEvent ? 'text-destructive' : 'text-foreground'
                    }`}>
                      {isLossEvent ? city.nameAr : `فتح ${city.nameAr}`}
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSultanClick?.(city.sultanId);
                        }}
                        className="flex items-center gap-2 hover:text-primary transition-colors"
                      >
                        <Crown className="w-4 h-4 text-primary" />
                        <span className="hover:underline">{city.sultanName}</span>
                      </button>
                      {!isLossEvent && city.forces !== "-" && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{city.forces}</span>
                        </div>
                      )}
                    </div>

                    {battle && (
                      <button
                        onClick={() => onBattleClick?.(battle.id)}
                        className="mt-4 pt-4 border-t border-border w-full text-right group/btn"
                      >
                        <div className="flex items-center gap-2">
                          <Sword className="w-4 h-4 text-primary" />
                          <span className="text-xs text-primary">المعركة المرتبطة:</span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-foreground font-semibold group-hover/btn:text-primary transition-colors">{battle.nameAr}</p>
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                        </div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Empty space for other side */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
