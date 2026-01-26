import { motion } from "framer-motion";
import { Sword, Users, MapPin, Calendar, Trophy, Flag } from "lucide-react";
import { Battle } from "@/data/ottomanData";
import { getBattleImage } from "@/utils/battleImages";

interface BattleCardProps {
  battle: Battle;
  index: number;
  onClick: () => void;
}

const BattleCard = ({ battle, index, onClick }: BattleCardProps) => {
  const resultColor = battle.result === "victory" 
    ? "text-green-500" 
    : battle.result === "defeat" 
    ? "text-red-500" 
    : "text-yellow-500";

  const resultText = battle.result === "victory" 
    ? "نصر" 
    : battle.result === "defeat" 
    ? "هزيمة" 
    : "تعادل";

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="ottoman-card cursor-pointer group overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative lg:w-2/5 h-80 lg:h-auto overflow-hidden">
          <img
            src={getBattleImage(battle.name.toLowerCase().replace(/\s+/g, '-').replace('battle-of-', '').replace('fall-of-', '').replace('siege-of-', ''))}
            alt={battle.nameAr}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-card via-card/70 to-transparent lg:bg-gradient-to-r" />
          
          {/* Year Badge */}
          <div className="absolute top-4 left-4 px-4 py-2 bg-secondary/90 rounded-lg">
            <span className="text-secondary-foreground font-bold text-xl">{battle.year}</span>
          </div>

          {/* Result Badge */}
          <div className={`absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1 bg-card/90 rounded-full ${resultColor}`}>
            <Trophy className="w-4 h-4" />
            <span className="font-bold">{resultText}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:w-3/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sword className="w-5 h-5 text-primary" />
            <span className="text-primary text-sm">معركة ملحمية</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-amiri font-bold text-foreground mb-3 group-hover:text-gradient-gold transition-colors">
            {battle.nameAr}
          </h3>

          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{battle.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flag className="w-4 h-4" />
              <span>{battle.sultanName}</span>
            </div>
          </div>

          {/* Forces */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-primary mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">القوات العثمانية</span>
              </div>
              <span className="text-foreground font-semibold text-sm">{battle.ottomanForces}</span>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-secondary mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">قوات العدو</span>
              </div>
              <span className="text-foreground font-semibold text-sm">{battle.enemyForces}</span>
            </div>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2">
            {battle.narrative}
          </p>

          {/* Opponents */}
          <div className="flex flex-wrap gap-2 mt-4">
            {battle.opponents.map((opponent) => (
              <span
                key={opponent}
                className="px-3 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-full"
              >
                {opponent}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Battle Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-primary/5" />
      </div>
    </motion.div>
  );
};

export default BattleCard;
