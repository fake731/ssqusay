import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Crown, Sword, Shield, Users, Map, Building2, 
  Coins, Scale, BookOpen, Home, ChevronLeft
} from "lucide-react";

const navItems = [
  { icon: Home, label: "الرئيسية", href: "/" },
  { icon: BookOpen, label: "نبذة عامة", href: "/" },
  { icon: Crown, label: "السلاطين", href: "/sultans" },
  { icon: Sword, label: "المعارك", href: "/battles" },
  { icon: Shield, label: "الأسلحة", href: "/weapons" },
  { icon: Users, label: "الجنود", href: "/warriors" },
  { icon: Map, label: "الخرائط", href: "/maps" },
  { icon: Building2, label: "المعمار", href: "/architecture" },
  { icon: Coins, label: "التجارة", href: "/trade" },
  { icon: Scale, label: "الدين والقضاء", href: "/religion" },
];

interface SectionNavigationProps {
  currentPath: string;
}

const SectionNavigation = ({ currentPath }: SectionNavigationProps) => {
  const filteredItems = navItems.filter(item => item.href !== currentPath);

  return (
    <section className="py-16 bg-card border-t border-border">
      <div className="container mx-auto px-4">
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
                className="flex items-center gap-2 px-6 py-3 bg-muted/50 hover:bg-primary/20 rounded-xl transition-all group border border-border hover:border-primary/50"
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
