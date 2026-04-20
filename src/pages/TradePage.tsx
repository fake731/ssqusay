import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";
import { tradeItems, economicEras, TradeItem } from "@/data/ottomanData";
import { getTradeImage } from "@/utils/tradeImages";

const TradePage = () => {
  const [selectedItem, setSelectedItem] = useState<TradeItem | null>(null);

  return (
    <div className="min-h-screen relative">
      <Navbar title="التجارة والاقتصاد" />

      {/* Economic Eras */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-amiri font-bold text-gradient-gold mb-4">
              العصور الاقتصادية
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              تطور الاقتصاد العثماني عبر أربعة عصور مختلفة
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {economicEras.map((era, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="ottoman-card p-6 text-center"
              >
                <div className="text-primary font-bold text-lg mb-2">{era.period}</div>
                <h3 className="text-xl font-bold text-foreground mb-3">{era.name}</h3>
                <p className="text-muted-foreground text-sm">{era.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Items with Images */}
      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tradeItems.map((item, index) => (
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
                    src={getTradeImage(item.id)}
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

      <SectionNavigation currentPath="/التجارة" />
      <Footer />
    </div>
  );
};

export default TradePage;
