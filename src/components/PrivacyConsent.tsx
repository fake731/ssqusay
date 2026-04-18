import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, Bell, BellOff, Settings as SettingsIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { setupPushNotifications, getNotificationPermission } from "@/utils/pushNotifications";

const PrivacyConsent = () => {
  const [show, setShow] = useState(false);
  const [showDeniedHelp, setShowDeniedHelp] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("privacy_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    } else if (consent === "accepted") {
      setupPushNotifications().then((res) => {
        if (res.permission === "denied") setShowDeniedHelp(true);
      }).catch(() => {});
    }
  }, []);

  const handleAccept = async () => {
    localStorage.setItem("privacy_consent", "accepted");
    setShow(false);
    const res = await setupPushNotifications();
    if (res.permission === "denied") setShowDeniedHelp(true);
    trackVisitor(true);
  };

  const handleDecline = () => {
    localStorage.setItem("privacy_consent", "declined");
    setShow(false);
    trackVisitor(false);
  };

  const handleEnableNotifs = async () => {
    const res = await setupPushNotifications();
    if (res.ok) setShowDeniedHelp(false);
    else if (res.permission === "denied") setShowDeniedHelp(true);
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
      await supabase.from("visitor_data").insert({ consent_given: consent });
    }
  };

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[9999]"
          >
            <div className="relative bg-card/40 backdrop-blur-2xl border border-primary/15 rounded-3xl p-6 shadow-2xl overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />

              <button
                onClick={handleDecline}
                className="absolute top-4 left-4 w-7 h-7 rounded-full bg-muted/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-amiri text-base text-foreground">الخصوصية والإشعارات</h3>
                  <p className="text-[11px] text-muted-foreground font-iphone">نحترم خصوصيتك وبنحميها</p>
                </div>
              </div>

              <p className="text-[12px] text-muted-foreground font-iphone leading-[1.8] mb-2">
                بنستخدم بعض المعلومات زي موقعك الجغرافي ونوع جهازك عشان نحسّن تجربتك.
                لما توافق، بنقدر نطوّر الموقع بشكل أحسن ونوصّلك إشعارات مهمة.
              </p>

              <div className="flex items-center gap-2 mb-4 p-2.5 rounded-xl bg-primary/5 border border-primary/10">
                <Bell className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-[11px] text-muted-foreground font-iphone">
                  راح نرسلك إشعارات بالتحديثات الجديدة على جهازك
                </p>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={handleAccept}
                  className="flex-1 py-3 rounded-2xl bg-primary/90 backdrop-blur-sm text-primary-foreground font-iphone text-sm font-medium hover:bg-primary transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                >
                  موافق
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 py-3 rounded-2xl bg-muted/50 backdrop-blur-sm text-muted-foreground font-iphone text-sm hover:bg-muted/80 transition-all active:scale-[0.98]"
                >
                  لا شكراً
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Denied notifications helper */}
      <AnimatePresence>
        {showDeniedHelp && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-[9998]"
          >
            <div className="relative bg-card/40 backdrop-blur-2xl border border-destructive/20 rounded-3xl p-5 shadow-2xl overflow-hidden">
              <button
                onClick={() => setShowDeniedHelp(false)}
                className="absolute top-3 left-3 w-7 h-7 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center">
                  <BellOff className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <h3 className="font-amiri text-sm text-foreground">الإشعارات معطّلة</h3>
                  <p className="text-[10px] text-muted-foreground font-iphone">لازم تفعّلها من المتصفح</p>
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground font-iphone leading-[1.7] mb-3">
                المتصفح رفض إذن الإشعارات. عشان تفعّلها: اضغط على أيقونة القفل 🔒 جنب الرابط فوق، ثم
                "إعدادات الموقع" → "الإشعارات" → "السماح".
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleEnableNotifs}
                  className="flex-1 py-2.5 rounded-xl bg-primary/90 text-primary-foreground font-iphone text-xs font-medium hover:bg-primary transition-all flex items-center justify-center gap-2"
                >
                  <Bell className="w-3.5 h-3.5" /> حاول مرة ثانية
                </button>
                <button
                  onClick={() => setShowDeniedHelp(false)}
                  className="px-4 py-2.5 rounded-xl bg-muted/50 text-muted-foreground font-iphone text-xs hover:bg-muted/80 transition-all"
                >
                  لاحقاً
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrivacyConsent;
