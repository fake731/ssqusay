import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Notif {
  id: string;
  title: string;
  message: string;
  url: string | null;
  created_at: string | null;
}

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notif[]>([]);
  const [unread, setUnread] = useState(0);
  const navigate = useNavigate();

  const load = async () => {
    const { data } = await supabase
      .from("notifications")
      .select("id,title,message,url,created_at")
      .order("created_at", { ascending: false })
      .limit(20);
    if (data) {
      setItems(data as Notif[]);
      const seen = JSON.parse(localStorage.getItem("seen_notifs") || "[]");
      setUnread(data.filter((d) => !seen.includes(d.id)).length);
    }
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel("notif-bell")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        () => load()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleOpen = () => {
    setOpen((v) => !v);
    if (!open && items.length > 0) {
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

  return (
    <div className="fixed top-4 left-4 z-[60]">
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={handleOpen}
        className="relative w-11 h-11 rounded-2xl bg-card/40 backdrop-blur-2xl border border-primary/15 flex items-center justify-center text-foreground hover:bg-card/60 transition-all shadow-lg shadow-black/20"
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
            className="absolute top-14 left-0 w-[340px] max-w-[90vw] bg-card/60 backdrop-blur-2xl border border-primary/15 rounded-3xl shadow-2xl overflow-hidden"
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
