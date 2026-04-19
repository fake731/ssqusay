import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid, Legend,
} from "recharts";
import { TrendingUp, Globe2, FileText } from "lucide-react";

const COLORS = ["hsl(43 74% 49%)", "hsl(0 68% 42%)", "hsl(150 35% 35%)", "hsl(30 50% 45%)", "hsl(200 50% 45%)", "hsl(280 40% 50%)"];

const AnalyticsCharts = () => {
  const [byCountry, setByCountry] = useState<any[]>([]);
  const [byDay, setByDay] = useState<any[]>([]);
  const [topPages, setTopPages] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("page_views")
        .select("*")
        .order("viewed_at", { ascending: false })
        .limit(2000);
      if (!data) return;

      // By country
      const cMap: Record<string, number> = {};
      data.forEach((r: any) => {
        const k = r.country || "غير معروف";
        cMap[k] = (cMap[k] || 0) + 1;
      });
      setByCountry(
        Object.entries(cMap)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 8)
      );

      // By day (last 14)
      const dMap: Record<string, number> = {};
      const today = new Date();
      for (let i = 13; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const k = d.toISOString().slice(5, 10);
        dMap[k] = 0;
      }
      data.forEach((r: any) => {
        const k = new Date(r.viewed_at).toISOString().slice(5, 10);
        if (k in dMap) dMap[k]++;
      });
      setByDay(Object.entries(dMap).map(([date, views]) => ({ date, views })));

      // Top pages
      const pMap: Record<string, number> = {};
      data.forEach((r: any) => {
        const k = decodeURIComponent(r.path || "/");
        pMap[k] = (pMap[k] || 0) + 1;
      });
      setTopPages(
        Object.entries(pMap)
          .map(([path, views]) => ({ path: path.length > 24 ? path.slice(0, 24) + "…" : path, views }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 8)
      );
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-amiri text-lg text-primary">الزوّار آخر 14 يوم</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={byDay}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(43 20% 20%)" />
              <XAxis dataKey="date" stroke="hsl(43 15% 60%)" fontSize={11} />
              <YAxis stroke="hsl(43 15% 60%)" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(20 14% 8%)", border: "1px solid hsl(43 20% 20%)", borderRadius: 8 }} />
              <Line type="monotone" dataKey="views" stroke="hsl(43 74% 49%)" strokeWidth={2} dot={{ fill: "hsl(43 74% 49%)" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe2 className="w-5 h-5 text-primary" />
            <h3 className="font-amiri text-lg text-primary">الزوّار حسب البلد</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={byCountry} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(e: any) => e.name}>
                {byCountry.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(20 14% 8%)", border: "1px solid hsl(43 20% 20%)", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="font-amiri text-lg text-primary">الصفحات الأكثر زيارة</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topPages} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(43 20% 20%)" />
            <XAxis type="number" stroke="hsl(43 15% 60%)" fontSize={11} />
            <YAxis dataKey="path" type="category" width={180} stroke="hsl(43 15% 60%)" fontSize={11} />
            <Tooltip contentStyle={{ background: "hsl(20 14% 8%)", border: "1px solid hsl(43 20% 20%)", borderRadius: 8 }} />
            <Bar dataKey="views" fill="hsl(43 74% 49%)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
