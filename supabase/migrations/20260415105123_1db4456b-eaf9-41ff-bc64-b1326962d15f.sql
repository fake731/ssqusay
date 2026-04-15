
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'developer', 'user');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  role TEXT DEFAULT 'user',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create visitor_data table for analytics
CREATE TABLE public.visitor_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT,
  country TEXT,
  city TEXT,
  user_agent TEXT,
  consent_given BOOLEAN DEFAULT false,
  visited_at TIMESTAMPTZ DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create site_content table for editable content
CREATE TABLE public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());
CREATE POLICY "Developers can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'developer'));

-- User roles policies
CREATE POLICY "Developers can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'developer'));

-- Visitor data policies
CREATE POLICY "Developers can view visitor data" ON public.visitor_data FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "Anyone can insert visitor data" ON public.visitor_data FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Notifications policies
CREATE POLICY "Anyone can read notifications" ON public.notifications FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Developers can manage notifications" ON public.notifications FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'developer'));

-- Site content policies
CREATE POLICY "Anyone can read content" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Developers can manage content" ON public.site_content FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'developer'));

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'username', NEW.email), COALESCE(NEW.raw_user_meta_data->>'display_name', ''));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
