import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Trash2, Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const InquiriesTab = () => {
  const [list, setList] = useState<any[]>([]);
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    if (data) setList(data);
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: string) => {
    await supabase.from("inquiries").update({ is_read: true }).eq("id", id);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("inquiries").delete().eq("id", id);
    toast({ title: "تم الحذف" });
    load();
  };

  const unread = list.filter((x) => !x.is_read).length;

  return (
    <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          <h3 className="font-amiri text-lg text-primary">الاستفسارات الواردة</h3>
        </div>
        {unread > 0 && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-destructive/15 text-destructive font-iphone">
            {unread} جديد
          </span>
        )}
      </div>
      <div className="space-y-3">
        {list.length === 0 ? (
          <p className="text-sm text-muted-foreground font-iphone text-center py-8">ما في استفسارات لسا</p>
        ) : (
          list.map((it) => (
            <div
              key={it.id}
              className={`p-4 rounded-xl border transition-all ${
                it.is_read
                  ? "bg-muted/10 border-primary/5"
                  : "bg-primary/5 border-primary/20"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-iphone text-sm font-medium text-foreground">{it.name}</h4>
                    {!it.is_read && <span className="w-2 h-2 rounded-full bg-primary" />}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-iphone flex-wrap">
                    <a href={`mailto:${it.email}`} className="hover:text-primary">{it.email}</a>
                    {it.phone && (
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />{it.phone}
                      </span>
                    )}
                  </div>
                  <p className="font-iphone text-sm text-foreground/90 whitespace-pre-wrap">{it.message}</p>
                  <span className="text-[10px] text-muted-foreground font-iphone block">
                    {new Date(it.created_at).toLocaleString("ar")}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {!it.is_read && (
                    <Button size="icon" variant="ghost" onClick={() => markRead(it.id)} className="w-8 h-8 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400">
                      <Check className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  <Button size="icon" variant="ghost" onClick={() => remove(it.id)} className="w-8 h-8 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InquiriesTab;
