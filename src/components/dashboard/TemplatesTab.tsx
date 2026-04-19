import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Copy, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Props {
  onApply: (t: { title: string; message: string; url: string }) => void;
}

const TemplatesTab = ({ onApply }: Props) => {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [url, setUrl] = useState("/");
  const { toast } = useToast();

  const load = async () => {
    const { data } = await supabase.from("notification_templates").select("*").order("created_at", { ascending: false });
    if (data) setList(data);
  };

  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!name || !title || !message) {
      toast({ title: "ناقص", description: "املأ كل الحقول", variant: "destructive" });
      return;
    }
    const { error } = await supabase.from("notification_templates").insert({ name, title, message, url });
    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "تم حفظ القالب" });
    setName(""); setTitle(""); setMessage(""); setUrl("/");
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("notification_templates").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          <h3 className="font-amiri text-lg text-primary">إنشاء قالب جديد</h3>
        </div>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="اسم القالب (مثال: إعلان عام)" className="font-iphone text-right rounded-xl bg-muted/30 border-primary/10" />
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="عنوان الإشعار" className="font-iphone text-right rounded-xl bg-muted/30 border-primary/10" />
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="نص الإشعار..." className="font-iphone text-right min-h-20 rounded-xl bg-muted/30 border-primary/10" />
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="الرابط (اختياري)" className="font-iphone text-right rounded-xl bg-muted/30 border-primary/10" />
        <Button onClick={create} className="font-iphone gap-2 rounded-xl bg-primary/90 hover:bg-primary">
          <Plus className="w-4 h-4" /> حفظ القالب
        </Button>
      </div>

      <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-primary" />
          <h3 className="font-amiri text-lg text-primary">القوالب المحفوظة</h3>
        </div>
        <div className="space-y-3">
          {list.length === 0 ? (
            <p className="text-sm text-muted-foreground font-iphone text-center py-8">ما في قوالب — أنشئ واحد فوق</p>
          ) : (
            list.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-muted/20 border border-primary/5 hover:border-primary/20 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-iphone">{t.name}</span>
                    </div>
                    <h4 className="font-iphone text-sm font-medium text-foreground">{t.title}</h4>
                    <p className="font-iphone text-xs text-muted-foreground mt-1">{t.message}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="icon" variant="ghost" onClick={() => onApply({ title: t.title, message: t.message, url: t.url || "/" })} className="w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary" title="استخدم هذا القالب">
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => remove(t.id)} className="w-8 h-8 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplatesTab;
