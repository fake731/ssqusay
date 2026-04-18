-- Scheduled notifications table
CREATE TABLE IF NOT EXISTS public.scheduled_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  url TEXT DEFAULT '/',
  scheduled_for TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending',
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.scheduled_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Developers can view scheduled"
  ON public.scheduled_notifications FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can insert scheduled"
  ON public.scheduled_notifications FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can update scheduled"
  ON public.scheduled_notifications FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can delete scheduled"
  ON public.scheduled_notifications FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));

CREATE INDEX IF NOT EXISTS idx_scheduled_status_time
  ON public.scheduled_notifications(status, scheduled_for);

-- Enable extensions for cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;