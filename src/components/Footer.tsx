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
          className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl text-white font-bold shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(280, 80%, 45%) 0%, hsl(330, 80%, 50%) 25%, hsl(350, 80%, 55%) 50%, hsl(30, 90%, 55%) 75%, hsl(45, 100%, 60%) 100%)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <div className="relative w-14 h-14 bg-white/25 rounded-xl flex items-center justify-center backdrop-blur-md shadow-inner border border-white/30">
            <Instagram className="w-7 h-7 drop-shadow-lg" />
          </div>
          <div className="relative text-right">
            <span className="block text-xl font-bold tracking-wide drop-shadow-lg">تابعنا على انستغرام</span>
            <span className="block text-sm opacity-90 font-semibold">@1oscp</span>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity -z-10" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
