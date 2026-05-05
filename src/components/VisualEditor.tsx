import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, X, Save, MousePointer2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

/**
 * Starter visual editor — opt-in via `?edit=1` URL param.
 *
 * Any element with `data-edit-key="some.key"` and `data-edit-text` becomes
 * editable in place. Edits are saved to `site_content` (key = data-edit-key)
 * and applied on next load by `useEditableText`.
 */
export const useEditableText = (key: string, fallback: string) => {
  const [text, setText] = useState(fallback);
  useEffect(() => {
    let cancelled = false;
    supabase
      .from("site_content")
      .select("content")
      .eq("section_key", `visual.${key}`)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        const c: any = data?.content;
        if (c && typeof c === "object" && typeof c.text === "string") {
          setText(c.text);
        } else if (typeof c === "string") {
          setText(c);
        }
      });
    return () => { cancelled = true; };
  }, [key]);
  return text;
};

const VisualEditor = () => {
  const [active, setActive] = useState(false);
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  // Activate when ?edit=1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") === "1") setActive(true);
  }, []);

  // Highlight + click handler
  useEffect(() => {
    if (!active) {
      document.body.classList.remove("ve-active");
      return;
    }
    document.body.classList.add("ve-active");
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-edit-key]");
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      setTarget(el);
      setDraft(el.innerText);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [active]);

  const save = async () => {
    if (!target) return;
    const key = target.getAttribute("data-edit-key");
    if (!key) return;
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .upsert(
        { section_key: `visual.${key}`, content: { text: draft }, updated_at: new Date().toISOString() },
        { onConflict: "section_key" }
      );
    setSaving(false);
    if (error) {
      toast({ title: "تعذّر الحفظ", description: error.message, variant: "destructive" });
      return;
    }
    target.innerText = draft;
    toast({ title: "تم الحفظ" });
    setTarget(null);
  };

  if (!active) return null;

  return (
    <>
      <style>{`
        body.ve-active [data-edit-key] {
          outline: 1px dashed hsl(43 74% 49% / 0.6);
          outline-offset: 4px;
          cursor: text;
          transition: outline-color 0.15s;
        }
        body.ve-active [data-edit-key]:hover {
          outline: 2px solid hsl(43 74% 49%);
          background: hsl(43 74% 49% / 0.05);
        }
      `}</style>

      {/* Floating status pill */}
      <div className="fixed bottom-5 right-5 z-[90] flex items-center gap-2 px-4 py-2 rounded-full glass-section font-iphone text-xs">
        <MousePointer2 className="w-3.5 h-3.5 text-primary" />
        <span>وضع التحرير المرئي مفعّل</span>
        <button
          onClick={() => setActive(false)}
          className="w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center hover:bg-muted/60"
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Inline editor */}
      <AnimatePresence>
        {target && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-20 z-[95] w-[min(560px,90vw)] glass-section rounded-2xl p-4 space-y-3"
            dir="rtl"
          >
            <div className="flex items-center gap-2">
              <Pencil className="w-4 h-4 text-primary" />
              <span className="font-iphone text-xs text-muted-foreground">
                {target.getAttribute("data-edit-key")}
              </span>
            </div>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              className="w-full min-h-[120px] rounded-xl p-3 bg-background/40 border border-primary/10 text-foreground text-sm font-iphone focus:outline-none focus:border-primary/40 resize-y"
              dir="rtl"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setTarget(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-iphone text-muted-foreground hover:bg-muted/40"
              >
                إلغاء
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="px-3 py-1.5 rounded-xl text-xs font-iphone bg-primary text-primary-foreground flex items-center gap-1 hover:opacity-90 disabled:opacity-50"
              >
                <Save className="w-3 h-3" /> {saving ? "..." : "حفظ"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VisualEditor;