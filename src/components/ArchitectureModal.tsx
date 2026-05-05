import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Building2, Castle, MapPin, Calendar, User, Ruler, Star, Crown } from "lucide-react";
import { Architecture, getArchitectById } from "@/data/architecture";
import { getArchitectureImage, getArchitectImage } from "@/utils/architectureImages";
import { motion } from "framer-motion";
import HistoricalProse from "./HistoricalProse";

interface ArchitectureModalProps {
  architecture: Architecture | null;
  isOpen: boolean;
  onClose: () => void;
  onSultanClick?: (sultanId: number) => void;
}

const typeLabels = {
  mosque: "مسجد",
  palace: "قصر",
  complex: "مجمع ديني",
  bridge: "جسر",
  fountain: "نافورة"
};

const ArchitectureModal = ({ architecture, isOpen, onClose, onSultanClick }: ArchitectureModalProps) => {
  if (!architecture) return null;
  
  const architect = architecture.architectId ? getArchitectById(architecture.architectId) : null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden glass-section border-primary/20">
        <ScrollArea className="max-h-[90vh]">
          {/* Hero Image */}
          <div className="relative h-64 md:h-80">
            <img
              src={getArchitectureImage(architecture.id)}
              alt={architecture.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Title Overlay */}
            <div className="absolute bottom-6 right-6 left-6 text-right">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary/90 rounded-full text-xs font-semibold text-primary-foreground">
                  {typeLabels[architecture.type]}
                </span>
                <span className="px-3 py-1 bg-secondary/90 rounded-full text-xs font-semibold text-secondary-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {architecture.yearBuilt}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-amiri font-bold text-white drop-shadow-lg">
                {architecture.name}
              </h2>
              <div className="flex items-center gap-1 text-white/80 mt-2">
                <MapPin className="w-4 h-4" />
                <span>{architecture.location}</span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <HistoricalProse text={architecture.description} className="text-foreground leading-relaxed text-lg" />
            </div>
            
            {/* Architect Info */}
            {architect && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-5 border border-primary/20"
              >
                <h3 className="text-lg font-amiri font-bold text-primary mb-3 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  المعماري
                </h3>
                <div className="flex items-start gap-4">
                  <img
                    src={getArchitectImage(architect.id)}
                    alt={architect.name}
                    className="w-20 h-20 rounded-lg object-cover border-2 border-primary/30"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-foreground text-lg">{architect.name}</h4>
                    <p className="text-primary text-sm mb-2">{architect.title}</p>
                    <p className="text-sm text-muted-foreground">
                      ({architect.birthYear} - {architect.deathYear})
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {architect.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Sultan Link */}
            {architecture.sultanId && onSultanClick && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => {
                  onClose();
                  onSultanClick(architecture.sultanId!);
                }}
                className="w-full flex items-center gap-3 p-4 bg-primary/10 hover:bg-primary/20 rounded-xl border border-primary/20 transition-colors text-right"
              >
                <Crown className="w-6 h-6 text-primary" />
                <span className="text-foreground font-semibold">عرض السلطان الذي أمر ببنائه</span>
              </motion.button>
            )}
            
            {/* Features */}
            <div>
              <h3 className="text-lg font-amiri font-bold text-primary mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" />
                المميزات المعمارية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {architecture.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Dimensions */}
            {architecture.dimensions && (
              <div className="flex items-center gap-3 p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                <Ruler className="w-6 h-6 text-secondary" />
                <div>
                  <span className="text-sm text-muted-foreground">الأبعاد</span>
                  <p className="text-foreground font-semibold">{architecture.dimensions}</p>
                </div>
              </div>
            )}
            
            {/* Historical Significance */}
            <div className="glass-section rounded-xl p-5">
              <h3 className="text-lg font-amiri font-bold text-primary mb-3">
                الأهمية التاريخية
              </h3>
              <HistoricalProse text={architecture.historicalSignificance} className="text-muted-foreground leading-relaxed" />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ArchitectureModal;
