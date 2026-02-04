import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Crown, Sword, Shield, Users, Map, Building2, 
  ChevronDown, Coins, Scale, BookOpen, ChevronLeft
} from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const navItems = [
  { icon: BookOpen, label: "نبذة عامة", href: "/overview", color: "from-amber-500 to-amber-700" },
  { icon: Crown, label: "السلاطين", href: "/sultans", color: "from-yellow-500 to-yellow-700" },
  { icon: Sword, label: "المعارك", href: "/battles", color: "from-red-500 to-red-700" },
  { icon: Shield, label: "الأسلحة", href: "/weapons", color: "from-gray-500 to-gray-700" },
  { icon: Users, label: "الجنود", href: "/warriors", color: "from-green-500 to-green-700" },
  { icon: Map, label: "الخرائط", href: "/maps", color: "from-blue-500 to-blue-700" },
  { icon: Building2, label: "المعمار", href: "/architecture", color: "from-purple-500 to-purple-700" },
  { icon: Coins, label: "التجارة", href: "/trade", color: "from-emerald-500 to-emerald-700" },
  { icon: Scale, label: "الدين والقضاء", href: "/religion", color: "from-indigo-500 to-indigo-700" },
];

const Index = () => {
  const scrollToContent = () => {
    document.getElementById("sections")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Ottoman Empire Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
        </div>

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

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            onClick={scrollToContent}
            className="animate-float"
          >
            <ChevronDown className="w-10 h-10 text-primary mx-auto" />
          </motion.button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Sections Grid */}
      <section id="sections" className="py-20 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-4">
              اكتشف أقسام الموقع
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تصفح الأقسام المختلفة لاستكشاف تاريخ الدولة العثمانية العظيمة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  className="block group"
                >
                  <div className="ottoman-card p-8 h-full hover:scale-[1.02] transition-transform duration-300">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      <item.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-amiri font-bold text-gradient-gold mb-3">
                      {item.label}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {getDescription(item.label)}
                    </p>
                    <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
                      <span>استكشف القسم</span>
                      <ChevronLeft className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-amiri text-gradient-gold mb-4">
            الدولة العثمانية
          </h3>
          <p className="text-muted-foreground mb-4">
            رحلة تفاعلية عبر 600 عام من التاريخ
          </p>
          <p className="text-sm text-muted-foreground">
            تجربة تعليمية مرئية • شاهد التاريخ لا تقرأه
          </p>
        </div>
      </footer>
    </div>
  );
};

function getDescription(label: string): string {
  const descriptions: Record<string, string> = {
    "نبذة عامة": "تعرف على تاريخ الدولة العثمانية ونشأتها وأهم محطاتها",
    "السلاطين": "36 سلطاناً حكموا لستة قرون، اكتشف قصصهم وإنجازاتهم",
    "المعارك": "معارك ملحمية غيرت مجرى التاريخ بالتفاصيل العسكرية",
    "الأسلحة": "من السيوف الدمشقية إلى المدافع العملاقة",
    "الجنود": "الإنكشارية والسيباهي وأقوى جيوش العصر",
    "الخرائط": "تتبع توسع وانكماش الإمبراطورية عبر القرون",
    "المعمار": "روائع العمارة العثمانية من مساجد وقصور",
    "التجارة": "طرق الحرير والتوابل والاقتصاد العثماني",
    "الدين والقضاء": "نظام القضاء والعلماء والمؤسسات الدينية",
  };
  return descriptions[label] || "";
}

export default Index;
