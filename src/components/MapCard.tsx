import { motion } from "framer-motion";
import { Calendar, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { OttomanMap } from "@/data/maps";
import { getMapImage } from "@/utils/mapImages";

interface MapCardProps {
  map: OttomanMap;
  index: number;
  onClick: () => void;
}

const MapCard = ({ map, index, onClick }: MapCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="ottoman-card relative overflow-hidden rounded-2xl hover:border-primary/40 transition-all duration-300">
        {/* Map Image */}
        <div className="relative h-64 sm:h-72 overflow-hidden">
          <img
            src={getMapImage(map.year)}
            alt={map.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Year Badge */}
          <div className="absolute top-4 right-4 px-4 py-2 rounded-full glass-section border border-primary/40">
            <span className="text-foreground font-bold text-lg">{map.year}</span>
          </div>
          
          {/* Expansion/Contraction Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full flex items-center gap-2 glass-section border ${
            map.expansion ? 'border-green-400/40 text-green-300' : 'border-red-400/40 text-red-300'
          }`}>
            {map.expansion ? (
              <>
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">توسع</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">تراجع</span>
              </>
            )}
          </div>
          
          {/* Title on Image */}
          <div className="absolute bottom-4 right-4 left-4">
            <h3 className="text-xl sm:text-2xl font-amiri font-bold text-white mb-1">
              {map.title}
            </h3>
            <p className="text-white/80 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {map.period}
            </p>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          {/* Description Preview */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
            {map.description}
          </p>
          
          {/* Territories Preview */}
          <div className="flex items-start gap-2 mb-3">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex flex-wrap gap-1.5">
              {map.territories.slice(0, 4).map((territory, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                >
                  {territory}
                </span>
              ))}
              {map.territories.length > 4 && (
                <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                  +{map.territories.length - 4}
                </span>
              )}
            </div>
          </div>
          
          {/* View Details Button */}
          <div className="text-center pt-2 border-t border-border">
            <span className="text-primary text-sm font-medium group-hover:underline">
              عرض التفاصيل والحدود الكاملة
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapCard;
