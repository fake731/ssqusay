import { motion } from "framer-motion";
import { Building2, Castle, MapPin, Calendar } from "lucide-react";
import { Architecture } from "@/data/architecture";
import { getArchitectureImage } from "@/utils/architectureImages";

interface ArchitectureCardProps {
  architecture: Architecture;
  index: number;
  onClick: () => void;
}

const typeIcons = {
  mosque: Building2,
  palace: Castle,
  complex: Building2,
  bridge: Building2,
  fountain: Building2
};

const typeLabels = {
  mosque: "مسجد",
  palace: "قصر",
  complex: "مجمع",
  bridge: "جسر",
  fountain: "نافورة"
};

const ArchitectureCard = ({ architecture, index, onClick }: ArchitectureCardProps) => {
  const TypeIcon = typeIcons[architecture.type];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="ottoman-card overflow-hidden cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={getArchitectureImage(architecture.id)}
          alt={architecture.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full flex items-center gap-1 glass-section border border-primary/40">
          <TypeIcon className="w-3 h-3 text-primary" />
          <span className="text-xs font-semibold text-foreground">
            {typeLabels[architecture.type]}
          </span>
        </div>
        
        {/* Year Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full flex items-center gap-1 glass-section">
          <Calendar className="w-3 h-3 text-primary" />
          <span className="text-xs font-bold text-foreground">{architecture.yearBuilt}</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-amiri font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {architecture.name}
        </h3>
        
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span>{architecture.location}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {architecture.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ArchitectureCard;
