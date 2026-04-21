import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Crown, Sword, Shield, Users, Map as MapIcon, Building2, Clock } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { sultans, battles, weapons, warriors, ottomanMaps, architectures } from "@/data/ottomanData";
import { getSultanImage } from "@/utils/sultanImages";
import { getBattleImage } from "@/utils/battleImages";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GlobalSearch = ({ open, onOpenChange }: GlobalSearchProps) => {
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("recent-searches") || "[]"); } catch { return []; }
  });

  const items = useMemo(() => {
    return [
      ...sultans.map((s) => ({
        id: `sultan-${s.id}`,
        label: s.nameAr,
        sub: s.title || s.reign,
        icon: Crown,
        path: "/السلاطين",
        img: getSultanImage(s.id),
      })),
      ...battles.map((b) => ({
        id: `battle-${b.id}`,
        label: b.name,
        sub: `${String(b.year)} - ${b.location || ""}`,
        icon: Sword,
        path: "/المعارك",
        img: getBattleImage(b.id),
      } as any)),
      ...weapons.map((w) => ({
        id: `weapon-${w.id}`,
        label: w.name,
        sub: w.type || "سلاح",
        icon: Shield,
        path: "/الأسلحة",
      })),
      ...warriors.map((w) => ({
        id: `warrior-${w.id}`,
        label: w.name,
        sub: w.role || "محارب",
        icon: Users,
        path: "/الجنود",
      })),
      ...ottomanMaps.map((m) => ({
        id: `map-${m.id}`,
        label: m.title,
        sub: `${m.year}`,
        icon: MapIcon,
        path: "/الخرائط",
      })),
      ...architectures.map((a) => ({
        id: `arch-${a.id}`,
        label: a.name,
        sub: a.location || "معمار",
        icon: Building2,
        path: "/المعمار",
      })),
    ];
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const go = (path: string) => {
    onOpenChange(false);
    setRecentSearches((prev) => {
      const next = [path, ...prev.filter((p) => p !== path)].slice(0, 5);
      localStorage.setItem("recent-searches", JSON.stringify(next));
      return next;
    });
    navigate(path);
  };

  const renderItem = (item: typeof items[0]) => (
    <CommandItem key={item.id} onSelect={() => go(item.path)} value={`${item.label} ${item.sub}`}>
      {'img' in item && (item as any).img ? (
        <img src={(item as any).img} alt="" className="w-8 h-8 rounded-lg object-cover ml-2 flex-shrink-0" />
      ) : (
        <item.icon className="ml-2 h-4 w-4 text-primary flex-shrink-0" />
      )}
      <div className="flex flex-col min-w-0">
        <span className="truncate">{item.label}</span>
        <span className="text-[10px] text-muted-foreground truncate">{item.sub}</span>
      </div>
    </CommandItem>
  );

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="ابحث عن سلطان، معركة، سلاح، خريطة..." />
      <CommandList>
        <CommandEmpty>لا توجد نتائج</CommandEmpty>
        {recentSearches.length > 0 && (
          <CommandGroup heading="بحث سابق">
            {recentSearches.map((path, i) => (
              <CommandItem key={`recent-${i}`} onSelect={() => go(path)} value={`recent ${path}`}>
                <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{path}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        <CommandSeparator />
        <CommandGroup heading="السلاطين">
          {items.filter(i => i.id.startsWith("sultan")).map(renderItem)}
        </CommandGroup>
        <CommandGroup heading="المعارك">
          {items.filter(i => i.id.startsWith("battle")).map(renderItem)}
        </CommandGroup>
        <CommandGroup heading="الأسلحة">
          {items.filter(i => i.id.startsWith("weapon")).map(renderItem)}
        </CommandGroup>
        <CommandGroup heading="الجنود">
          {items.filter(i => i.id.startsWith("warrior")).map(renderItem)}
        </CommandGroup>
        <CommandGroup heading="الخرائط">
          {items.filter(i => i.id.startsWith("map")).map(renderItem)}
        </CommandGroup>
        <CommandGroup heading="المعمار">
          {items.filter(i => i.id.startsWith("arch")).map(renderItem)}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default GlobalSearch;
