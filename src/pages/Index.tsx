import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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
            <div className="mb-4">
              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-4 py-2 text-sm font-medium">
                Trusted by 200+ Global Brands
              </Badge>
            </div>
            <h1 className="space-heading mb-6">
              Global Exhibition & Conference Organizers for Enterprise Leaders
            </h1>
            <div className="space-blue-accent mx-auto mb-8"></div>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              From Fortune 500 product launches to international trade shows – we deliver events that drive business results.
              <span className="block mt-4 text-lg font-medium text-foreground">500+ Successful Events | 2M+ Attendees | 50+ Countries</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold"
                onClick={() => scrollToSection('contact')}
              >
                Schedule Strategic Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg font-semibold"
                onClick={() => scrollToSection('work')}
              >
                View Success Stories
              </Button>
            </div>
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
            <div className="text-center mb-16">
              <h2 className="space-subheading mb-8">Strategic Exhibition Partners for Industry Leaders</h2>
              <div className="space-blue-accent mx-auto mb-8"></div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                For over 15 years, we've been the strategic partner of choice for Fortune 500 companies, 
                government agencies, and industry associations planning mission-critical events.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">15+</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Years of Excellence</h3>
                <p className="text-muted-foreground">Proven track record delivering world-class events for global enterprises</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">500+</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Successful Events</h3>
                <p className="text-muted-foreground">From intimate C-suite gatherings to 50,000+ attendee exhibitions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">$2B+</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Business Generated</h3>
                <p className="text-muted-foreground">Measurable ROI and qualified leads generated for our clients</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-8 shadow-sm border">
              <div className="max-w-3xl mx-auto text-center">
                <blockquote className="text-xl italic text-muted-foreground mb-6">
                  "SPACE delivered our most successful product launch in company history. Their strategic approach 
                  and flawless execution generated $50M in qualified leads and established us as the industry leader."
                </blockquote>
                <div className="flex items-center justify-center">
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">Chief Marketing Officer, Fortune 500 Tech Company</p>
                  </div>
                </div>
              </div>
            </div>
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
            {[
              {
                title: 'Global Exhibition Strategy',
                description: 'Fortune 500-grade exhibition management delivering measurable ROI. From product launches to trade shows, we create experiences that generate qualified leads and drive business growth.',
                metric: 'Avg. 300% ROI'
              },
              {
                title: 'Executive Conference Design',
                description: 'C-suite level conference orchestration for industry leaders. Strategic agenda development, VIP management, and outcome-focused programming that builds lasting business relationships.',
                metric: '95% Executive Satisfaction'
              },
              {
                title: 'Strategic Partnership Development',
                description: 'Enterprise-level sponsorship and partnership strategies that create mutual value. We connect your brand with industry leaders and decision-makers who matter.',
                metric: '$50M+ Partnerships Facilitated'
              },
              {
                title: 'Experience Architecture',
                description: 'Award-winning venue design and spatial strategy that maximizes engagement and brand impact. Every element designed to drive specific business outcomes.',
                metric: '40% Higher Engagement'
              },
              {
                title: 'Flawless Event Delivery',
                description: 'Military-precision execution with dedicated project teams. Zero-failure tolerance for mission-critical corporate events and international exhibitions.',
                metric: '99.8% Success Rate'
              },
              {
                title: 'ROI-Focused Consulting',
                description: 'Strategic advisory services for enterprise event portfolios. Data-driven insights, audience development, and performance optimization that delivers measurable business impact.',
                metric: 'Avg. 250% Lead Increase'
              }
            ].map((service, index) => (
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
            {[
              {
                title: 'Fortune 500 Tech Product Launch',
                category: 'Strategic Exhibition',
                client: 'Global Technology Leader',
                results: '$50M in qualified leads',
                attendees: '15,000+ C-suite executives',
                description: 'Mission-critical product launch for industry-defining AI technology. Generated record-breaking lead volume and established market leadership position.',
                image: 'https://images.unsplash.com/photo-1687945727613-a4d06cc41024?w=600&auto=format&fit=crop&q=80'
              },
              {
                title: 'International Healthcare Summit',
                category: 'Government Partnership',
                client: 'Ministry of Health + WHO',
                results: '200+ policy agreements',
                attendees: '5,000+ healthcare leaders',
                description: 'Strategic healthcare policy summit resulting in international cooperation agreements and $2B in healthcare infrastructure commitments.',
                image: 'https://images.unsplash.com/photo-1603430416744-a47cee46b0ae?w=600&auto=format&fit=crop&q=80'
              },
              {
                title: 'Automotive Industry Transformation',
                category: 'Trade Association Event',
                client: 'Global Automotive Alliance',
                results: '$500M in partnerships',
                attendees: '25,000+ industry professionals',
                description: 'Largest automotive exhibition in Asia-Pacific. Facilitated strategic partnerships and showcased next-generation mobility solutions.',
                image: 'https://images.unsplash.com/photo-1594182878853-7cdb804bceaa?w=600&auto=format&fit=crop&q=80'
              }
            ].map((project, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
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
