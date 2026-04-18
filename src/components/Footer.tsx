import { Instagram, Code2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const Footer = () => {
  return (
    <footer className="py-12 sm:py-16 bg-card border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-xl sm:text-2xl font-amiri text-gradient-gold mb-4">
          الدولة العثمانية
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground font-iphone mb-6">
          رحلة تفاعلية عبر 600 عام من التاريخ
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground font-iphone mb-8">
          تجربة تعليمية مرئية • شاهد التاريخ لا تقرأه
        </p>
        <div className="flex items-center justify-center gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a 
                  href="https://instagram.com/0oscp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-muted/30 backdrop-blur-sm hover:bg-primary/20 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/10 group"
                >
                  <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>@0oscp</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/استفسارات"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-muted/30 backdrop-blur-sm hover:bg-primary/20 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/10 group"
                >
                  <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="font-iphone">استفسارات</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  to="/دخول-المطور"
                  className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-muted/30 backdrop-blur-sm hover:bg-primary/20 border border-border/50 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/10 group"
                >
                  <Code2 className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="font-iphone">لوحة المطوّر</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
