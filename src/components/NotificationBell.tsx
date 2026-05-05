import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface Notif {
  id: string;
  title: string;
  message: string;
  url: string | null;
  created_at: string | null;
}

/** Plays a short Ottoman-flavored chime using WebAudio (no asset file needed). */
const playOttomanChime = () => {
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
    if (!Ctx) return;
    const ctx = new Ctx();
    const now = ctx.currentTime;
    // Two-note hijaz-flavored ding (D5 → A5)
    const notes = [
      { f: 587.33, t: 0.0,  d: 0.55 },
      { f: 880.0,  t: 0.12, d: 0.7  },
    ];
    notes.forEach(({ f, t, d }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0.0001, now + t);
      gain.gain.exponentialRampToValueAtTime(0.22, now + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + d + 0.05);
    });
    setTimeout(() => ctx.close(), 1200);
  } catch {
    /* ignore audio errors */
  }
};

const NotificationBell = ({ inline = false }: { inline?: boolean }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notif[]>([]);
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();
  const initialized = useRef(false);
  const knownIds = useRef<Set<string>>(new Set());

  const computeUnread = (list: Notif[]) => {
    let seen: string[] = [];
    try {
      seen = JSON.parse(localStorage.getItem("seen_notifs") || "[]");
      if (!Array.isArray(seen)) seen = [];
    } catch {
      seen = [];
    }
    return list.filter((d) => !seen.includes(d.id)).length;
  };

  const load = async (notifyNew = false) => {
    const { data, error } = await supabase
      .from("notifications")
      .select("id,title,message,url,created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) {
      console.error("[NotificationBell] load failed", error);
      return;
    }
    if (data) {
      const list = data as Notif[];
      // Detect new notifications since last load
      if (notifyNew && initialized.current) {
        const fresh = list.filter((n) => !knownIds.current.has(n.id));
        if (fresh.length > 0) {
          playOttomanChime();
          fresh.slice(0, 1).forEach((n) => {
            toast({ title: n.title, description: n.message });
            // Browser/system notification (works on supported devices)
            if ("Notification" in window && Notification.permission === "granted") {
              try {
                new Notification(n.title, { body: n.message, icon: "/favicon.ico" });
              } catch {}
            }
          });
        }
      }
      list.forEach((n) => knownIds.current.add(n.id));
      initialized.current = true;
      setItems(list);
      setUnread(computeUnread(list));
    }
  };

  useEffect(() => {
    load(false);
    // Ask permission once for system notifications
    if ("Notification" in window && Notification.permission === "default") {
      try { Notification.requestPermission(); } catch {}
    }
    const channel = supabase
      .channel("notif-bell")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        () => load(true),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleOpen = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen && items.length > 0) {
      localStorage.setItem("seen_notifs", JSON.stringify(items.map((i) => i.id)));
      setUnread(0);
    }
  };

  const handleClick = (n: Notif) => {
    setOpen(false);
    if (n.url && n.url !== "/") {
      if (n.url.startsWith("http")) window.open(n.url, "_blank");
      else navigate(n.url);
    }
  };

  const buttonClass = inline
    ? "relative p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
    : "relative w-11 h-11 rounded-2xl glass-section flex items-center justify-center text-foreground hover:border-primary/40 transition-all";

  return (
    <div className={inline ? "relative" : "fixed top-4 left-4 z-[60]"}>
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={handleOpen}
        className={buttonClass}
        aria-label="الإشعارات"
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center border-2 border-background">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`absolute ${inline ? "top-12 left-0" : "top-14 left-0"} w-[340px] max-w-[90vw] bg-card/60 backdrop-blur-2xl border border-primary/15 rounded-3xl shadow-2xl overflow-hidden z-[80]`}
            dir="rtl"
          >
            <div className="flex items-center justify-between p-4 border-b border-primary/10">
              <h3 className="font-amiri text-base text-foreground">الإشعارات</h3>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted/60 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {items.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="font-iphone text-xs text-muted-foreground">ما في إشعارات لسا</p>
                </div>
              ) : (
                items.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleClick(n)}
                    className="w-full text-right p-4 border-b border-primary/5 hover:bg-primary/5 transition-colors block"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-iphone text-sm font-medium text-foreground flex-1">{n.title}</h4>
                      {n.url && n.url !== "/" && <ExternalLink className="w-3 h-3 text-muted-foreground mt-1" />}
                    </div>
                    <p className="font-iphone text-xs text-muted-foreground mt-1 leading-relaxed">{n.message}</p>
                    <span className="font-iphone text-[10px] text-muted-foreground/70 mt-1 block">
                      {n.created_at ? new Date(n.created_at).toLocaleString("ar") : ""}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
