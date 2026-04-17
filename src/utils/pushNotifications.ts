import { supabase } from "@/integrations/supabase/client";

const VAPID_PUBLIC_KEY = "BDBSyVuEWVZidVm0qD55waujmrWWzHK1e-ZQHmDyOcIcpi9jkaMmg30CrzsDJcZ3CXmHL0GOkZwTcHzq370CXXw";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

function arrayBufferToBase64(buffer: ArrayBuffer | null): string {
  if (!buffer) return "";
  const bytes = new Uint8Array(buffer);
  let bin = "";
  for (let i = 0; i < bytes.byteLength; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) return null;
  try {
    const reg = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;
    return reg;
  } catch (err) {
    console.error("SW registration failed:", err);
    return null;
  }
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) return "denied";
  if (Notification.permission === "granted") return "granted";
  if (Notification.permission === "denied") return "denied";
  return await Notification.requestPermission();
}

export async function subscribeToPush(): Promise<boolean> {
  try {
    const reg = await navigator.serviceWorker.ready;
    if (!reg) return false;

    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
      });
    }

    const json = sub.toJSON() as any;
    const endpoint = json.endpoint || sub.endpoint;
    const p256dh = json.keys?.p256dh || arrayBufferToBase64(sub.getKey("p256dh"));
    const auth = json.keys?.auth || arrayBufferToBase64(sub.getKey("auth"));

    // Upsert by endpoint - delete existing then insert
    await supabase.from("push_subscriptions").delete().eq("endpoint", endpoint);
    const { error } = await supabase.from("push_subscriptions").insert({
      endpoint,
      p256dh,
      auth,
      user_agent: navigator.userAgent,
    });
    if (error) {
      console.error("Subscription save failed:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Push subscription failed:", err);
    return false;
  }
}

export async function setupPushNotifications(): Promise<{ ok: boolean; permission: NotificationPermission }> {
  const reg = await registerServiceWorker();
  if (!reg) return { ok: false, permission: "denied" };
  const permission = await requestNotificationPermission();
  if (permission !== "granted") return { ok: false, permission };
  const ok = await subscribeToPush();
  return { ok, permission };
}

export function getNotificationPermission(): NotificationPermission {
  if (!("Notification" in window)) return "denied";
  return Notification.permission;
}
