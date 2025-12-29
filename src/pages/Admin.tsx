import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface ContentData {
  hero: {
    headline: string;
    description: string;
    ctaText: string;
  };
  about: {
    title: string;
    content: string[];
  };
  services: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  greenLife: {
    title: string;
    subtitle: string;
    content: string[];
    ctaText: string;
  };
  contact: {
    email: string;
    phone: string;
    locations: string;
  };
}

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

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  
  const [contentData, setContentData] = useState<ContentData>({
    hero: {
      headline: 'We Create the Space for Impact',
      description: 'Exhibitions built with precision. Conferences designed for connection. Every event crafted to deliver measurable impact and lasting impressions.',
      ctaText: 'Contact Us'
    },
    about: {
      title: 'About SPACE',
      content: [
        'SPACE transforms visions into reality through meticulous planning and flawless execution. We orchestrate exhibitions and conferences that command attention, drive engagement, and deliver results.',
        'Our approach combines strategic thinking with operational precision, ensuring every detail serves the larger purpose of creating meaningful connections and measurable impact.',
        'From intimate corporate gatherings to large-scale international exhibitions, we bring the expertise and dedication that turns ambitious ideas into successful realities.'
      ]
    },
    services: {
      title: 'Our Capabilities',
      items: [
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
      ]
    },
    greenLife: {
      title: 'Green Life Expo',
      subtitle: 'Go Green & Healthy Living Expo',
      content: [
        'Our flagship sustainability platform bringing together environmental innovators, health advocates, and conscious consumers in a transformative exhibition experience.',
        'More than an event, Green Life Expo is a strategic platform for the future of sustainable living, featuring cutting-edge green technologies, wellness solutions, and actionable insights for a healthier planet.',
        'Join industry leaders, sustainability experts, and forward-thinking organizations as we shape the conversation around environmental responsibility and healthy living.'
      ],
      ctaText: 'Explore Green Life Expo'
    },
    contact: {
      email: 'info@space-exhibitions.com',
      phone: '+1 (555) 123-4567',
      locations: 'New York | London | Singapore'
    }
  });

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

  const handleLogin = () => {
    if (password === 'space2024admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const handleSaveContent = () => {
    // In a real app, this would save to a database
    localStorage.setItem('spaceContentData', JSON.stringify(contentData));
    alert('Content saved successfully!');
  };

  const handleSaveBrand = () => {
    // In a real app, this would save to a database and update CSS variables
    localStorage.setItem('spaceBrandData', JSON.stringify(brandData));
    
    // Update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--primary', brandData.colors.primary);
    root.style.setProperty('--background', brandData.colors.background);
    root.style.setProperty('--foreground', brandData.colors.foreground);
    root.style.setProperty('--accent', brandData.colors.accent);
    
    alert('Brand settings saved successfully!');
  };

  const updateContentField = (section: keyof ContentData, field: string, value: any) => {
    setContentData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateServiceItem = (index: number, field: 'title' | 'description', value: string) => {
    setContentData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }
    }));
  };

  const updateAboutContent = (index: number, value: string) => {
    setContentData(prev => ({
      ...prev,
      about: {
        ...prev.about,
        content: prev.about.content.map((item, i) => 
          i === index ? value : item
        )
      }
    }));
  };

  const updateGreenLifeContent = (index: number, value: string) => {
    setContentData(prev => ({
      ...prev,
      greenLife: {
        ...prev.greenLife,
        content: prev.greenLife.content.map((item, i) => 
          i === index ? value : item
        )
      }
    }));
  };

  useEffect(() => {
    // Load saved data on component mount
    const savedContent = localStorage.getItem('spaceContentData');
    const savedBrand = localStorage.getItem('spaceBrandData');
    
    if (savedContent) {
      setContentData(JSON.parse(savedContent));
    }
    
    if (savedBrand) {
      setBrandData(JSON.parse(savedBrand));
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">SPACE Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="Enter admin password"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Demo password: space2024admin
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={brandData.logo.main} alt="SPACE" className="h-8 w-auto" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Logged in as Admin</Badge>
              <Button 
                variant="outline" 
                onClick={() => setIsAuthenticated(false)}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="brand">Brand Settings</TabsTrigger>
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <div className="grid gap-6">
              {/* Hero Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="hero-headline">Main Headline</Label>
                    <Input
                      id="hero-headline"
                      value={contentData.hero.headline}
                      onChange={(e) => updateContentField('hero', 'headline', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-description">Description</Label>
                    <Textarea
                      id="hero-description"
                      value={contentData.hero.description}
                      onChange={(e) => updateContentField('hero', 'description', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="hero-cta">CTA Button Text</Label>
                    <Input
                      id="hero-cta"
                      value={contentData.hero.ctaText}
                      onChange={(e) => updateContentField('hero', 'ctaText', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle>About Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="about-title">Section Title</Label>
                    <Input
                      id="about-title"
                      value={contentData.about.title}
                      onChange={(e) => updateContentField('about', 'title', e.target.value)}
                    />
                  </div>
                  {contentData.about.content.map((paragraph, index) => (
                    <div key={index}>
                      <Label htmlFor={`about-p${index}`}>Paragraph {index + 1}</Label>
                      <Textarea
                        id={`about-p${index}`}
                        value={paragraph}
                        onChange={(e) => updateAboutContent(index, e.target.value)}
                        rows={3}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Services Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Services Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="services-title">Section Title</Label>
                    <Input
                      id="services-title"
                      value={contentData.services.title}
                      onChange={(e) => updateContentField('services', 'title', e.target.value)}
                    />
                  </div>
                  {contentData.services.items.map((service, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor={`service-title-${index}`}>Service {index + 1} Title</Label>
                          <Input
                            id={`service-title-${index}`}
                            value={service.title}
                            onChange={(e) => updateServiceItem(index, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`service-desc-${index}`}>Description</Label>
                          <Textarea
                            id={`service-desc-${index}`}
                            value={service.description}
                            onChange={(e) => updateServiceItem(index, 'description', e.target.value)}
                            rows={2}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Green Life Expo Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Green Life Expo Section</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="greenlife-title">Title</Label>
                    <Input
                      id="greenlife-title"
                      value={contentData.greenLife.title}
                      onChange={(e) => updateContentField('greenLife', 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="greenlife-subtitle">Subtitle</Label>
                    <Input
                      id="greenlife-subtitle"
                      value={contentData.greenLife.subtitle}
                      onChange={(e) => updateContentField('greenLife', 'subtitle', e.target.value)}
                    />
                  </div>
                  {contentData.greenLife.content.map((paragraph, index) => (
                    <div key={index}>
                      <Label htmlFor={`greenlife-p${index}`}>Paragraph {index + 1}</Label>
                      <Textarea
                        id={`greenlife-p${index}`}
                        value={paragraph}
                        onChange={(e) => updateGreenLifeContent(index, e.target.value)}
                        rows={3}
                      />
                    </div>
                  ))}
                  <div>
                    <Label htmlFor="greenlife-cta">CTA Button Text</Label>
                    <Input
                      id="greenlife-cta"
                      value={contentData.greenLife.ctaText}
                      onChange={(e) => updateContentField('greenLife', 'ctaText', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contact Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      value={contentData.contact.email}
                      onChange={(e) => updateContentField('contact', 'email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone">Phone</Label>
                    <Input
                      id="contact-phone"
                      value={contentData.contact.phone}
                      onChange={(e) => updateContentField('contact', 'phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-locations">Locations</Label>
                    <Input
                      id="contact-locations"
                      value={contentData.contact.locations}
                      onChange={(e) => updateContentField('contact', 'locations', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg" className="w-full">
                    Save All Content Changes
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Save Content Changes</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will save all content changes to the website. Are you sure you want to proceed?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSaveContent}>
                      Save Changes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TabsContent>

          <TabsContent value="brand" className="space-y-6">
            <div className="grid gap-6">
              {/* Brand Colors */}
              <Card>
                <CardHeader>
                  <CardTitle>Brand Colors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="color-primary">Primary Blue (HSL)</Label>
                      <Input
                        id="color-primary"
                        value={brandData.colors.primary}
                        onChange={(e) => setBrandData(prev => ({
                          ...prev,
                          colors: { ...prev.colors, primary: e.target.value }
                        }))}
                        placeholder="195 100% 50%"
                      />
                    </div>
                    <div>
                      <Label htmlFor="color-background">Background (HSL)</Label>
                      <Input
                        id="color-background"
                        value={brandData.colors.background}
                        onChange={(e) => setBrandData(prev => ({
                          ...prev,
                          colors: { ...prev.colors, background: e.target.value }
                        }))}
                        placeholder="0 0% 100%"
                      />
                    </div>
                    <div>
                      <Label htmlFor="color-foreground">Text Color (HSL)</Label>
                      <Input
                        id="color-foreground"
                        value={brandData.colors.foreground}
                        onChange={(e) => setBrandData(prev => ({
                          ...prev,
                          colors: { ...prev.colors, foreground: e.target.value }
                        }))}
                        placeholder="220 9% 25%"
                      />
                    </div>
                    <div>
                      <Label htmlFor="color-accent">Accent Color (HSL)</Label>
                      <Input
                        id="color-accent"
                        value={brandData.colors.accent}
                        onChange={(e) => setBrandData(prev => ({
                          ...prev,
                          colors: { ...prev.colors, accent: e.target.value }
                        }))}
                        placeholder="195 100% 50%"
                      />
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Color Preview:</p>
                    <div className="flex space-x-4">
                      <div 
                        className="w-16 h-16 rounded border"
                        style={{ backgroundColor: `hsl(${brandData.colors.primary})` }}
                        title="Primary"
                      ></div>
                      <div 
                        className="w-16 h-16 rounded border"
                        style={{ backgroundColor: `hsl(${brandData.colors.background})` }}
                        title="Background"
                      ></div>
                      <div 
                        className="w-16 h-16 rounded border"
                        style={{ backgroundColor: `hsl(${brandData.colors.foreground})` }}
                        title="Foreground"
                      ></div>
                      <div 
                        className="w-16 h-16 rounded border"
                        style={{ backgroundColor: `hsl(${brandData.colors.accent})` }}
                        title="Accent"
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Logo Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Logo Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="logo-main">Main Logo Path</Label>
                    <Input
                      id="logo-main"
                      value={brandData.logo.main}
                      onChange={(e) => setBrandData(prev => ({
                        ...prev,
                        logo: { ...prev.logo, main: e.target.value }
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="logo-white">White Logo Path</Label>
                    <Input
                      id="logo-white"
                      value={brandData.logo.white}
                      onChange={(e) => setBrandData(prev => ({
                        ...prev,
                        logo: { ...prev.logo, white: e.target.value }
                      }))}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Main Logo:</p>
                      <img src={brandData.logo.main} alt="Main Logo" className="h-12 w-auto border rounded" />
                    </div>
                    <div className="bg-gray-800 p-4 rounded">
                      <p className="text-sm text-white mb-2">White Logo:</p>
                      <img src={brandData.logo.white} alt="White Logo" className="h-12 w-auto" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="lg" className="w-full">
                    Save Brand Settings
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Save Brand Settings</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will update the website's brand colors and logos. Changes will be applied immediately.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSaveBrand}>
                      Apply Changes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Live Website Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Preview the live website with your current settings. Open the main website in a new tab to see your changes.
                  </p>
                  <Button 
                    onClick={() => window.open('/', '_blank')}
                    size="lg"
                  >
                    Open Live Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;