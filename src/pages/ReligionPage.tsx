import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, BookOpen, Gavel, GraduationCap, Users, Star, Scroll, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { religionItems, religiousTimeline, ReligionItem } from "@/data/ottomanData";

const categoryIcons: Record<string, any> = {
  institution: Star,
  scholar: BookOpen,
  law: Gavel,
  education: GraduationCap,
};

const categoryColors: Record<string, string> = {
  institution: "from-indigo-500 to-indigo-700",
  scholar: "from-amber-500 to-amber-700",
  law: "from-red-500 to-red-700",
  education: "from-green-500 to-green-700",
};

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

      {/* Religion Items */}
      <section className="py-16 bg-gradient-epic">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {religionItems.map((item, index) => {
              const IconComponent = categoryIcons[item.category] || Scale;
              const colorClass = categoryColors[item.category] || "from-primary to-primary/70";
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="ottoman-card overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform"
                  onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-amiri font-bold text-gradient-gold mb-2">
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
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

                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="bg-muted/50 px-4 py-2 rounded-lg">
                            <span className="text-primary font-bold">الفترة: </span>
                            <span className="text-foreground">{item.period}</span>
                          </div>
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
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReligionPage;
