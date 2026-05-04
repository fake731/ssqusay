import { motion } from "framer-motion";
import { Shield, Calendar, Zap } from "lucide-react";
import { Weapon } from "@/data/ottomanData";
import { getWeaponImage } from "@/utils/weaponImages";

interface WeaponCardProps {
  weapon: Weapon;
  index: number;
  onClick?: () => void;
}

const WeaponCard = ({ weapon, index, onClick }: WeaponCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, rotateY: 5 }}
      onClick={onClick}
      className="ottoman-card weapon-shine group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={getWeaponImage(weapon.name.toLowerCase())}
          alt={weapon.nameAr}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass-section border border-primary/40">
          <span className="text-foreground text-xs font-semibold">{weapon.type}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-primary text-sm">{weapon.era}</span>
        </div>

        <h3 className="text-xl font-amiri font-bold text-foreground mb-3 group-hover:text-gradient-gold transition-colors">
          {weapon.nameAr}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {weapon.description}
        </p>

        {/* Info Grid */}
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{weapon.era}</span>
          </div>
          <div className="flex items-start gap-2 text-muted-foreground">
            <Zap className="w-4 h-4 text-primary mt-0.5" />
            <span className="line-clamp-2">{weapon.impact}</span>
          </div>
        </div>
      </div>

      {/* Click indicator */}
      <div className="absolute bottom-4 left-4 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        اضغط لمعرفة المزيد ←
      </div>

      {/* Metallic shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </motion.div>
  );
};

export default WeaponCard;
