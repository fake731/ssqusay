import { supabase } from "@/integrations/supabase/client";

export async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      return registration;
    } catch (err) {
      console.error('SW registration failed:', err);
      return null;
    }
  }
  return null;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export function showLocalNotification(title: string, body: string) {
  if (Notification.permission === 'granted' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.showNotification(title, {
        body,
        icon: '/favicon.ico',
        dir: 'rtl',
        lang: 'ar',
        vibrate: [200, 100, 200],
      });
    });
  }
}

// Poll for new notifications and show them
let lastCheckedId: string | null = null;

export async function startNotificationPolling() {
  const check = async () => {
    try {
      const { data } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1);

      if (data && data.length > 0 && data[0].id !== lastCheckedId) {
        if (lastCheckedId !== null) {
          showLocalNotification(data[0].title, data[0].message);
        }
        lastCheckedId = data[0].id;
      }
    } catch {}
  };

  await check();
  setInterval(check, 30000); // Check every 30 seconds
}
