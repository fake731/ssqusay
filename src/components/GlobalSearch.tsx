import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Crown, Sword, Shield, Users, Map as MapIcon, Building2 } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { sultans, battles, weapons, warriors, ottomanMaps, architectures } from "@/data/ottomanData";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const GlobalSearch = ({ open, onOpenChange }: GlobalSearchProps) => {
  const navigate = useNavigate();

  const items = useMemo(() => {
    return [
      ...sultans.map((s) => ({
        id: `sultan-${s.id}`,
        label: s.nameAr,
        sub: s.title,
        icon: Crown,
        path: "/السلاطين",
      })),
      ...battles.map((b) => ({
        id: `battle-${b.id}`,
        label: b.name,
        sub: `${b.year}`,
        icon: Sword,
        path: "/المعارك",
      })),
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
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="ابحث عن سلطان، معركة، سلاح، خريطة..." />
      <CommandList>
        <CommandEmpty>لا توجد نتائج</CommandEmpty>
        <CommandGroup heading="السلاطين">
          {items.filter(i => i.id.startsWith("sultan")).map((item) => (
            <CommandItem key={item.id} onSelect={() => go(item.path)} value={`${item.label} ${item.sub}`}>
              <item.icon className="ml-2 h-4 w-4 text-primary" />
              <span>{item.label}</span>
              <span className="mr-auto text-xs text-muted-foreground">{item.sub}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="المعارك">
          {items.filter(i => i.id.startsWith("battle")).map((item) => (
            <CommandItem key={item.id} onSelect={() => go(item.path)} value={`${item.label} ${item.sub}`}>
              <item.icon className="ml-2 h-4 w-4 text-primary" />
              <span>{item.label}</span>
              <span className="mr-auto text-xs text-muted-foreground">{item.sub}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="الأسلحة">
          {items.filter(i => i.id.startsWith("weapon")).map((item) => (
            <CommandItem key={item.id} onSelect={() => go(item.path)} value={`${item.label} ${item.sub}`}>
              <item.icon className="ml-2 h-4 w-4 text-primary" />
              <span>{item.label}</span>
              <span className="mr-auto text-xs text-muted-foreground">{item.sub}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="الجنود">
          {items.filter(i => i.id.startsWith("warrior")).map((item) => (
            <CommandItem key={item.id} onSelect={() => go(item.path)} value={`${item.label} ${item.sub}`}>
              <item.icon className="ml-2 h-4 w-4 text-primary" />
              <span>{item.label}</span>
              <span className="mr-auto text-xs text-muted-foreground">{item.sub}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="الخرائط">
          {items.filter(i => i.id.startsWith("map")).map((item) => (
            <CommandItem key={item.id} onSelect={() => go(item.path)} value={`${item.label} ${item.sub}`}>
              <item.icon className="ml-2 h-4 w-4 text-primary" />
              <span>{item.label}</span>
              <span className="mr-auto text-xs text-muted-foreground">{item.sub}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="المعمار">
          {items.filter(i => i.id.startsWith("arch")).map((item) => (
            <CommandItem key={item.id} onSelect={() => go(item.path)} value={`${item.label} ${item.sub}`}>
              <item.icon className="ml-2 h-4 w-4 text-primary" />
              <span>{item.label}</span>
              <span className="mr-auto text-xs text-muted-foreground">{item.sub}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default GlobalSearch;
