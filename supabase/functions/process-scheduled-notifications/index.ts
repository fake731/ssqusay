// Cron-invoked: sends pending scheduled notifications whose time has come
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import webpush from "https://esm.sh/web-push@3.6.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const VAPID_PUBLIC = Deno.env.get("VAPID_PUBLIC_KEY")!;
    const VAPID_PRIVATE = Deno.env.get("VAPID_PRIVATE_KEY")!;
    const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") || "mailto:dev@ottoman.app";
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const nowIso = new Date().toISOString();
    const { data: due } = await admin
      .from("scheduled_notifications")
      .select("*")
      .eq("status", "pending")
      .lte("scheduled_for", nowIso)
      .limit(50);

    if (!due || due.length === 0) {
      return new Response(JSON.stringify({ processed: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: subs } = await admin.from("push_subscriptions").select("*");

    let processed = 0;
    for (const job of due) {
      // Mark as sending to avoid double-fire
      await admin.from("scheduled_notifications").update({ status: "sending" }).eq("id", job.id);

      const payload = JSON.stringify({ title: job.title, body: job.message, url: job.url || "/" });
      const stale: string[] = [];
      let sent = 0;

      await Promise.all(
        (subs || []).map(async (s: any) => {
          try {
            await webpush.sendNotification(
              { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
              payload
            );
            sent++;
          } catch (err: any) {
            if (err?.statusCode === 404 || err?.statusCode === 410) stale.push(s.endpoint);
          }
        })
      );

      if (stale.length > 0) {
        await admin.from("push_subscriptions").delete().in("endpoint", stale);
      }

      // Insert into notifications table for in-app bell history
      await admin.from("notifications").insert({
        title: job.title,
        message: job.message,
        url: job.url || "/",
        type: "scheduled",
        created_by: job.created_by,
      });

      await admin
        .from("scheduled_notifications")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", job.id);

      processed++;
    }

    return new Response(JSON.stringify({ processed }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("scheduled error:", err);
    return new Response(JSON.stringify({ error: err?.message || "internal" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
