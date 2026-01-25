import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Crown } from "lucide-react";
import { cities, sultans, battles } from "@/data/ottomanData";

const Timeline = () => {
  const sortedCities = [...cities].sort((a, b) => a.year - b.year);

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

            return (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 md:mb-16 ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year Badge (Center) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center justify-center z-10">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center animate-glow-pulse">
                    <span className="text-primary-foreground font-bold">{city.year}</span>
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ${
                    isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                  }`}
                >
                  <div className="ottoman-card p-6 group hover:border-primary/40 transition-colors">
                    {/* Mobile Year */}
                    <div className="flex items-center gap-2 mb-3 md:hidden">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-primary font-bold">{city.year}</span>
                    </div>

                    <h3 className="text-2xl font-amiri font-bold text-foreground group-hover:text-gradient-gold transition-colors mb-2">
                      فتح {city.nameAr}
                    </h3>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Crown className="w-4 h-4 text-primary" />
                        <span>{city.sultanName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{city.forces}</span>
                      </div>
                    </div>

                    {battle && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <span className="text-xs text-primary">المعركة المرتبطة:</span>
                        <p className="text-foreground font-semibold">{battle.nameAr}</p>
                      </div>
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
