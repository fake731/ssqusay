import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Undo2, Plus, Trash2, Search, Crown, Sword, FileText } from "lucide-react";

interface ContentRow {
  id: string;
  section_key: string;
  content: any;
  updated_at: string | null;
}

type FieldDraft = { key: string; value: string };

const TEMPLATES: Record<string, FieldDraft[]> = {
  sultan: [
    { key: "name", value: "" },
    { key: "reign", value: "" },
    { key: "title", value: "" },
    { key: "description", value: "" },
  ],
  battle: [
    { key: "name", value: "" },
    { key: "year", value: "" },
    { key: "location", value: "" },
    { key: "result", value: "" },
    { key: "description", value: "" },
  ],
  text: [{ key: "text", value: "" }],
};

// Convert any JSON value into editable list of fields
const jsonToFields = (content: any): FieldDraft[] => {
  if (content === null || content === undefined) return [{ key: "text", value: "" }];
  if (typeof content === "string") return [{ key: "text", value: content }];
  if (typeof content !== "object") return [{ key: "value", value: String(content) }];
  return Object.entries(content).map(([k, v]) => ({
    key: k,
    value: typeof v === "object" ? JSON.stringify(v, null, 2) : String(v ?? ""),
  }));
};

const fieldsToJson = (fields: FieldDraft[]): any => {
  const obj: Record<string, any> = {};
  for (const f of fields) {
    if (!f.key.trim()) continue;
    // Try to keep nested JSON if user typed valid JSON, otherwise store as plain string
    const trimmed = f.value.trim();
    if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
      try {
        obj[f.key] = JSON.parse(trimmed);
        continue;
      } catch {
        // fall through
      }
    }
    obj[f.key] = f.value;
  }
  return obj;
};

