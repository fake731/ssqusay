import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Crown, Sword, Shield, Users, Map, Building2, 
  ChevronDown, Coins, Scale, BookOpen, ChevronLeft,
  Star, AlertTriangle, Calendar
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";

import { empireOverview } from "@/data/overview";

const navItems = [
  { icon: Crown, label: "السلاطين", href: "/السلاطين", color: "from-yellow-500 to-yellow-700" },
  { icon: Sword, label: "المعارك", href: "/المعارك", color: "from-red-500 to-red-700" },
  { icon: Shield, label: "الأسلحة", href: "/الأسلحة", color: "from-gray-500 to-gray-700" },
  { icon: Users, label: "الجنود", href: "/الجنود", color: "from-green-500 to-green-700" },
  { icon: Map, label: "الخرائط", href: "/الخرائط", color: "from-blue-500 to-blue-700" },
  { icon: Building2, label: "المعمار", href: "/المعمار", color: "from-purple-500 to-purple-700" },
  { icon: Coins, label: "التجارة", href: "/التجارة", color: "from-emerald-500 to-emerald-700" },
  { icon: Scale, label: "الدين والقضاء", href: "/الدين-والقضاء", color: "from-indigo-500 to-indigo-700" },
];

const Index = () => {
  const scrollToContent = () => {
    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section — uses the site-wide cinematic video background */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Soft vignette only — keep the cinematic video clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
        <div className="absolute inset-0 smoke-effect opacity-30" />

        <div className="relative z-10 container-wide text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="font-historical font-bold text-gradient-gold text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wide drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
          >
            الدولة العثمانية
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-12 inline-block glass-section rounded-full px-1 py-1"
          >
            <span className="inline-block px-6 py-2 border border-primary/50 rounded-full text-primary text-sm tracking-wider font-historical">
              رحلة عبر 600 عام من المجد
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="max-w-3xl mx-auto -mt-6 mb-12 text-base md:text-xl text-foreground/85 font-iphone leading-relaxed"
          >
            اكتشف ملحمة الفتوحات والمعارك والسلاطين العظماء في تجربة تفاعلية فريدة
            <br />
            <span className="text-primary">شاهد التاريخ... لا تقرأه</span>
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            onClick={scrollToContent}
            className="animate-float"
          >
            <ChevronDown className="w-10 h-10 text-primary mx-auto" />
          </motion.button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container-wide">
          <div id="content" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Calendar className="w-10 h-10 text-primary" />
              <h2 className="text-4xl md:text-5xl font-historical font-bold text-gradient-gold">
                المحطات التاريخية
              </h2>
            </div>
            <p className="text-xl text-muted-foreground">
              أهم الأحداث في تاريخ الدولة العثمانية من 1299 إلى 1924
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute right-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />
              
              <div className="space-y-6">
                {empireOverview.timeline.map((event, index) => (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.02 }}
                    className="relative pr-16"
                  >
                    <div className="absolute right-3 w-6 h-6 bg-primary rounded-full border-4 border-background" />
                    <div className="ottoman-card p-4 hover:scale-[1.02] transition-transform">
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                        <span className="text-2xl font-bold text-primary font-amiri">
                          {event.year}
                        </span>
                        <span className="text-foreground/90">
                          {event.event}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionNavigation currentPath="/" />
      <Footer />
    </div>
  );
};

function getDescription(label: string): string {
  const descriptions: Record<string, string> = {
    "السلاطين": "36 سلطاناً حكموا لستة قرون",
    "المعارك": "معارك ملحمية غيرت التاريخ",
    "الأسلحة": "من السيوف إلى المدافع العملاقة",
    "الجنود": "الإنكشارية وأقوى الجيوش",
    "الخرائط": "تتبع توسع الإمبراطورية",
    "المعمار": "روائع العمارة العثمانية",
    "التجارة": "طرق الحرير والاقتصاد",
    "الدين والقضاء": "المؤسسات الدينية والقضائية",
  };
  return descriptions[label] || "";
}

export default Index;
