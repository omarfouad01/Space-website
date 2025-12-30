-- Insert default admin user
INSERT INTO public.admin_users_20251230 (username, email, password_hash, role) 
VALUES ('admin', 'admin@space-exhibitions.com', 'space2024admin', 'admin')
ON CONFLICT (username) DO NOTHING;

INSERT INTO public.admin_users_20251230 (username, email, password_hash, role) 
VALUES ('editor', 'editor@space-exhibitions.com', 'editor2024', 'editor')
ON CONFLICT (username) DO NOTHING;

-- Insert default content
INSERT INTO public.hero_content_20251230 (id) VALUES (gen_random_uuid()) ON CONFLICT DO NOTHING;
INSERT INTO public.about_content_20251230 (id) VALUES (gen_random_uuid()) ON CONFLICT DO NOTHING;
INSERT INTO public.green_life_content_20251230 (id) VALUES (gen_random_uuid()) ON CONFLICT DO NOTHING;
INSERT INTO public.final_cta_20251230 (id) VALUES (gen_random_uuid()) ON CONFLICT DO NOTHING;
INSERT INTO public.brand_settings_20251230 (id) VALUES (gen_random_uuid()) ON CONFLICT DO NOTHING;
INSERT INTO public.contact_info_20251230 (id) VALUES (gen_random_uuid()) ON CONFLICT DO NOTHING;

-- Insert default services
INSERT INTO public.services_20251230 (title, description, metric, display_order) VALUES
('Global Exhibition Strategy', 'Fortune 500-grade exhibition management delivering measurable ROI. From product launches to trade shows, we create experiences that generate qualified leads and drive business growth.', 'Avg. 300% ROI', 1),
('Executive Conference Design', 'C-suite level conference orchestration for industry leaders. Strategic agenda development, VIP management, and outcome-focused programming that builds lasting business relationships.', '95% Executive Satisfaction', 2),
('Strategic Partnership Development', 'Enterprise-level sponsorship and partnership strategies that create mutual value. We connect your brand with industry leaders and decision-makers who matter.', '$50M+ Partnerships Facilitated', 3),
('Experience Architecture', 'Award-winning venue design and spatial strategy that maximizes engagement and brand impact. Every element designed to drive specific business outcomes.', '40% Higher Engagement', 4),
('Flawless Event Delivery', 'Military-precision execution with dedicated project teams. Zero-failure tolerance for mission-critical corporate events and international exhibitions.', '99.8% Success Rate', 5),
('ROI-Focused Consulting', 'Strategic advisory services for enterprise event portfolios. Data-driven insights, audience development, and performance optimization that delivers measurable business impact.', 'Avg. 250% Lead Increase', 6)
ON CONFLICT DO NOTHING;

-- Insert default case studies
INSERT INTO public.case_studies_20251230 (title, category, client, results, attendees, description, image_url, display_order) VALUES
('Fortune 500 Tech Product Launch', 'Strategic Exhibition', 'Global Technology Leader', '$50M in qualified leads', '15,000+ C-suite executives', 'Mission-critical product launch for industry-defining AI technology. Generated record-breaking lead volume and established market leadership position.', 'https://images.unsplash.com/photo-1687945727613-a4d06cc41024?w=600&auto=format&fit=crop&q=80', 1),
('International Healthcare Summit', 'Government Partnership', 'Ministry of Health + WHO', '200+ policy agreements', '5,000+ healthcare leaders', 'Strategic healthcare policy summit resulting in international cooperation agreements and $2B in healthcare infrastructure commitments.', 'https://images.unsplash.com/photo-1603430416744-a47cee46b0ae?w=600&auto=format&fit=crop&q=80', 2),
('Automotive Industry Transformation', 'Trade Association Event', 'Global Automotive Alliance', '$500M in partnerships', '25,000+ industry professionals', 'Largest automotive exhibition in Asia-Pacific. Facilitated strategic partnerships and showcased next-generation mobility solutions.', 'https://images.unsplash.com/photo-1594182878853-7cdb804bceaa?w=600&auto=format&fit=crop&q=80', 3)
ON CONFLICT DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.admin_users_20251230 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content_20251230 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content_20251230 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services_20251230 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies_20251230 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.green_life_content_20251230 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.final_cta_20251230 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_settings_20251230 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_info_20251230 ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (for the main website)
CREATE POLICY "Allow public read access" ON public.hero_content_20251230 FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.about_content_20251230 FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.services_20251230 FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.case_studies_20251230 FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.green_life_content_20251230 FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.final_cta_20251230 FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.brand_settings_20251230 FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.contact_info_20251230 FOR SELECT USING (true);

-- Create policies for admin users to modify content
CREATE POLICY "Allow all operations for authenticated users" ON public.hero_content_20251230 FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.about_content_20251230 FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.services_20251230 FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.case_studies_20251230 FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.green_life_content_20251230 FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.final_cta_20251230 FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.brand_settings_20251230 FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.contact_info_20251230 FOR ALL USING (true);
CREATE POLICY "Allow all operations for authenticated users" ON public.admin_users_20251230 FOR ALL USING (true);