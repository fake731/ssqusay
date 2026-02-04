import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Target, AlertTriangle, Star, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { empireOverview } from "@/data/ottomanData";

const OverviewPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar title="نبذة عامة عن الدولة العثمانية" />

      {/* Introduction */}
      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="ottoman-card p-8 md:p-12">
              <h2 className="text-3xl font-amiri font-bold text-gradient-gold mb-6 text-center">
                {empireOverview.subtitle}
              </h2>
              <div className="prose prose-invert max-w-none">
                {empireOverview.introduction.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/90 text-lg leading-relaxed mb-4">
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
            className="max-w-4xl mx-auto"
          >
            <div className="ottoman-card p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-3xl font-amiri font-bold text-gradient-gold">
                  {empireOverview.origin.title}
                </h2>
              </div>
              <div className="prose prose-invert max-w-none">
                {empireOverview.origin.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/90 text-lg leading-relaxed mb-4">
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
              <Star className="w-10 h-10 text-primary" />
              <h2 className="text-3xl md:text-4xl font-amiri font-bold text-gradient-gold">
                {empireOverview.strengths.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {empireOverview.strengths.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="ottoman-card p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
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
              <AlertTriangle className="w-10 h-10 text-secondary" />
              <h2 className="text-3xl md:text-4xl font-amiri font-bold text-gradient-gold">
                {empireOverview.weaknesses.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {empireOverview.weaknesses.points.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="ottoman-card p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
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
            className="max-w-4xl mx-auto"
          >
            <div className="ottoman-card p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-3xl font-amiri font-bold text-gradient-gold">
                  {empireOverview.mission.title}
                </h2>
              </div>
              <div className="prose prose-invert max-w-none">
                {empireOverview.mission.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/90 text-lg leading-relaxed mb-4">
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
            <h2 className="text-3xl md:text-4xl font-amiri font-bold text-gradient-gold text-center mb-12">
              محطات تاريخية
            </h2>
            
            <div className="max-w-3xl mx-auto">
              {empireOverview.timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6 mb-6"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
                      <span className="text-primary font-bold">{item.year}</span>
                    </div>
                    {idx < empireOverview.timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-primary/30 mt-2" />
                    )}
                  </div>
                  <div className="ottoman-card p-4 flex-1">
                    <p className="text-foreground">{item.event}</p>
                  </div>
                </motion.div>
              ))}
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
            className="max-w-4xl mx-auto"
          >
            <div className="ottoman-card p-8 md:p-12">
              <h2 className="text-3xl font-amiri font-bold text-gradient-gold mb-6 text-center">
                {empireOverview.legacy.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                {empireOverview.legacy.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-foreground/90 text-lg leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OverviewPage;
