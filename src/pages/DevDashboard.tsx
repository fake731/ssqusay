import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Users, Bell, Globe, LogOut, Send,
  Eye, Trash2, BarChart3, Settings, Calendar, Clock, Mail, FileText, TrendingUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import InquiriesTab from "@/components/dashboard/InquiriesTab";
import TemplatesTab from "@/components/dashboard/TemplatesTab";

type TabType = "overview" | "analytics" | "visitors" | "notifications" | "scheduled" | "templates" | "inquiries" | "settings";

const DevDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [user, setUser] = useState<any>(null);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [notifUrl, setNotifUrl] = useState("/");
  const [notifCountry, setNotifCountry] = useState("");
  const [sending, setSending] = useState(false);
  const [stats, setStats] = useState({ visitors: 0, today: 0, countries: 0, subscribers: 0 });
  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [scheduled, setScheduled] = useState<any[]>([]);
  const [schTitle, setSchTitle] = useState("");
  const [schMessage, setSchMessage] = useState("");
  const [schUrl, setSchUrl] = useState("/");
  const [schDate, setSchDate] = useState("");
  const [schTime, setSchTime] = useState("");
  const [schCountry, setSchCountry] = useState("");
  const [scheduling, setScheduling] = useState(false);
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
      const { count: subCount } = await supabase.from("push_subscriptions").select("*", { count: "exact", head: true });
      setStats({ visitors: v.length, today: todayCount, countries, subscribers: subCount || 0 });
    }

    // Available countries for geo-targeting (from push subscribers)
    const { data: subs } = await supabase.from("push_subscriptions").select("country");
    if (subs) {
      const set = new Set(subs.map((s: any) => s.country).filter(Boolean));
      setAvailableCountries(Array.from(set).sort());
    }

    const { data: n } = await supabase.from("notifications").select("*").order("created_at", { ascending: false });
    if (n) setNotifications(n);

    const { data: sc } = await supabase
      .from("scheduled_notifications")
      .select("*")
      .order("scheduled_for", { ascending: true });
    if (sc) setScheduled(sc);
  };

  const applyTemplate = (t: { title: string; message: string; url: string }) => {
    setNotifTitle(t.title);
    setNotifMessage(t.message);
    setNotifUrl(t.url || "/");
    setActiveTab("notifications");
    toast({ title: "تم تطبيق القالب", description: "راجع الحقول وأرسل" });
  };

  const scheduleNotification = async () => {
    if (!schTitle.trim() || !schMessage.trim() || !schDate || !schTime) {
      toast({ title: "ناقص", description: "املأ كل الحقول", variant: "destructive" });
      return;
    }
    setScheduling(true);
    try {
      const scheduledFor = new Date(`${schDate}T${schTime}`).toISOString();
      const { error } = await supabase.from("scheduled_notifications").insert({
        title: schTitle,
        message: schMessage,
        url: schUrl || "/",
        scheduled_for: scheduledFor,
        target_country: schCountry || null,
        created_by: user?.id,
      });
      if (error) throw error;
      const targetTxt = schCountry ? ` (لـ ${schCountry} فقط)` : "";
      toast({ title: "تمت الجدولة!", description: `راح ينرسل تلقائي بـ ${new Date(scheduledFor).toLocaleString("ar")}${targetTxt}` });
      setSchTitle(""); setSchMessage(""); setSchUrl("/"); setSchDate(""); setSchTime(""); setSchCountry("");
      loadData();
    } catch (err: any) {
      toast({ title: "خطأ", description: err?.message, variant: "destructive" });
    } finally {
      setScheduling(false);
    }
  };

  const deleteScheduled = async (id: string) => {
    await supabase.from("scheduled_notifications").delete().eq("id", id);
    loadData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/دخول-المطور");
  };

  const sendNotification = async () => {
    if (!notifTitle.trim() || !notifMessage.trim()) return;
    setSending(true);
    try {
      // Save to DB (history + bell)
      const { error: dbErr } = await supabase.from("notifications").insert({
        title: notifTitle,
        message: notifMessage,
        url: notifUrl || "/",
        type: "announcement",
        created_by: user?.id,
      });
      if (dbErr) throw dbErr;

      // Send real Web Push (optionally targeted by country)
      const { data, error } = await supabase.functions.invoke("send-push", {
        body: {
          title: notifTitle,
          message: notifMessage,
          url: notifUrl || "/",
          country: notifCountry || undefined,
        },
      });
      if (error) throw error;

      const targetTxt = notifCountry ? ` (مستهدف: ${notifCountry})` : "";
      toast({
        title: "تم الإرسال!",
        description: `وصل لـ ${data?.sent || 0} جهاز من أصل ${data?.total || 0}${targetTxt}`,
      });
      setNotifTitle("");
      setNotifMessage("");
      setNotifUrl("/");
      setNotifCountry("");
      loadData();
    } catch (err: any) {
      toast({ title: "خطأ", description: err?.message || "فشل الإرسال", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  const deleteNotification = async (id: string) => {
    await supabase.from("notifications").delete().eq("id", id);
    loadData();
  };

  const tabs = [
    { id: "overview" as TabType, label: "نظرة عامة", icon: BarChart3 },
    { id: "analytics" as TabType, label: "تحليلات", icon: TrendingUp },
    { id: "visitors" as TabType, label: "الزوّار", icon: Globe },
    { id: "notifications" as TabType, label: "الإشعارات", icon: Bell },
    { id: "scheduled" as TabType, label: "الجدولة", icon: Calendar },
    { id: "templates" as TabType, label: "القوالب", icon: FileText },
    { id: "inquiries" as TabType, label: "الاستفسارات", icon: Mail },
    { id: "settings" as TabType, label: "الإعدادات", icon: Settings },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header - Glassmorphism */}
      <div className="border-b border-primary/10 bg-card/30 backdrop-blur-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-xl font-amiri text-gradient-gold">لوحة تحكم المطوّر</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")} 
              className="font-iphone text-xs rounded-xl bg-muted/30 backdrop-blur-sm hover:bg-muted/50"
            >
              الموقع الرئيسي
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="rounded-xl bg-muted/30 backdrop-blur-sm hover:bg-destructive/20 hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs - Glassmorphism pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-iphone text-sm whitespace-nowrap transition-all duration-300 backdrop-blur-sm border ${
                activeTab === tab.id
                  ? "bg-primary/90 text-primary-foreground border-primary/50 shadow-lg shadow-primary/20"
                  : "bg-card/30 text-muted-foreground border-primary/10 hover:text-foreground hover:bg-card/50 hover:border-primary/20"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "إجمالي الزوّار", value: stats.visitors, icon: Users, color: "text-primary" },
                { label: "زوّار اليوم", value: stats.today, icon: Eye, color: "text-green-400" },
                { label: "دول مختلفة", value: stats.countries, icon: Globe, color: "text-red-400" },
                { label: "مشتركي الإشعارات", value: stats.subscribers, icon: Bell, color: "text-yellow-400" },
              ].map((stat) => (
                <div key={stat.label} className="relative bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 overflow-hidden group hover:border-primary/25 transition-all duration-300">
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all" />
                  <div className="flex items-center justify-between relative">
                    <div>
                      <p className="text-muted-foreground font-iphone text-sm">{stat.label}</p>
                      <p className={`text-3xl font-amiri font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 backdrop-blur-sm border border-primary/10 flex items-center justify-center">
                      <stat.icon className={`w-6 h-6 ${stat.color} opacity-60`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6">
              <h3 className="font-amiri text-lg text-primary mb-4">آخر الزوّار</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {visitors.slice(0, 10).map((v) => (
                  <div key={v.id} className="flex items-center justify-between py-2.5 border-b border-primary/5 font-iphone text-sm">
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6">
              <h3 className="font-amiri text-lg text-primary mb-4">سجل الزوّار</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-iphone">
                  <thead>
                    <tr className="border-b border-primary/10 text-muted-foreground">
                      <th className="py-3 text-right">IP</th>
                      <th className="py-3 text-right">الدولة</th>
                      <th className="py-3 text-right">المدينة</th>
                      <th className="py-3 text-right">الموافقة</th>
                      <th className="py-3 text-right">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visitors.map((v) => (
                      <tr key={v.id} className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                        <td className="py-2.5 font-mono text-xs">{v.ip_address || "-"}</td>
                        <td className="py-2.5">{v.country || "-"}</td>
                        <td className="py-2.5">{v.city || "-"}</td>
                        <td className="py-2.5">
                          <span className={`text-xs px-2.5 py-1 rounded-full backdrop-blur-sm ${v.consent_given ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                            {v.consent_given ? "نعم" : "لا"}
                          </span>
                        </td>
                        <td className="py-2.5 text-xs text-muted-foreground">{new Date(v.visited_at).toLocaleString("ar")}</td>
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-amiri text-lg text-primary">إرسال إشعار جديد</h3>
              <p className="text-xs text-muted-foreground font-iphone">
                الإشعار راح يوصل push حقيقي على جهاز كل زائر وافق على الإشعارات (حتى لو الموقع مسكّر) — حالياً عندك <span className="text-yellow-400 font-bold">{stats.subscribers}</span> مشترك
              </p>
              <Input
                value={notifTitle}
                onChange={(e) => setNotifTitle(e.target.value)}
                placeholder="عنوان الإشعار"
                className="font-iphone text-right rounded-xl bg-muted/30 backdrop-blur-sm border-primary/10 focus:border-primary/30"
              />
              <Textarea
                value={notifMessage}
                onChange={(e) => setNotifMessage(e.target.value)}
                placeholder="نص الإشعار..."
                className="font-iphone text-right min-h-24 rounded-xl bg-muted/30 backdrop-blur-sm border-primary/10 focus:border-primary/30"
              />
              <Input
                value={notifUrl}
                onChange={(e) => setNotifUrl(e.target.value)}
                placeholder="الرابط لما يضغط على الإشعار (مثال: /السلاطين)"
                className="font-iphone text-right rounded-xl bg-muted/30 backdrop-blur-sm border-primary/10 focus:border-primary/30"
              />
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-iphone">🌍 استهداف جغرافي (اختياري)</label>
                <select
                  value={notifCountry}
                  onChange={(e) => setNotifCountry(e.target.value)}
                  className="w-full font-iphone text-right rounded-xl bg-muted/30 border border-primary/10 px-3 py-2 text-sm text-foreground"
                >
                  <option value="">كل المشتركين ({stats.subscribers})</option>
                  {availableCountries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <Button
                onClick={sendNotification}
                disabled={sending}
                className="font-iphone gap-2 rounded-xl bg-primary/90 hover:bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {sending ? "جاري الإرسال..." : "إرسال الإشعار"}
              </Button>
            </div>

            <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6">
              <h3 className="font-amiri text-lg text-primary mb-4">الإشعارات السابقة</h3>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="flex items-start justify-between p-4 bg-muted/20 backdrop-blur-sm rounded-xl border border-primary/5 hover:border-primary/15 transition-all">
                    <div>
                      <h4 className="font-iphone text-sm font-medium text-foreground">{n.title}</h4>
                      <p className="font-iphone text-xs text-muted-foreground mt-1">{n.message}</p>
                      <span className="font-iphone text-xs text-muted-foreground">{new Date(n.created_at).toLocaleString("ar")}</span>
                    </div>
                    <button 
                      onClick={() => deleteNotification(n.id)} 
                      className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}


        {/* Scheduled Tab */}
        {activeTab === "scheduled" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-amiri text-lg text-primary">جدولة إشعار جديد</h3>
              </div>
              <p className="text-xs text-muted-foreground font-iphone">
                حدّد التاريخ والوقت، والإشعار راح ينرسل تلقائياً لكل المشتركين بنفس اللحظة (بيشتغل في الخلفية كل دقيقة).
              </p>
              <Input
                value={schTitle}
                onChange={(e) => setSchTitle(e.target.value)}
                placeholder="عنوان الإشعار"
                className="font-iphone text-right rounded-xl bg-muted/30 backdrop-blur-sm border-primary/10"
              />
              <Textarea
                value={schMessage}
                onChange={(e) => setSchMessage(e.target.value)}
                placeholder="نص الإشعار..."
                className="font-iphone text-right min-h-20 rounded-xl bg-muted/30 backdrop-blur-sm border-primary/10"
              />
              <Input
                value={schUrl}
                onChange={(e) => setSchUrl(e.target.value)}
                placeholder="الرابط (اختياري)"
                className="font-iphone text-right rounded-xl bg-muted/30 backdrop-blur-sm border-primary/10"
              />
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-iphone">🌍 استهداف جغرافي (اختياري)</label>
                <select
                  value={schCountry}
                  onChange={(e) => setSchCountry(e.target.value)}
                  className="w-full font-iphone text-right rounded-xl bg-muted/30 border border-primary/10 px-3 py-2 text-sm text-foreground"
                >
                  <option value="">كل المشتركين</option>
                  {availableCountries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-iphone">التاريخ</label>
                  <Input
                    type="date"
                    value={schDate}
                    onChange={(e) => setSchDate(e.target.value)}
                    className="font-iphone rounded-xl bg-muted/30 border-primary/10"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground font-iphone">الوقت</label>
                  <Input
                    type="time"
                    value={schTime}
                    onChange={(e) => setSchTime(e.target.value)}
                    className="font-iphone rounded-xl bg-muted/30 border-primary/10"
                  />
                </div>
              </div>
              <Button
                onClick={scheduleNotification}
                disabled={scheduling}
                className="font-iphone gap-2 rounded-xl bg-primary/90 hover:bg-primary disabled:opacity-50"
              >
                <Clock className="w-4 h-4" />
                {scheduling ? "جاري الجدولة..." : "جدولة الإشعار"}
              </Button>
            </div>

            <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6">
              <h3 className="font-amiri text-lg text-primary mb-4">الإشعارات المجدولة</h3>
              <div className="space-y-3">
                {scheduled.length === 0 ? (
                  <p className="text-sm text-muted-foreground font-iphone text-center py-6">ما في إشعارات مجدولة لسا</p>
                ) : (
                  scheduled.map((s) => (
                    <div key={s.id} className="flex items-start justify-between p-4 bg-muted/20 backdrop-blur-sm rounded-xl border border-primary/5">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-iphone text-sm font-medium text-foreground">{s.title}</h4>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-iphone ${
                            s.status === "sent" ? "bg-green-500/10 text-green-400" :
                            s.status === "sending" ? "bg-yellow-500/10 text-yellow-400" :
                            "bg-primary/10 text-primary"
                          }`}>
                            {s.status === "sent" ? "تم الإرسال" : s.status === "sending" ? "قيد الإرسال" : "في الانتظار"}
                          </span>
                        </div>
                        <p className="font-iphone text-xs text-muted-foreground mt-1">{s.message}</p>
                        <span className="font-iphone text-[10px] text-muted-foreground/80 mt-2 block flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {new Date(s.scheduled_for).toLocaleString("ar")}
                        </span>
                      </div>
                      {s.status === "pending" && (
                        <button
                          onClick={() => deleteScheduled(s.id)}
                          className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-amiri text-lg text-primary">معلومات الحساب</h3>
              <div className="space-y-3 font-iphone text-sm">
                <div className="flex justify-between py-2 border-b border-primary/5">
                  <span className="text-muted-foreground">البريد:</span>
                  <span className="text-foreground font-mono text-xs">{user?.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-primary/5">
                  <span className="text-muted-foreground">معرّف المستخدم:</span>
                  <span className="text-foreground font-mono text-xs">{user?.id?.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between py-2 border-b border-primary/5">
                  <span className="text-muted-foreground">الصلاحية:</span>
                  <span className="text-yellow-400 font-bold">مطوّر</span>
                </div>
              </div>
            </div>

            <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 space-y-4">
              <h3 className="font-amiri text-lg text-primary">إحصائيات النظام</h3>
              <div className="grid grid-cols-2 gap-4 font-iphone text-sm">
                <div className="p-4 rounded-xl bg-muted/20 border border-primary/5">
                  <p className="text-muted-foreground text-xs mb-1">المشتركين بالـ Push</p>
                  <p className="text-2xl font-bold text-yellow-400">{stats.subscribers}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/20 border border-primary/5">
                  <p className="text-muted-foreground text-xs mb-1">إجمالي الإشعارات</p>
                  <p className="text-2xl font-bold text-primary">{notifications.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 space-y-3">
              <h3 className="font-amiri text-lg text-primary">إجراءات سريعة</h3>
              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                className="w-full justify-start font-iphone rounded-xl bg-muted/20 hover:bg-muted/40"
              >
                زيارة الموقع
              </Button>
              <Button
                onClick={loadData}
                variant="ghost"
                className="w-full justify-start font-iphone rounded-xl bg-muted/20 hover:bg-muted/40"
              >
                تحديث البيانات
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DevDashboard;
