import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const PrivacyConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("privacy_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = async () => {
    localStorage.setItem("privacy_consent", "accepted");
    setShow(false);
    trackVisitor(true);
  };

  const handleDecline = () => {
    localStorage.setItem("privacy_consent", "declined");
    setShow(false);
    trackVisitor(false);
  };

  const trackVisitor = async (consent: boolean) => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const geo = await res.json();
      await supabase.from("visitor_data").insert({
        ip_address: consent ? geo.ip : null,
        country: geo.country_name || null,
        city: geo.city || null,
        user_agent: consent ? navigator.userAgent : null,
        consent_given: consent,
      });
    } catch {
      await supabase.from("visitor_data").insert({
        consent_given: consent,
      });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[9999]"
        >
          <div className="bg-card/95 backdrop-blur-2xl border border-border/50 rounded-2xl p-5 shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleDecline}
              className="absolute top-3 left-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon & Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-amiri text-base text-foreground">سياسة الخصوصية</h3>
                <p className="text-xs text-muted-foreground font-iphone">نحترم خصوصيتك</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-muted-foreground font-iphone leading-relaxed mb-4">
              نستخدم بعض البيانات مثل الموقع الجغرافي ونوع الجهاز لتحسين تجربتك. بالموافقة، بتساعدنا نطوّر الموقع بشكل أفضل.
            </p>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-iphone text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                موافق
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 py-2.5 rounded-xl bg-muted text-muted-foreground font-iphone text-sm hover:bg-muted/80 transition-colors"
              >
                رفض
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyConsent;
