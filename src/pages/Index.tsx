import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <img 
                src={brandData.logo.main} 
                alt="SPACE" 
                className="h-8 w-auto"
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
      <section id="home" className="space-section pt-32">
        <div className="space-container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="space-heading mb-8">
              We Create the Space for Impact
            </h1>
            <div className="space-blue-accent mx-auto mb-8"></div>
            <p className="space-body mb-12 max-w-2xl mx-auto">
              Exhibitions built with precision. Conferences designed for connection. 
              Every event crafted to deliver measurable impact and lasting impressions.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold uppercase tracking-wide"
              onClick={() => scrollToSection('contact')}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="space-section bg-secondary/50">
        <div className="space-container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="space-subheading mb-8">About SPACE</h2>
            <div className="space-blue-accent mx-auto mb-8"></div>
            <div className="space-body max-w-3xl mx-auto">
              <p className="mb-6">
                SPACE transforms visions into reality through meticulous planning and flawless execution. 
                We orchestrate exhibitions and conferences that command attention, drive engagement, and deliver results.
              </p>
              <p className="mb-6">
                Our approach combines strategic thinking with operational precision, ensuring every detail 
                serves the larger purpose of creating meaningful connections and measurable impact.
              </p>
              <p>
                From intimate corporate gatherings to large-scale international exhibitions, 
                we bring the expertise and dedication that turns ambitious ideas into successful realities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="space-section">
        <div className="space-container">
          <div className="text-center mb-16">
            <h2 className="space-subheading mb-8">Our Capabilities</h2>
            <div className="space-blue-accent mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Exhibition Organizing',
                description: 'End-to-end exhibition management from concept to completion, ensuring maximum impact and visitor engagement.'
              },
              {
                title: 'Conference Management',
                description: 'Strategic conference planning and execution that facilitates meaningful connections and knowledge exchange.'
              },
              {
                title: 'Sponsorship Planning',
                description: 'Comprehensive sponsorship strategies that create value for partners while enhancing event experiences.'
              },
              {
                title: 'Venue & Layout Design',
                description: 'Innovative space design that optimizes flow, engagement, and brand visibility for maximum impact.'
              },
              {
                title: 'On-ground Execution',
                description: 'Flawless event delivery with dedicated teams ensuring every detail meets our exacting standards.'
              },
              {
                title: 'Strategic Consulting',
                description: 'Expert guidance on event strategy, audience development, and ROI optimization for lasting success.'
              }
            ].map((service, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8">
                  <div className="space-blue-accent mb-4"></div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{service.title}</h3>
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
            <h2 className="space-subheading mb-8">Our Work</h2>
            <div className="space-blue-accent mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'International Tech Summit 2024',
                category: 'Conference',
                description: 'A flagship technology conference bringing together 5,000+ industry leaders across 3 days of innovation and networking.',
                image: 'https://images.unsplash.com/photo-1687945727613-a4d06cc41024?w=600&auto=format&fit=crop&q=80'
              },
              {
                title: 'Healthcare Innovation Expo',
                category: 'Exhibition',
                description: 'Comprehensive healthcare exhibition featuring 200+ exhibitors and cutting-edge medical technology demonstrations.',
                image: 'https://images.unsplash.com/photo-1603430416744-a47cee46b0ae?w=600&auto=format&fit=crop&q=80'
              },
              {
                title: 'Sustainable Future Forum',
                category: 'Conference',
                description: 'Multi-day sustainability conference with global thought leaders discussing climate solutions and green innovation.',
                image: 'https://images.unsplash.com/photo-1594182878853-7cdb804bceaa?w=600&auto=format&fit=crop&q=80'
              },
              {
                title: 'Digital Transformation Expo',
                category: 'Exhibition',
                description: 'Enterprise-focused exhibition showcasing the latest in digital transformation technologies and strategies.',
                image: 'https://images.unsplash.com/photo-1740441155850-bb5076d1c8c1?w=600&auto=format&fit=crop&q=80'
              },
              {
                title: 'Global Leadership Summit',
                category: 'Conference',
                description: 'Executive-level conference featuring C-suite leaders sharing insights on business strategy and innovation.',
                image: 'https://images.unsplash.com/photo-1566904501875-35009b7075fb?w=600&auto=format&fit=crop&q=80'
              },
              {
                title: 'Smart Cities Exhibition',
                category: 'Exhibition',
                description: 'Urban innovation showcase featuring smart city solutions, IoT technologies, and sustainable urban development.',
                image: 'https://images.unsplash.com/photo-1646801448400-a34a5a0e570d?w=600&auto=format&fit=crop&q=80'
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
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">{project.category}</span>
                    <div className="h-1 w-8 bg-primary"></div>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground">{project.title}</h3>
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
              <div className="space-blue-accent mb-6"></div>
              <h2 className="text-5xl font-bold uppercase tracking-tight text-foreground mb-6">
                Green Life Expo
              </h2>
              <h3 className="text-2xl font-semibold text-primary mb-8">
                Go Green & Healthy Living Expo
              </h3>
              <div className="space-body mb-8">
                <p className="mb-6">
                  Our flagship sustainability platform bringing together environmental innovators, 
                  health advocates, and conscious consumers in a transformative exhibition experience.
                </p>
                <p className="mb-6">
                  More than an event, Green Life Expo is a strategic platform for the future of 
                  sustainable living, featuring cutting-edge green technologies, wellness solutions, 
                  and actionable insights for a healthier planet.
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
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold uppercase tracking-tight text-foreground mb-8">
              Let's Build Your Next Event
            </h2>
            <div className="space-blue-accent mx-auto mb-8"></div>
            <p className="space-body mb-12 max-w-2xl mx-auto">
              Ready to create an exhibition or conference that delivers real impact? 
              Let's discuss how we can bring your vision to life with precision and excellence.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-xl font-semibold uppercase tracking-wide"
              onClick={() => scrollToSection('contact')}
            >
              Get in Touch
            </Button>
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
                className="h-8 w-auto mb-6"
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
