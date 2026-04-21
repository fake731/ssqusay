import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Undo2, Plus, Trash2, Search } from "lucide-react";

interface ContentRow {
  id: string;
  section_key: string;
  content: any;
  updated_at: string | null;
}

const ContentEditorTab = () => {
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [originals, setOriginals] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [newContent, setNewContent] = useState("");
  const { toast } = useToast();

  const load = useCallback(async () => {
    const { data } = await supabase.from("site_content").select("*").order("section_key");
    if (data) {
      setRows(data as ContentRow[]);
      const map: Record<string, string> = {};
      data.forEach((r: any) => { map[r.id] = JSON.stringify(r.content, null, 2); });
      setOriginals(map);
      setEditing(map);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveRow = async (row: ContentRow) => {
    setSaving(row.id);
    try {
      const parsed = JSON.parse(editing[row.id]);
      const { error } = await supabase
        .from("site_content")
        .update({ content: parsed, updated_at: new Date().toISOString() })
        .eq("id", row.id);
      if (error) throw error;
      toast({ title: "تم الحفظ", description: `${row.section_key} محدّث` });
      setOriginals((p) => ({ ...p, [row.id]: editing[row.id] }));
    } catch (e: any) {
      toast({ title: "خطأ", description: e?.message || "JSON غير صالح", variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  const undoRow = (id: string) => {
    setEditing((p) => ({ ...p, [id]: originals[id] }));
  };

  const addRow = async () => {
    if (!newKey.trim()) return;
    try {
      const parsed = newContent.trim() ? JSON.parse(newContent) : {};
      const { error } = await supabase.from("site_content").insert({
        section_key: newKey,
        content: parsed,
      });
      if (error) throw error;
      toast({ title: "تمت الإضافة" });
      setNewKey(""); setNewContent("");
      load();
    } catch (e: any) {
      toast({ title: "خطأ", description: e?.message, variant: "destructive" });
    }
  };

  const deleteRow = async (id: string) => {
    await supabase.from("site_content").delete().eq("id", id);
    load();
  };

  const filtered = rows.filter((r) => r.section_key.includes(filter));

  return (
    <div className="space-y-6">
      {/* Add new */}
      <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-6 space-y-3">
        <h3 className="font-amiri text-lg text-primary">إضافة محتوى جديد</h3>
        <Input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="مفتاح القسم (مثال: sultans.mehmed-ii)" className="font-iphone text-right rounded-xl bg-muted/30 border-primary/10" />
        <Textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder='المحتوى JSON (مثال: {"title":"..."})' className="font-mono text-xs text-left min-h-20 rounded-xl bg-muted/30 border-primary/10" dir="ltr" />
        <Button onClick={addRow} className="font-iphone gap-2 rounded-xl"><Plus className="w-4 h-4" />إضافة</Button>
      </div>

      {/* Filter */}
      <div className="relative">
        <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="فلتر حسب المفتاح..." className="pr-10 font-iphone text-right rounded-xl bg-muted/30 border-primary/10" />
      </div>

      {/* Rows */}
      {filtered.map((row) => {
        const changed = editing[row.id] !== originals[row.id];
        return (
          <div key={row.id} className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm text-primary">{row.section_key}</span>
              <div className="flex gap-2">
                {changed && (
                  <>
                    <Button size="sm" variant="ghost" onClick={() => undoRow(row.id)} className="rounded-xl gap-1"><Undo2 className="w-3.5 h-3.5" />تراجع</Button>
                    <Button size="sm" onClick={() => saveRow(row)} disabled={saving === row.id} className="rounded-xl gap-1"><Save className="w-3.5 h-3.5" />{saving === row.id ? "..." : "حفظ"}</Button>
                  </>
                )}
                <button onClick={() => deleteRow(row.id)} className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <Textarea
              value={editing[row.id] || ""}
              onChange={(e) => setEditing((p) => ({ ...p, [row.id]: e.target.value }))}
              className="font-mono text-xs text-left min-h-32 rounded-xl bg-muted/30 border-primary/10"
              dir="ltr"
            />
            {row.updated_at && <span className="text-[10px] text-muted-foreground font-iphone">آخر تعديل: {new Date(row.updated_at).toLocaleString("ar")}</span>}
          </div>
        );
      })}
      {filtered.length === 0 && <p className="text-center text-muted-foreground font-iphone py-8">لا يوجد محتوى بعد</p>}
    </div>
  );
};

export default ContentEditorTab;