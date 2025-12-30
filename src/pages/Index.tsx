import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface BrandData {
  colors: {
    primary: string;
    background: string;
    foreground: string;
    accent: string;
  };
  logo: {
    main: string;
    white: string;
  };
}

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Content state
  const [heroContent, setHeroContent] = useState<any>(null);
  const [aboutContent, setAboutContent] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [greenLifeContent, setGreenLifeContent] = useState<any>(null);
  const [finalCtaContent, setFinalCtaContent] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [brandData, setBrandData] = useState<BrandData>({
    colors: {
      primary: '195 100% 50%',
      background: '0 0% 100%',
      foreground: '220 9% 25%',
      accent: '195 100% 50%'
    },
    logo: {
      main: './images/space_logo_20251229_183829.png',
      white: './images/space_logo_white_20251229_183827.png'
    }
  });

  // Fetch all content from Supabase
  const fetchContent = async () => {
    try {
      setLoading(true);
      
      // Fetch all content in parallel
      const [heroRes, aboutRes, servicesRes, caseStudiesRes, greenLifeRes, finalCtaRes, contactRes, brandRes] = await Promise.all([
        supabase.from('hero_content_20251230').select('*').eq('is_active', true).single(),
        supabase.from('about_content_20251230').select('*').eq('is_active', true).single(),
        supabase.from('services_20251230').select('*').eq('is_active', true).order('display_order'),
        supabase.from('case_studies_20251230').select('*').eq('is_active', true).order('display_order'),
        supabase.from('green_life_content_20251230').select('*').eq('is_active', true).single(),
        supabase.from('final_cta_20251230').select('*').eq('is_active', true).single(),
        supabase.from('contact_info_20251230').select('*').eq('is_active', true).single(),
        supabase.from('brand_settings_20251230').select('*').eq('is_active', true).single()
      ]);
      
      // Set content state
      if (heroRes.data) setHeroContent(heroRes.data);
      if (aboutRes.data) setAboutContent(aboutRes.data);
      if (servicesRes.data) setServices(servicesRes.data);
      if (caseStudiesRes.data) setCaseStudies(caseStudiesRes.data);
      if (greenLifeRes.data) setGreenLifeContent(greenLifeRes.data);
      if (finalCtaRes.data) setFinalCtaContent(finalCtaRes.data);
      if (contactRes.data) setContactInfo(contactRes.data);
      
      // Update brand data if available
      if (brandRes.data) {
        setBrandData(prev => ({
          ...prev,
          colors: {
            primary: brandRes.data.primary_color || prev.colors.primary,
            background: brandRes.data.background_color || prev.colors.background,
            foreground: brandRes.data.foreground_color || prev.colors.foreground,
            accent: brandRes.data.accent_color || prev.colors.accent
          },
          logo: {
            main: brandRes.data.logo_main_url || prev.logo.main,
            white: brandRes.data.logo_white_url || prev.logo.white
          }
        }));
      }
      
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Load brand data from localStorage
    const loadBrandData = () => {
      const savedBrandData = localStorage.getItem('spaceBrandData');
      if (savedBrandData) {
        const parsedBrandData = JSON.parse(savedBrandData);
        setBrandData(parsedBrandData);
        
        // Update CSS variables for colors
        const root = document.documentElement;
        root.style.setProperty('--primary', parsedBrandData.colors.primary);
        root.style.setProperty('--background', parsedBrandData.colors.background);
        root.style.setProperty('--foreground', parsedBrandData.colors.foreground);
        root.style.setProperty('--accent', parsedBrandData.colors.accent);
      }
    };
    
    // Load initial data
    loadBrandData();
    
    // Listen for brand updates from admin dashboard
    const handleBrandUpdate = (event: CustomEvent) => {
      const updatedBrandData = event.detail;
      setBrandData(updatedBrandData);
      
      // Update CSS variables for colors
      const root = document.documentElement;
      root.style.setProperty('--primary', updatedBrandData.colors.primary);
      root.style.setProperty('--background', updatedBrandData.colors.background);
      root.style.setProperty('--foreground', updatedBrandData.colors.foreground);
      root.style.setProperty('--accent', updatedBrandData.colors.accent);
    };
    
    window.addEventListener('brandDataUpdated', handleBrandUpdate as EventListener);
    
    return () => {
      window.removeEventListener('brandDataUpdated', handleBrandUpdate as EventListener);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white'
      }`}>
        <div className="space-container">
          <div className="flex items-center justify-between h-32">
            <div className="flex items-center">
              <img 
                src={brandData.logo.main} 
                alt="SPACE" 
                className="h-24 w-auto"
              />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors font-medium">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors font-medium">About</button>
              <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition-colors font-medium">Services</button>
              <button onClick={() => scrollToSection('work')} className="text-foreground hover:text-primary transition-colors font-medium">Our Work</button>
              <button onClick={() => scrollToSection('green-life')} className="text-foreground hover:text-primary transition-colors font-medium">Green Life Expo</button>
              <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors font-medium">Contact</button>
            </nav>
          </div>
        </div>
        <div className="h-px bg-primary/20"></div>
      </header>

      {/* Hero Section */}
      <section id="home" className="space-section pt-40">
        <div className="space-container">
          <div className="max-w-4xl mx-auto text-center">
            {heroContent && (
              <>
                <div className="mb-4">
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium">
                    {heroContent.trust_badge}
                  </Badge>
                </div>
                <h1 className="space-heading mb-6">
                  {heroContent.main_headline}
                </h1>
                <div className="space-blue-accent mx-auto mb-8"></div>
                <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                  {heroContent.subheadline}
                  <span className="block mt-4 text-lg font-medium text-foreground">{heroContent.metrics_text}</span>
                </p>
              </>
            )}
            {heroContent && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
                  onClick={() => scrollToSection('contact')}
                >
                  {heroContent.primary_cta_text}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg font-semibold"
                  onClick={() => scrollToSection('work')}
                >
                  {heroContent.secondary_cta_text}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 bg-muted/30">
        <div className="space-container">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
              Trusted by Industry Leaders Worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              {[
                'Fortune 500 Tech Giants',
                'Global Automotive Leaders', 
                'International Trade Organizations',
                'Government Agencies',
                'Healthcare Innovators',
                'Sustainability Champions'
              ].map((client, index) => (
                <div key={index} className="text-center">
                  <div className="h-12 bg-muted rounded flex items-center justify-center mb-2">
                    <span className="text-xs font-medium text-muted-foreground px-3">{client}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="space-section bg-secondary/50">
        <div className="space-container">
          <div className="max-w-6xl mx-auto">
            {aboutContent && (
              <>
                <div className="text-center mb-16">
                  <h2 className="space-subheading mb-8">{aboutContent.section_title}</h2>
                  <div className="space-blue-accent mx-auto mb-8"></div>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    {aboutContent.intro_text}
                  </p>
                </div>
            
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">{aboutContent.years_stat}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{aboutContent.years_description}</h3>
                    <p className="text-muted-foreground">{aboutContent.years_detail}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">{aboutContent.events_stat}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{aboutContent.events_description}</h3>
                    <p className="text-muted-foreground">{aboutContent.events_detail}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">{aboutContent.business_stat}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{aboutContent.business_description}</h3>
                    <p className="text-muted-foreground">{aboutContent.business_detail}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-8 shadow-sm border">
                  <div className="max-w-3xl mx-auto text-center">
                    <blockquote className="text-xl italic text-muted-foreground mb-6">
                      "{aboutContent.testimonial_quote}"
                    </blockquote>
                    <div className="flex items-center justify-center">
                      <div>
                        <p className="font-semibold">{aboutContent.testimonial_author}</p>
                        <p className="text-sm text-muted-foreground">{aboutContent.testimonial_title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="space-section">
        <div className="space-container">
          <div className="text-center mb-16">
            <h2 className="space-subheading mb-8">Strategic Event Capabilities</h2>
            <div className="space-blue-accent mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              End-to-end strategic event management designed to deliver measurable business outcomes 
              for enterprise leaders and industry associations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-blue-accent"></div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {service.metric}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section id="work" className="space-section bg-secondary/50">
        <div className="space-container">
          <div className="text-center mb-16">
            <h2 className="space-subheading mb-8">Proven Success Stories</h2>
            <div className="space-blue-accent mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from Fortune 500 companies, government agencies, and industry leaders 
              who trusted SPACE with their most critical events.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((project, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">{project.category}</span>
                    <Badge variant="outline" className="text-xs">{project.client}</Badge>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground">{project.title}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Results</p>
                      <p className="text-sm font-semibold text-primary">{project.results}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Attendees</p>
                      <p className="text-sm font-semibold">{project.attendees}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Green Life Expo - Featured Section */}
      <section id="green-life" className="space-section">
        <div className="space-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">
                SPACE Proprietary Platform
              </Badge>
              <h2 className="text-5xl font-bold uppercase tracking-tight text-foreground mb-4">
                Green Life Expo
              </h2>
              <h3 className="text-2xl font-semibold text-primary mb-8">
                The Premier Sustainability Exhibition We Created & Operate
              </h3>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">50,000+</p>
                  <p className="text-sm text-green-700">Annual Attendees</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">500+</p>
                  <p className="text-sm text-green-700">Exhibiting Brands</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">$100M+</p>
                  <p className="text-sm text-green-700">Business Generated</p>
                </div>
              </div>
              <div className="space-body mb-8">
                <p className="mb-6 text-lg">
                  <strong>Our flagship proprietary platform</strong> - Green Life Expo is SPACE's owned and operated 
                  sustainability exhibition, now the largest green living event in Asia-Pacific.
                </p>
                <p className="mb-6">
                  We created this strategic platform to demonstrate our capability to build, own, and scale 
                  industry-defining events. What started as a concept is now a $100M+ annual business ecosystem.
                </p>
                <p>
                  Join industry leaders, sustainability experts, and forward-thinking organizations 
                  as we shape the conversation around environmental responsibility and healthy living.
                </p>
              </div>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold uppercase tracking-wide"
                onClick={() => window.open('https://greenlife-expo.com', '_blank')}
              >
                Explore Green Life Expo
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1603093159687-24356731a8b4?w=800&auto=format&fit=crop&q=80" 
                alt="Green Life Expo"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <section className="space-dark-section space-diagonal py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 space-diagonal"></div>
        <div className="space-container relative z-10">
          <div className="text-center">
            <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
            <h2 className="text-4xl font-bold text-white uppercase tracking-tight">
              Excellence in Every Detail
            </h2>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="space-section">
        <div className="space-container">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-12 text-center">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Ready for Enterprise-Level Results?
              </Badge>
              <h2 className="text-5xl font-bold uppercase tracking-tight text-foreground mb-6">
                Partner with SPACE for Your Next Strategic Event
              </h2>
              <div className="space-blue-accent mx-auto mb-8"></div>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Join 200+ global brands who trust SPACE to deliver mission-critical events that drive business results. 
                <span className="block mt-2 font-semibold text-foreground">Planning an event with 500+ attendees? Let's discuss your strategic objectives.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold"
                  onClick={() => scrollToSection('contact')}
                >
                  Schedule Strategic Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 px-12 py-6 text-xl font-semibold"
                >
                  Download ROI Calculator
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">24-48 Hours</p>
                  <p className="text-sm text-muted-foreground">Strategic Consultation Response</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">$1M+ Budget</p>
                  <p className="text-sm text-muted-foreground">Minimum Event Investment</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">Global Reach</p>
                  <p className="text-sm text-muted-foreground">50+ Countries Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="space-dark-section py-16">
        <div className="space-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <img 
                src={brandData.logo.white} 
                alt="SPACE" 
                className="h-24 w-auto mb-6"
              />
              <p className="text-white/80 leading-relaxed max-w-md">
                Creating exceptional exhibitions and conferences that drive meaningful connections 
                and deliver measurable impact for organizations worldwide.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wide">Contact</h4>
              <div className="space-y-2 text-white/80">
                <p>info@space-exhibitions.com</p>
                <p>+1 (555) 123-4567</p>
                <p>New York | London | Singapore</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 uppercase tracking-wide">Services</h4>
              <div className="space-y-2 text-white/80">
                <p>Exhibition Organizing</p>
                <p>Conference Management</p>
                <p>Event Strategy</p>
                <p>Venue Design</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/60 text-sm">
                © 2024 SPACE. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Privacy Policy</a>
                <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
