-- Create users table for admin authentication
CREATE TABLE IF NOT EXISTS public.admin_users_20251230 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'viewer')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Create hero section content table
CREATE TABLE IF NOT EXISTS public.hero_content_20251230 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    trust_badge TEXT DEFAULT 'Trusted by 200+ Global Brands',
    main_headline TEXT DEFAULT 'Global Exhibition & Conference Organizers for Enterprise Leaders',
    subheadline TEXT DEFAULT 'From Fortune 500 product launches to international trade shows – we deliver events that drive business results.',
    metrics_text TEXT DEFAULT '500+ Successful Events | 2M+ Attendees | 50+ Countries',
    primary_cta_text TEXT DEFAULT 'Schedule Strategic Consultation',
    secondary_cta_text TEXT DEFAULT 'View Success Stories',
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES public.admin_users_20251230(id)
);

-- Create about section content table
CREATE TABLE IF NOT EXISTS public.about_content_20251230 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    section_title TEXT DEFAULT 'Strategic Exhibition Partners for Industry Leaders',
    intro_text TEXT DEFAULT 'For over 15 years, we''ve been the strategic partner of choice for Fortune 500 companies, government agencies, and industry associations planning mission-critical events.',
    years_stat TEXT DEFAULT '15+',
    years_description TEXT DEFAULT 'Years of Excellence',
    years_detail TEXT DEFAULT 'Proven track record delivering world-class events for global enterprises',
    events_stat TEXT DEFAULT '500+',
    events_description TEXT DEFAULT 'Successful Events',
    events_detail TEXT DEFAULT 'From intimate C-suite gatherings to 50,000+ attendee exhibitions',
    business_stat TEXT DEFAULT '$2B+',
    business_description TEXT DEFAULT 'Business Generated',
    business_detail TEXT DEFAULT 'Measurable ROI and qualified leads generated for our clients',
    testimonial_quote TEXT DEFAULT 'SPACE delivered our most successful product launch in company history. Their strategic approach and flawless execution generated $50M in qualified leads and established us as the industry leader.',
    testimonial_author TEXT DEFAULT 'Sarah Chen',
    testimonial_title TEXT DEFAULT 'Chief Marketing Officer, Fortune 500 Tech Company',
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES public.admin_users_20251230(id)
);

-- Create services/capabilities table
CREATE TABLE IF NOT EXISTS public.services_20251230 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    metric TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES public.admin_users_20251230(id)
);

-- Create case studies table
CREATE TABLE IF NOT EXISTS public.case_studies_20251230 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    client TEXT NOT NULL,
    results TEXT NOT NULL,
    attendees TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES public.admin_users_20251230(id)
);

-- Create Green Life Expo content table
CREATE TABLE IF NOT EXISTS public.green_life_content_20251230 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    badge_text TEXT DEFAULT 'SPACE Proprietary Platform',
    main_title TEXT DEFAULT 'Green Life Expo',
    subtitle TEXT DEFAULT 'The Premier Sustainability Exhibition We Created & Operate',
    attendees_stat TEXT DEFAULT '50,000+',
    exhibitors_stat TEXT DEFAULT '500+',
    business_stat TEXT DEFAULT '$100M+',
    main_description TEXT DEFAULT 'Our flagship proprietary platform - Green Life Expo is SPACE''s owned and operated sustainability exhibition, now the largest green living event in Asia-Pacific.',
    secondary_description TEXT DEFAULT 'We created this strategic platform to demonstrate our capability to build, own, and scale industry-defining events. What started as a concept is now a $100M+ annual business ecosystem.',
    cta_text TEXT DEFAULT 'Explore Green Life Expo',
    external_url TEXT DEFAULT 'https://greenlife-expo.com',
    image_url TEXT DEFAULT 'https://images.unsplash.com/photo-1603093159687-24356731a8b4?w=800&auto=format&fit=crop&q=80',
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES public.admin_users_20251230(id)
);

-- Create final CTA section table
CREATE TABLE IF NOT EXISTS public.final_cta_20251230 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    badge_text TEXT DEFAULT 'Ready for Enterprise-Level Results?',
    main_headline TEXT DEFAULT 'Partner with SPACE for Your Next Strategic Event',
    description TEXT DEFAULT 'Join 200+ global brands who trust SPACE to deliver mission-critical events that drive business results.',
    qualification_text TEXT DEFAULT 'Planning an event with 500+ attendees? Let''s discuss your strategic objectives.',
    primary_cta_text TEXT DEFAULT 'Schedule Strategic Consultation',
    secondary_cta_text TEXT DEFAULT 'Download ROI Calculator',
    response_time TEXT DEFAULT '24-48 Hours',
    response_description TEXT DEFAULT 'Strategic Consultation Response',
    budget_requirement TEXT DEFAULT '$1M+ Budget',
    budget_description TEXT DEFAULT 'Minimum Event Investment',
    reach_stat TEXT DEFAULT 'Global Reach',
    reach_description TEXT DEFAULT '50+ Countries Served',
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES public.admin_users_20251230(id)
);

-- Create brand settings table
CREATE TABLE IF NOT EXISTS public.brand_settings_20251230 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    logo_main_url TEXT,
    logo_white_url TEXT,
    primary_color TEXT DEFAULT '195 100% 50%',
    background_color TEXT DEFAULT '0 0% 100%',
    foreground_color TEXT DEFAULT '220 9% 25%',
    accent_color TEXT DEFAULT '195 100% 50%',
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES public.admin_users_20251230(id)
);

-- Create contact information table
CREATE TABLE IF NOT EXISTS public.contact_info_20251230 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT DEFAULT 'info@space-exhibitions.com',
    phone TEXT DEFAULT '+1 (555) 123-4567',
    locations TEXT DEFAULT 'New York | London | Singapore',
    company_description TEXT DEFAULT 'Creating exceptional exhibitions and conferences that drive meaningful connections and deliver measurable impact for organizations worldwide.',
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by UUID REFERENCES public.admin_users_20251230(id)
);