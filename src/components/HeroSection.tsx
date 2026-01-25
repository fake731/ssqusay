import { motion } from "framer-motion";
import { ChevronDown, Sword, Crown, Map, Shield } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  const scrollToContent = () => {
    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Ottoman Empire Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Animated particles/smoke effect */}
      <div className="absolute inset-0 smoke-effect opacity-50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-6 py-2 border border-primary/50 rounded-full text-primary text-sm tracking-wider">
            رحلة عبر 600 عام من المجد
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="epic-title mb-6"
        >
          الدولة العثمانية
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="epic-subtitle max-w-3xl mx-auto mb-12"
        >
          اكتشف ملحمة الفتوحات والمعارك والسلاطين العظماء في تجربة تفاعلية فريدة
          <br />
          <span className="text-primary">شاهد التاريخ... لا تقرأه</span>
        </motion.p>

        {/* Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
        >
          {[
            { icon: Crown, label: "السلاطين", href: "#sultans" },
            { icon: Sword, label: "المعارك", href: "#battles" },
            { icon: Shield, label: "الأسلحة", href: "#weapons" },
            { icon: Map, label: "الخريطة", href: "#timeline" },
          ].map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="ottoman-card p-6 flex flex-col items-center gap-3 cursor-pointer group"
            >
              <item.icon className="w-8 h-8 text-primary group-hover:animate-glow-pulse transition-all" />
              <span className="text-foreground font-tajawal font-semibold">
                {item.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          onClick={scrollToContent}
          className="animate-float"
        >
          <ChevronDown className="w-10 h-10 text-primary mx-auto" />
        </motion.button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
