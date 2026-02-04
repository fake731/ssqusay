import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

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
        <a 
          href="https://www.instagram.com/1oscp" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[hsl(280,80%,45%)] via-[hsl(330,80%,50%)] to-[hsl(30,90%,55%)] rounded-2xl text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Instagram className="w-5 h-5" />
          </div>
          <div className="text-right">
            <span className="block text-lg">تابعنا على انستغرام</span>
            <span className="block text-xs opacity-80">@1oscp</span>
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
