import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Crown, Sword, Shield, Users, Map, Building2, 
  Coins, Scale, BookOpen, Home, Menu, X, Search
} from "lucide-react";
import { useState } from "react";
import GlobalSearch from "./GlobalSearch";

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
];

interface NavbarProps {
  title?: string;
}

const Navbar = ({ title }: NavbarProps) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <Crown className="w-8 h-8 text-primary" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                    location.pathname === item.href
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Search + Mobile Menu Button */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden bg-card border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 grid grid-cols-3 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors text-center ${
                    location.pathname === item.href
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Page Header with title */}
      {title && (
        <div className="pt-16">
          <div className="bg-gradient-to-b from-card to-background py-12 border-b border-border">
            <div className="container mx-auto px-4 text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-amiri font-bold text-gradient-gold"
              >
                {title}
              </motion.h1>
            </div>
          </div>
        </div>
      )}
      
      {/* Spacer when no title */}
      {!title && <div className="pt-16" />}
      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};

export default Navbar;
