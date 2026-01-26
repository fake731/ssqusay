import { motion } from "framer-motion";
import { Crown, Sword, Calendar, MapPin } from "lucide-react";
import { Sultan } from "@/data/ottomanData";
import { getSultanImage } from "@/utils/sultanImages";

interface SultanCardProps {
  sultan: Sultan;
  index: number;
  onClick: () => void;
}

const SultanCard = ({ sultan, index, onClick }: SultanCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="ottoman-card cursor-pointer group"
    >
      {/* Image Container - Larger for better visibility */}
      <div className="relative h-80 overflow-hidden">
        <img
          src={getSultanImage(sultan.id)}
          alt={sultan.nameAr}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        
        {/* Sultan Number Badge */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center border-2 border-primary-foreground/20">
          <span className="text-primary-foreground font-bold text-xl">{sultan.id}</span>
        </div>

        {/* Reign Period */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-foreground bg-card/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{sultan.reign}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-5 h-5 text-primary" />
          <span className="text-primary text-sm">{sultan.title}</span>
        </div>
        
        <h3 className="text-2xl font-amiri font-bold text-foreground mb-3 group-hover:text-gradient-gold transition-colors">
          {sultan.nameAr}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {sultan.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Sword className="w-4 h-4" />
            <span>{sultan.majorBattles.length} معارك</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{sultan.majorConquests.length} فتوحات</span>
          </div>
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </motion.div>
  );
};

export default SultanCard;
