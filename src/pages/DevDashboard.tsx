import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Users, Bell, Globe, LogOut, Send,
  Eye, Trash2, BarChart3, Settings
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type TabType = "overview" | "visitors" | "notifications" | "settings";

const DevDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [user, setUser] = useState<any>(null);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [stats, setStats] = useState({ visitors: 0, today: 0, countries: 0 });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/دخول-المطور");
      return;
    }
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "developer");

    if (!roles || roles.length === 0) {
      navigate("/دخول-المطور");
      return;
    }
    setUser(user);
  };

  const loadData = async () => {
    const { data: v } = await supabase.from("visitor_data").select("*").order("visited_at", { ascending: false }).limit(100);
    if (v) {
      setVisitors(v);
      const today = new Date().toDateString();
      const todayCount = v.filter((x: any) => new Date(x.visited_at).toDateString() === today).length;
      const countries = new Set(v.map((x: any) => x.country).filter(Boolean)).size;
      setStats({ visitors: v.length, today: todayCount, countries });
    }

    const { data: n } = await supabase.from("notifications").select("*").order("created_at", { ascending: false });
    if (n) setNotifications(n);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/دخول-المطور");
  };

  const sendNotification = async () => {
    if (!notifTitle.trim() || !notifMessage.trim()) return;
    const { error } = await supabase.from("notifications").insert({
      title: notifTitle,
      message: notifMessage,
      type: "announcement",
      created_by: user?.id,
    });
    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "تم!", description: "تم إرسال الإشعار بنجاح" });
      setNotifTitle("");
      setNotifMessage("");
      loadData();
    }
  };

  const deleteNotification = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    loadData();
  };

  const tabs = [
    { id: "overview" as TabType, label: "نظرة عامة", icon: BarChart3 },
    { id: "visitors" as TabType, label: "الزوّار", icon: Globe },
    { id: "notifications" as TabType, label: "الإشعارات", icon: Bell },
    { id: "settings" as TabType, label: "الإعدادات", icon: Settings },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-amiri text-gradient-gold">لوحة تحكم المطوّر</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="font-iphone text-xs">
              الموقع الرئيسي
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-iphone text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "إجمالي الزوّار", value: stats.visitors, icon: Users, color: "text-primary" },
                { label: "زوّار اليوم", value: stats.today, icon: Eye, color: "text-ottoman-green" },
                { label: "دول مختلفة", value: stats.countries, icon: Globe, color: "text-ottoman-red" },
              ].map((stat) => (
                <div key={stat.label} className="ottoman-card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground font-iphone text-sm">{stat.label}</p>
                      <p className={`text-3xl font-amiri font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <stat.icon className={`w-10 h-10 ${stat.color} opacity-50`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="ottoman-card p-6">
              <h3 className="font-amiri text-lg text-primary mb-4">آخر الزوّار</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {visitors.slice(0, 10).map((v) => (
                  <div key={v.id} className="flex items-center justify-between py-2 border-b border-border/30 font-iphone text-sm">
                    <span className="text-muted-foreground">{v.country || "غير معروف"} - {v.city || ""}</span>
                    <span className="text-muted-foreground text-xs">{new Date(v.visited_at).toLocaleString("ar")}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Visitors Tab */}
        {activeTab === "visitors" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="ottoman-card p-6">
              <h3 className="font-amiri text-lg text-primary mb-4">سجل الزوّار</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-iphone">
                  <thead>
                    <tr className="border-b border-border/50 text-muted-foreground">
                      <th className="py-2 text-right">IP</th>
                      <th className="py-2 text-right">الدولة</th>
                      <th className="py-2 text-right">المدينة</th>
                      <th className="py-2 text-right">الموافقة</th>
                      <th className="py-2 text-right">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.map((v) => (
                      <tr key={v.id} className="border-b border-border/20 hover:bg-muted/30">
                        <td className="py-2 font-mono text-xs">{v.ip_address || "-"}</td>
                        <td className="py-2">{v.country || "-"}</td>
                        <td className="py-2">{v.city || "-"}</td>
                        <td className="py-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${v.consent_given ? "bg-ottoman-green/20 text-green-400" : "bg-ottoman-red/20 text-red-400"}`}>
                            {v.consent_given ? "نعم" : "لا"}
                          </span>
                        </td>
                        <td className="py-2 text-xs text-muted-foreground">{new Date(v.visited_at).toLocaleString("ar")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="ottoman-card p-6 space-y-4">
              <h3 className="font-amiri text-lg text-primary">إرسال إشعار جديد</h3>
              <Input
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                placeholder="عنوان الإشعار"
                className="font-iphone text-right"
              />
              <Textarea
                value={notifMessage}
                onChange={(e) => setNotifMessage(e.target.value)}
                placeholder="نص الإشعار..."
                className="font-iphone text-right min-h-24"
              />
              <Button onClick={sendNotification} className="font-iphone gap-2">
                <Send className="w-4 h-4" />
                إرسال الإشعار
              </Button>
            </div>

            <div className="ottoman-card p-6">
              <h3 className="font-amiri text-lg text-primary mb-4">الإشعارات السابقة</h3>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="font-iphone text-sm font-medium text-foreground">{n.title}</h4>
                      <p className="font-iphone text-xs text-muted-foreground mt-1">{n.message}</p>
                      <span className="font-iphone text-xs text-muted-foreground">{new Date(n.created_at).toLocaleString("ar")}</span>
                    </div>
                    <button onClick={() => deleteNotification(n.id)} className="text-destructive hover:text-destructive/80">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="ottoman-card p-6 space-y-4">
              <h3 className="font-amiri text-lg text-primary">إعدادات الموقع</h3>
              <p className="font-iphone text-sm text-muted-foreground">قريباً - إعدادات متقدمة للمحتوى والصور</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DevDashboard;
