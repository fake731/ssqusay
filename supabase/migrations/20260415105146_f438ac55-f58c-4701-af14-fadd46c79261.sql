
DROP POLICY "Developers can manage notifications" ON public.notifications;
CREATE POLICY "Developers can insert notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "Developers can update notifications" ON public.notifications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "Developers can delete notifications" ON public.notifications FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'developer'));

DROP POLICY "Developers can manage content" ON public.site_content;
CREATE POLICY "Developers can insert content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "Developers can update content" ON public.site_content FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "Developers can delete content" ON public.site_content FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'developer'));

DROP POLICY "Developers can manage roles" ON public.user_roles;
CREATE POLICY "Developers can select roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "Developers can insert roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "Developers can update roles" ON public.user_roles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'developer'));
CREATE POLICY "Developers can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'developer'));
