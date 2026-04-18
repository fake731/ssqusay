import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

let geoCache: { country?: string; city?: string } | null = null;

async function getGeo() {
  if (geoCache) return geoCache;
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    geoCache = {
      country: data.country_name || undefined,
      city: data.city || undefined,
    };
  } catch {
    geoCache = {};
  }
  return geoCache;
}

export const usePageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const consent = localStorage.getItem("privacy_consent");
    if (consent !== "accepted") return;

    const track = async () => {
      const geo = await getGeo();
      try {
        await supabase.from("page_views").insert({
          path: decodeURIComponent(location.pathname),
          country: geo.country || null,
          city: geo.city || null,
          user_agent: navigator.userAgent.slice(0, 200),
        });
      } catch {}
    };
    track();
  }, [location.pathname]);
};
