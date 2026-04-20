import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionNavigation from "@/components/SectionNavigation";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "الاسم قصير جداً").max(100),
  email: z.string().trim().email("بريد إلكتروني غير صالح").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(10, "الرسالة قصيرة جداً").max(2000),
});

const InquiriesPage = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = inquirySchema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "خطأ في البيانات",
        description: parsed.error.issues[0]?.message || "تحقق من الحقول",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("inquiries").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "فشل الإرسال", description: error.message, variant: "destructive" });
      return;
    }
    setSuccess(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen relative">
      <Navbar title="الاستفسارات والتواصل" />

      <section className="py-12 bg-gradient-epic">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <p className="text-muted-foreground font-iphone">
              هل لديك سؤال أو استفسار؟ اكتب لنا وسنرد عليك في أقرب وقت
            </p>
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm text-foreground font-iphone">
                تم إرسال استفسارك بنجاح! سنرد عليك قريباً.
              </p>
            </motion.div>
          )}

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={onSubmit}
            className="bg-card/60 backdrop-blur-md border border-border rounded-3xl p-6 md:p-8 space-y-5"
          >
            <Field
              icon={User}
              label="الاسم *"
              placeholder="أدخل اسمك الكامل"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
            />
            <Field
              icon={Mail}
              label="البريد الإلكتروني *"
              type="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
            />
            <Field
              icon={Phone}
              label="رقم الهاتف"
              placeholder="+962 7XXX XXXX"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />

            <div>
              <label className="text-sm font-iphone text-foreground mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                الرسالة *
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="اكتب رسالتك أو استفسارك هنا..."
                rows={6}
                maxLength={2000}
                className="w-full px-4 py-3 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:outline-none font-iphone text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-iphone font-medium hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {submitting ? "جاري الإرسال..." : "إرسال الاستفسار"}
            </button>
          </motion.form>
        </div>
      </section>

      <SectionNavigation currentPath="/استفسارات" />
      <Footer />
    </div>
  );
};

const Field = ({
  icon: Icon, label, type = "text", placeholder, value, onChange,
}: {
  icon: React.ElementType;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="text-sm font-iphone text-foreground mb-2 flex items-center gap-2">
      <Icon className="w-4 h-4 text-primary" /> {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-2xl bg-muted/30 border border-border focus:border-primary focus:outline-none font-iphone text-sm"
    />
  </div>
);

export default InquiriesPage;
