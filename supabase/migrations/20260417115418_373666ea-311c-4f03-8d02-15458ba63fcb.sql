-- Add url column to notifications
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS url text DEFAULT '/';

-- Create push_subscriptions table
CREATE TABLE IF NOT EXISTS public.push_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint text NOT NULL UNIQUE,
  p256dh text NOT NULL,
  auth text NOT NULL,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
ON public.push_subscriptions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can update own subscription"
ON public.push_subscriptions FOR UPDATE
TO anon, authenticated
USING (true);

CREATE POLICY "Developers can view subscriptions"
ON public.push_subscriptions FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can delete subscriptions"
ON public.push_subscriptions FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'developer'::app_role));

CREATE INDEX IF NOT EXISTS idx_push_subs_endpoint ON public.push_subscriptions(endpoint);