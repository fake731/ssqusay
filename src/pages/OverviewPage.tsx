import { motion } from "framer-motion";
import { Clock, Target, AlertTriangle, Star, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import { empireOverview } from "@/data/ottomanData";
import heroBanner from "@/assets/hero-banner.jpg";

const OverviewPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar title="نبذة عامة عن الدولة العثمانية" />

      {/* Hero Image Section */}
      <section className="relative py-0">
        <div className="relative h-[50vh] overflow-hidden">
          <img
            src={heroBanner}
            alt="الدولة العثمانية"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-8 left-0 right-0">
            <div className="container mx-auto px-4 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-amiri font-bold text-white drop-shadow-lg mb-4"
              >
                {empireOverview.subtitle}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/80"
              >
                رحلة عبر 600 عام من المجد والتاريخ
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            <div className="ottoman-card p-8 md:p-12">
              <div className="prose prose-invert max-w-none">
                {empireOverview.introduction.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/90 text-lg md:text-xl leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="ottoman-card p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-amiri font-bold text-gradient-gold">
                  {empireOverview.origin.title}
                </h2>
              </div>
              <div className="prose prose-invert max-w-none">
                {empireOverview.origin.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/90 text-lg leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Strengths */}
      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-12">
              <Star className="w-12 h-12 text-primary" />
              <h2 className="text-3xl md:text-5xl font-amiri font-bold text-gradient-gold">
                {empireOverview.strengths.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {empireOverview.strengths.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="ottoman-card p-8"
                >
                  <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center mb-6">
                    <Sparkles className="w-7 h-7 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{point.title}</h3>
                  <p className="text-muted-foreground text-lg">{point.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weaknesses */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-12">
              <AlertTriangle className="w-12 h-12 text-secondary" />
              <h2 className="text-3xl md:text-5xl font-amiri font-bold text-gradient-gold">
                {empireOverview.weaknesses.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {empireOverview.weaknesses.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="ottoman-card p-8"
                >
                  <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-7 h-7 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{point.title}</h3>
                  <p className="text-muted-foreground text-lg">{point.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="ottoman-card p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-amiri font-bold text-gradient-gold">
                  {empireOverview.mission.title}
                </h2>
              </div>
              <div className="prose prose-invert max-w-none">
                {empireOverview.mission.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/90 text-lg leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-amiri font-bold text-gradient-gold text-center mb-12">
              محطات تاريخية
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-lg">
              أهم الأحداث والمحطات التي شكلت تاريخ الدولة العثمانية عبر ستة قرون
            </p>
            
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {empireOverview.timeline.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.02 }}
                    className="ottoman-card p-4 flex items-start gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border-2 border-primary">
                      <span className="text-primary font-bold text-sm">{item.year}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground text-sm">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legacy */}
      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="ottoman-card p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-amiri font-bold text-gradient-gold mb-8 text-center">
                {empireOverview.legacy.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                {empireOverview.legacy.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/90 text-lg leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionNavigation currentPath="/" />
      <Footer />
    </div>
  );
};

export default OverviewPage;
