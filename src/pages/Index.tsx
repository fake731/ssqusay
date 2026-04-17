import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Crown, Sword, Shield, Users, Map, Building2, 
  ChevronDown, Coins, Scale, BookOpen, ChevronLeft,
  Star, AlertTriangle, Calendar
} from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import { empireOverview } from "@/data/overview";
import { getMainImage } from "@/utils/mainPageImages";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";

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

const strengthImages = [
  { key: 'strength-military', title: 'الجيش الإنكشاري', desc: 'أول جيش نظامي محترف في التاريخ الإسلامي' },
  { key: 'strength-tolerance', title: 'نظام الملل', desc: 'تسامح ديني منح الأقليات حكماً ذاتياً' },
  { key: 'strength-technology', title: 'التكنولوجيا العسكرية', desc: 'ريادة في البارود والمدفعية' },
  { key: 'strength-trade', title: 'الموقع التجاري', desc: 'سيطرة على مفترق طرق العالم' },
  { key: 'strength-position', title: 'الموقع الاستراتيجي', desc: 'تحكم بالمضائق والممرات الحيوية' },
];

const weaknessImages = [
  { key: 'weakness-succession', title: 'صراع الوراثة', desc: 'حروب أهلية بين الأمراء على العرش' },
  { key: 'weakness-corruption', title: 'فساد الإنكشارية', desc: 'تحولهم من قوة عسكرية لطبقة متنفذة' },
  { key: 'weakness-stagnation', title: 'الجمود الفكري', desc: 'رفض التحديث والتكنولوجيا الغربية' },
  { key: 'weakness-harem', title: 'تدخل الحريم', desc: 'نفوذ نساء القصر في السياسة' },
  { key: 'weakness-expansion', title: 'الاعتماد على التوسع', desc: 'اقتصاد يعتمد على الغنائم والفتوحات' },
];

const Index = () => {
  const scrollToContent = () => {
    document.getElementById("content")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar title="الدولة العثمانية" />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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

      {/* Introduction Section */}
      <section id="نبذة-عامة" className="py-24 bg-gradient-epic scroll-mt-20">
        <div className="container mx-auto px-4">
          <div id="content" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-8 text-center">
              {empireOverview.title}
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-8">
              {empireOverview.subtitle}
            </p>
            <div className="ottoman-card p-8 md:p-12">
              <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                {empireOverview.introduction}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Origin Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-8 text-center">
              {empireOverview.origin.title}
            </h2>
            <div className="ottoman-card p-8 md:p-12">
              <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                {empireOverview.origin.content}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strengths Section with Images */}
      <section className="py-24 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Star className="w-10 h-10 text-primary" />
              <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold">
                {empireOverview.strengths.title}
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {strengthImages.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ottoman-card overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={getMainImage(item.key)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-amiri font-bold text-gradient-gold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Weaknesses Section with Images */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <AlertTriangle className="w-10 h-10 text-destructive" />
              <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold">
                {empireOverview.weaknesses.title}
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {weaknessImages.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ottoman-card overflow-hidden group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={getMainImage(item.key)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-amiri font-bold text-gradient-gold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Calendar className="w-10 h-10 text-primary" />
              <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold">
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

      {/* Mission Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-8 text-center">
              {empireOverview.mission.title}
            </h2>
            <div className="ottoman-card p-8 md:p-12">
              <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                {empireOverview.mission.content}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-24 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold mb-8 text-center">
              {empireOverview.legacy.title}
            </h2>
            <div className="ottoman-card p-8 md:p-12">
              <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                {empireOverview.legacy.content}
              </p>
            </div>
          </motion.div>
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
