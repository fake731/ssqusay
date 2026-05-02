import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Crown, Sword, Shield, Users, Map, Building2, 
  Coins, Scale, BookOpen, Home, ChevronLeft
} from "lucide-react";

const navItems = [
  { icon: Home, label: "الرئيسية", href: "/" },
  { icon: Crown, label: "السلاطين", href: "/السلاطين" },
  { icon: Sword, label: "المعارك", href: "/المعارك" },
  { icon: Shield, label: "الأسلحة", href: "/الأسلحة" },
  { icon: Users, label: "الجنود", href: "/الجنود" },
  { icon: Map, label: "الخرائط", href: "/الخرائط" },
  { icon: Building2, label: "المعمار", href: "/المعمار" },
  { icon: Coins, label: "التجارة", href: "/التجارة" },
  { icon: Scale, label: "الدين والقضاء", href: "/الدين-والقضاء" },
  { icon: BookOpen, label: "الاستفسارات", href: "/استفسارات" },
];

interface SectionNavigationProps {
  currentPath: string;
}

const SectionNavigation = ({ currentPath }: SectionNavigationProps) => {
  const filteredItems = navItems.filter(item => item.href !== currentPath);

  return (
    <section className="py-20 bg-transparent">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-amiri font-bold text-gradient-gold mb-2">
            استكشف المزيد
          </h2>
          <p className="text-muted-foreground">
            تصفح أقسام أخرى من تاريخ الدولة العثمانية
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={item.href}
                className="flex items-center gap-2 px-6 py-3 glass-section rounded-2xl transition-all group hover:border-primary/40 hover:bg-white/[0.08]"
              >
                <item.icon className="w-5 h-5 text-primary" />
                <span className="text-foreground">{item.label}</span>
                <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionNavigation;
