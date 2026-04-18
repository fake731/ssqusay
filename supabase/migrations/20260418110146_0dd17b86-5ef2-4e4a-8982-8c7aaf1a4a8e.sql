-- 1. Inquiries from visitors (contact form)
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  attachment_url text,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit inquiries"
  ON public.inquiries FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Developers can view inquiries"
  ON public.inquiries FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can update inquiries"
  ON public.inquiries FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can delete inquiries"
  ON public.inquiries FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));

-- 2. Page views tracking
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  country text,
  city text,
  user_agent text,
  viewed_at timestamptz DEFAULT now()
);

CREATE INDEX idx_page_views_path ON public.page_views(path);
CREATE INDEX idx_page_views_country ON public.page_views(country);
CREATE INDEX idx_page_views_viewed_at ON public.page_views(viewed_at DESC);

ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can record page views"
  ON public.page_views FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Developers can view page views"
  ON public.page_views FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));

-- 3. Notification templates
CREATE TABLE public.notification_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  url text DEFAULT '/',
  icon text DEFAULT 'megaphone',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Developers can view templates"
  ON public.notification_templates FOR SELECT TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role));

CREATE POLICY "Developers can manage templates"
  ON public.notification_templates FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'developer'::app_role))
  WITH CHECK (has_role(auth.uid(), 'developer'::app_role));

-- Seed default templates
INSERT INTO public.notification_templates (name, title, message, url, icon) VALUES
  ('إعلان عام', '📢 إعلان من الدولة العثمانية', 'لدينا إعلان مهم لك، تفضل بزيارة الموقع لمعرفة التفاصيل', '/', 'megaphone'),
  ('تحديث جديد', '✨ تحديث جديد على الموقع', 'تم إضافة محتوى جديد ومميز، استكشفه الآن', '/', 'sparkles'),
  ('معركة اليوم', '⚔️ معركة اليوم', 'تعرف على إحدى أعظم المعارك في تاريخ الدولة العثمانية', '/المعارك', 'sword'),
  ('سلطان اليوم', '👑 سلطان اليوم', 'اكتشف قصة أحد سلاطين الدولة العثمانية العظماء', '/السلاطين', 'crown');

-- 4. Geographic targeting for scheduled notifications
ALTER TABLE public.scheduled_notifications
  ADD COLUMN IF NOT EXISTS target_country text;

-- 5. Add country tracking to push subscriptions for geo-targeting
ALTER TABLE public.push_subscriptions
  ADD COLUMN IF NOT EXISTS country text;