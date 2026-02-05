import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import { religionItems, religiousTimeline, ReligionItem } from "@/data/ottomanData";
import { getReligionImage } from "@/utils/religionImages";

const ReligionPage = () => {
  const [selectedItem, setSelectedItem] = useState<ReligionItem | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar title="الدين والقضاء" />

      {/* Timeline */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-amiri font-bold text-gradient-gold mb-4">
              محطات دينية وقضائية
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {religiousTimeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="ottoman-card px-6 py-4 text-center"
              >
                <div className="text-primary font-bold text-xl mb-1">{item.year}</div>
                <div className="text-foreground text-sm">{item.event}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Religion Items with Images */}
      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {religionItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="ottoman-card overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              >
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={getReligionImage(item.id)}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4">
                    <h3 className="text-2xl font-amiri font-bold text-white drop-shadow-lg">
                      {item.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  
                  <div className="flex items-center gap-2 text-primary text-sm">
                    <span>الفترة: {item.period}</span>
                  </div>

                  {selectedItem?.id === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-6 pt-6 border-t border-border"
                    >
                      <div className="prose prose-invert max-w-none mb-6">
                        {item.fullStory.split('\n\n').map((p, idx) => (
                          <p key={idx} className="text-foreground/90 mb-4">{p}</p>
                        ))}
                      </div>

                      <div className="bg-card/50 p-4 rounded-lg">
                        <h4 className="text-primary font-bold mb-3">حقائق مهمة:</h4>
                        <ul className="space-y-2">
                          {item.keyFacts.map((fact, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="text-foreground/90">{fact}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionNavigation currentPath="/religion" />
      <Footer />
    </div>
  );
};

export default ReligionPage;