const ContentEditorTab = () => {
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [filter, setFilter] = useState("");
  const [drafts, setDrafts] = useState<Record<string, FieldDraft[]>>({});
  const [originals, setOriginals] = useState<Record<string, FieldDraft[]>>({});
  const [history, setHistory] = useState<Record<string, FieldDraft[][]>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [newKind, setNewKind] = useState<"sultan" | "battle" | "text">("text");
  const { toast } = useToast();

  const load = useCallback(async () => {
    const { data, error } = await supabase.from("site_content").select("*").order("section_key");
    if (error) {
      toast({ title: "تعذّر تحميل المحتوى", description: error.message, variant: "destructive" });
      return;
    }
    if (data) {
      const list = data as ContentRow[];
      setRows(list);
      const map: Record<string, FieldDraft[]> = {};
      list.forEach((r) => { map[r.id] = jsonToFields(r.content); });
      setOriginals(map);
      setDrafts(JSON.parse(JSON.stringify(map)));
      setHistory({});
    }
  }, [toast]);

  useEffect(() => { load(); }, [load]);

  const isDirty = (id: string) =>
    JSON.stringify(drafts[id] || []) !== JSON.stringify(originals[id] || []);

  const updateField = (id: string, idx: number, patch: Partial<FieldDraft>) => {
    setDrafts((p) => {
      const list = [...(p[id] || [])];
      list[idx] = { ...list[idx], ...patch };
      return { ...p, [id]: list };
    });
  };

  const addField = (id: string) => {
    setDrafts((p) => ({ ...p, [id]: [...(p[id] || []), { key: "", value: "" }] }));
  };

  const removeField = (id: string, idx: number) => {
    setDrafts((p) => ({ ...p, [id]: (p[id] || []).filter((_, i) => i !== idx) }));
  };

  const saveRow = async (row: ContentRow) => {
    setSaving(row.id);
    try {
      const json = fieldsToJson(drafts[row.id] || []);
      const { error } = await supabase
        .from("site_content")
        .update({ content: json, updated_at: new Date().toISOString() })
        .eq("id", row.id);
      if (error) throw error;
      setHistory((p) => ({
        ...p,
        [row.id]: [originals[row.id], ...(p[row.id] || [])].slice(0, 10),
      }));
      setOriginals((p) => ({ ...p, [row.id]: JSON.parse(JSON.stringify(drafts[row.id])) }));
      toast({ title: "تم الحفظ", description: row.section_key });
    } catch (e: any) {
      toast({ title: "خطأ في الحفظ", description: e?.message, variant: "destructive" });
    } finally {
      setSaving(null);
    }
  };

  const undoRow = (id: string) => {
    if (isDirty(id)) {
      setDrafts((p) => ({ ...p, [id]: JSON.parse(JSON.stringify(originals[id])) }));
      return;
    }
    const stack = history[id] || [];
    if (stack.length === 0) return;
    const [prev, ...rest] = stack;
    const json = fieldsToJson(prev);
    supabase
      .from("site_content")
      .update({ content: json, updated_at: new Date().toISOString() })
      .eq("id", id)
      .then(() => {
        setOriginals((p) => ({ ...p, [id]: prev }));
        setDrafts((p) => ({ ...p, [id]: JSON.parse(JSON.stringify(prev)) }));
        setHistory((p) => ({ ...p, [id]: rest }));
        toast({ title: "تم التراجع" });
      });
  };

  const addRow = async () => {
    if (!newKey.trim()) {
      toast({ title: "أضف اسم القسم أولاً", variant: "destructive" });
      return;
    }
    const json = fieldsToJson(TEMPLATES[newKind]);
    const { error } = await supabase.from("site_content").insert({ section_key: newKey, content: json });
    if (error) {
      toast({ title: "خطأ", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "تمت الإضافة" });
    setNewKey("");
    load();
  };

  const deleteRow = async (id: string, key: string) => {
    if (!confirm(`حذف ${key}؟`)) return;
    await supabase.from("site_content").delete().eq("id", id);
    load();
  };

  const filtered = useMemo(
    () => rows.filter((r) => r.section_key.toLowerCase().includes(filter.toLowerCase())),
    [rows, filter],
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Quick add */}
      <div className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-5 space-y-3">
        <h3 className="font-amiri text-lg text-primary flex items-center gap-2">
          <Plus className="w-4 h-4" /> إضافة قسم جديد
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setNewKind("sultan")}
            className={`px-3 py-2 rounded-xl text-xs font-iphone flex items-center gap-1 transition-colors ${newKind === "sultan" ? "bg-primary text-primary-foreground" : "bg-muted/40 text-foreground hover:bg-muted/60"}`}
          >
            <Crown className="w-3.5 h-3.5" /> قالب سلطان
          </button>
          <button
            onClick={() => setNewKind("battle")}
            className={`px-3 py-2 rounded-xl text-xs font-iphone flex items-center gap-1 transition-colors ${newKind === "battle" ? "bg-primary text-primary-foreground" : "bg-muted/40 text-foreground hover:bg-muted/60"}`}
          >
            <Sword className="w-3.5 h-3.5" /> قالب معركة
          </button>
          <button
            onClick={() => setNewKind("text")}
            className={`px-3 py-2 rounded-xl text-xs font-iphone flex items-center gap-1 transition-colors ${newKind === "text" ? "bg-primary text-primary-foreground" : "bg-muted/40 text-foreground hover:bg-muted/60"}`}
          >
            <FileText className="w-3.5 h-3.5" /> نص حر
          </button>
        </div>
        <div className="flex gap-2">
          <Input
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="اسم القسم (مثال: sultans.mehmed-ii)"
            className="font-iphone text-right rounded-xl bg-muted/30 border-primary/10"
          />
          <Button onClick={addRow} className="font-iphone gap-1 rounded-xl">
            <Plus className="w-4 h-4" /> إضافة
          </Button>
        </div>
      </div>

      {/* Filter */}
      <div className="relative">
        <Search className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
        <Input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="ابحث عن قسم..."
          className="pr-10 font-iphone text-right rounded-xl bg-muted/30 border-primary/10"
        />
      </div>

      {/* Cards */}
      {filtered.map((row) => {
        const dirty = isDirty(row.id);
        const histLen = (history[row.id] || []).length;
        const fields = drafts[row.id] || [];
        return (
          <div key={row.id} className="bg-card/30 backdrop-blur-xl border border-primary/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="font-mono text-sm text-primary truncate">{row.section_key}</span>
              <div className="flex gap-2">
                {dirty && (
                  <Button size="sm" onClick={() => saveRow(row)} disabled={saving === row.id} className="rounded-xl gap-1">
                    <Save className="w-3.5 h-3.5" />
                    {saving === row.id ? "..." : "حفظ"}
                  </Button>
                )}
                {(dirty || histLen > 0) && (
                  <Button size="sm" variant="ghost" onClick={() => undoRow(row.id)} className="rounded-xl gap-1">
                    <Undo2 className="w-3.5 h-3.5" />
                    تراجع{histLen > 0 ? ` (${histLen})` : ""}
                  </Button>
                )}
                <button
                  onClick={() => deleteRow(row.id, row.section_key)}
                  className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {fields.map((f, idx) => {
                const isLong = f.value.length > 60 || f.value.includes("\n");
                return (
                  <div key={idx} className="grid grid-cols-12 gap-2 items-start">
                    <Input
                      value={f.key}
                      onChange={(e) => updateField(row.id, idx, { key: e.target.value })}
                      placeholder="الحقل"
                      className="col-span-3 font-iphone text-right rounded-xl bg-muted/20 border-primary/10 text-xs"
                    />
                    {isLong ? (
                      <Textarea
                        value={f.value}
                        onChange={(e) => updateField(row.id, idx, { value: e.target.value })}
                        placeholder="القيمة"
                        className="col-span-8 font-iphone text-right rounded-xl bg-muted/20 border-primary/10 text-sm min-h-20"
                      />
                    ) : (
                      <Input
                        value={f.value}
                        onChange={(e) => updateField(row.id, idx, { value: e.target.value })}
                        placeholder="القيمة"
                        className="col-span-8 font-iphone text-right rounded-xl bg-muted/20 border-primary/10 text-sm"
                      />
                    )}
                    <button
                      onClick={() => removeField(row.id, idx)}
                      className="col-span-1 h-9 rounded-lg bg-destructive/10 flex items-center justify-center text-destructive hover:bg-destructive/20"
                      title="حذف الحقل"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => addField(row.id)}
                className="font-iphone gap-1 rounded-xl text-xs"
              >
                <Plus className="w-3 h-3" /> إضافة حقل
              </Button>
            </div>

            {row.updated_at && (
              <span className="text-[10px] text-muted-foreground font-iphone">
                آخر تعديل: {new Date(row.updated_at).toLocaleString("ar")}
              </span>
            )}
          </div>
        );
      })}

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground font-iphone py-8">لا يوجد محتوى — أضف قسماً جديداً من الأعلى</p>
      )}
    </div>
  );
};

export default ContentEditorTab;