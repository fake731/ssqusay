import { Instagram } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Footer = () => {
  return (
    <footer className="py-12 sm:py-16 bg-card border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl sm:text-2xl font-amiri text-gradient-gold mb-4">
          الدولة العثمانية
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground mb-6">
          رحلة تفاعلية عبر 600 عام من التاريخ
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground mb-8">
          تجربة تعليمية مرئية • شاهد التاريخ لا تقرأه
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a 
                href="https://instagram.com/0oscp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-muted/60 hover:bg-primary/20 border border-border hover:border-primary/40 transition-all duration-300 hover:scale-110 group"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>@1oscp</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </footer>
  );
};

export default Footer;
