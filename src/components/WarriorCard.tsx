import { motion } from "framer-motion";
import { Shield, Swords, Calendar, Users } from "lucide-react";
import { Warrior } from "@/data/ottomanData";
import { getWarriorImage } from "@/utils/warriorImages";

interface WarriorCardProps {
  warrior: Warrior;
  index: number;
  onClick: () => void;
}

const WarriorCard = ({ warrior, index, onClick }: WarriorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -10 }}
      onClick={onClick}
      className="ottoman-card cursor-pointer group overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={getWarriorImage(warrior.image)}
          alt={warrior.nameAr}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-section border border-primary/40">
          <span className="text-foreground text-sm font-bold">{warrior.typeAr}</span>
        </div>

        {/* Period Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full glass-section">
          <Calendar className="w-3 h-3 text-primary" />
          <span className="text-foreground text-xs">{warrior.period}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-primary" />
          <span className="text-primary text-sm">محاربو العثمانيين</span>
        </div>

        <h3 className="text-2xl font-amiri font-bold text-foreground mb-3 group-hover:text-gradient-gold transition-colors">
          {warrior.nameAr}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {warrior.description}
        </p>

        {/* Equipment Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {warrior.equipment.slice(0, 3).map((item) => (
            <span
              key={item}
              className="px-2 py-1 glass-section text-foreground text-xs rounded-full"
            >
              {item}
            </span>
          ))}
          {warrior.equipment.length > 3 && (
            <span className="px-2 py-1 glass-section text-muted-foreground text-xs rounded-full">
              +{warrior.equipment.length - 3}
            </span>
          )}
        </div>

        {/* Role */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Swords className="w-4 h-4 text-primary" />
          <span className="line-clamp-1">{warrior.role}</span>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
};

export default WarriorCard;
