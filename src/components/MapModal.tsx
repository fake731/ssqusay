import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Calendar, MapPin, Crown, Sword, TrendingUp, TrendingDown } from "lucide-react";
import { OttomanMap } from "@/data/maps";
import { getMapImage } from "@/utils/mapImages";
import { sultans } from "@/data/sultans";
import { motion } from "framer-motion";
import HistoricalProse from "./HistoricalProse";

interface MapModalProps {
  map: OttomanMap | null;
  isOpen: boolean;
  onClose: () => void;
  onSultanClick?: (sultanId: number) => void;
}

const MapModal = ({ map, isOpen, onClose, onSultanClick }: MapModalProps) => {
  if (!map) return null;

  const sultan = map.sultanId ? sultans.find(s => s.id === map.sultanId) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden glass-section border-primary/20">
        <DialogTitle className="sr-only">{map.title}</DialogTitle>
        <ScrollArea className="max-h-[90vh]">
          {/* Hero Image */}
          <div className="relative h-72 sm:h-96">
            <img
              src={getMapImage(map.year)}
              alt={map.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {/* Year Badge */}
            <div className="absolute top-4 right-4 px-6 py-3 bg-primary/90 backdrop-blur-sm rounded-full">
              <span className="text-primary-foreground font-bold text-2xl">{map.year}</span>
            </div>
            
            {/* Expansion Badge */}
            <div className={`absolute top-20 right-4 px-4 py-2 rounded-full flex items-center gap-2 glass-section ${
              map.expansion ? 'text-green-300' : 'text-red-300'
            }`}>
              {map.expansion ? (
                <>
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">فترة توسع</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-5 h-5" />
                  <span className="font-medium">فترة تراجع</span>
                </>
              )}
            </div>
            
            {/* Title */}
            <div className="absolute bottom-6 right-6 left-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-amiri font-bold text-gradient-gold mb-2"
              >
                {map.title}
              </motion.h2>
              <p className="text-muted-foreground flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5 text-primary" />
                {map.period}
              </p>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-amiri font-bold text-primary mb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                نظرة عامة
              </h3>
              <HistoricalProse text={map.description} className="text-foreground leading-relaxed text-lg" />
            </motion.div>
            
            {/* Sultan Link */}
            {sultan && onSultanClick && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                onClick={() => {
                  onClose();
                  setTimeout(() => onSultanClick(sultan.id), 100);
                }}
                className="p-4 glass-section rounded-xl cursor-pointer hover:border-primary/40 transition-colors"
              >
                <h3 className="text-lg font-amiri font-bold text-primary mb-2 flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  السلطان الحاكم
                </h3>
                <p className="text-foreground font-medium">{sultan.name}</p>
                <p className="text-muted-foreground text-sm">{sultan.reign}</p>
              </motion.div>
            )}
            
            {/* Territories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-amiri font-bold text-primary mb-4">
                الأراضي والولايات
              </h3>
              <div className="flex flex-wrap gap-2">
                {map.territories.map((territory, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="px-4 py-2 glass-section text-foreground rounded-full text-sm font-medium"
                  >
                    {territory}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            {/* Key Events */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-amiri font-bold text-primary mb-4 flex items-center gap-2">
                <Sword className="w-5 h-5" />
                أحداث رئيسية
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {map.keyEvents.map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3 p-3 glass-section rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground">{event}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
