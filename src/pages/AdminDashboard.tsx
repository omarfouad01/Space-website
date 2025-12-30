import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

const AdminDashboard = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Content state
  const [heroContent, setHeroContent] = useState<any>(null);
  const [aboutContent, setAboutContent] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [greenLifeContent, setGreenLifeContent] = useState<any>(null);
  const [finalCtaContent, setFinalCtaContent] = useState<any>(null);
  const [contactInfo, setContactInfo] = useState<any>(null);
  const [brandSettings, setBrandSettings] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Form states
  const [editingService, setEditingService] = useState<any>(null);
  const [editingCaseStudy, setEditingCaseStudy] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'editor' });

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('spaceAdminUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      fetchAllContent();
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_users_20251230')
        .select('*')
        .eq('username', loginForm.username)
        .eq('password_hash', loginForm.password)
        .eq('is_active', true)
        .single();

      if (error || !data) {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
        return;
      }

      // Update last login
      await supabase
        .from('admin_users_20251230')
        .update({ last_login: new Date().toISOString() })
        .eq('id', data.id);

      setCurrentUser(data);
      setIsAuthenticated(true);
      localStorage.setItem('spaceAdminUser', JSON.stringify(data));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${data.username}!`,
      });

      fetchAllContent();
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('spaceAdminUser');
    setLoginForm({ username: '', password: '' });
  };

  const fetchAllContent = async () => {
    try {
      setLoading(true);
      
      const [heroRes, aboutRes, servicesRes, caseStudiesRes, greenLifeRes, finalCtaRes, contactRes, brandRes, usersRes] = await Promise.all([
        supabase.from('hero_content_20251230').select('*').eq('is_active', true).single(),
        supabase.from('about_content_20251230').select('*').eq('is_active', true).single(),
        supabase.from('services_20251230').select('*').eq('is_active', true).order('display_order'),
        supabase.from('case_studies_20251230').select('*').eq('is_active', true).order('display_order'),
        supabase.from('green_life_content_20251230').select('*').eq('is_active', true).single(),
        supabase.from('final_cta_20251230').select('*').eq('is_active', true).single(),
        supabase.from('contact_info_20251230').select('*').eq('is_active', true).single(),
        supabase.from('brand_settings_20251230').select('*').eq('is_active', true).single(),
        supabase.from('admin_users_20251230').select('*').order('created_at')
      ]);
      
      if (heroRes.data) setHeroContent(heroRes.data);
      if (aboutRes.data) setAboutContent(aboutRes.data);
      if (servicesRes.data) setServices(servicesRes.data);
      if (caseStudiesRes.data) setCaseStudies(caseStudiesRes.data);
      if (greenLifeRes.data) setGreenLifeContent(greenLifeRes.data);
      if (finalCtaRes.data) setFinalCtaContent(finalCtaRes.data);
      if (contactRes.data) setContactInfo(contactRes.data);
      if (brandRes.data) setBrandSettings(brandRes.data);
      if (usersRes.data) setUsers(usersRes.data);
      
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: "Error",
        description: "Failed to fetch content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateHeroContent = async () => {
    if (!heroContent) return;
    
    try {
      const { error } = await supabase
        .from('hero_content_20251230')
        .update({
          ...heroContent,
          updated_at: new Date().toISOString(),
          updated_by: currentUser?.id
        })
        .eq('id', heroContent.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Hero content updated successfully",
      });
    } catch (error) {
      console.error('Error updating hero content:', error);
      toast({
        title: "Error",
        description: "Failed to update hero content",
        variant: "destructive",
      });
    }
  };

  const updateAboutContent = async () => {
    if (!aboutContent) return;
    
    try {
      const { error } = await supabase
        .from('about_content_20251230')
        .update({
          ...aboutContent,
          updated_at: new Date().toISOString(),
          updated_by: currentUser?.id
        })
        .eq('id', aboutContent.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "About content updated successfully",
      });
    } catch (error) {
      console.error('Error updating about content:', error);
      toast({
        title: "Error",
        description: "Failed to update about content",
        variant: "destructive",
      });
    }
  };

  const addService = async () => {
    if (!editingService?.title || !editingService?.description || !editingService?.metric) return;
    
    try {
      const { error } = await supabase
        .from('services_20251230')
        .insert([{
          ...editingService,
          display_order: services.length + 1,
          updated_by: currentUser?.id
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Service added successfully",
      });
      
      setEditingService(null);
      fetchAllContent();
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive",
      });
    }
  };

  const updateService = async (service: any) => {
    try {
      const { error } = await supabase
        .from('services_20251230')
        .update({
          ...service,
          updated_at: new Date().toISOString(),
          updated_by: currentUser?.id
        })
        .eq('id', service.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Service updated successfully",
      });
      
      fetchAllContent();
    } catch (error) {
      console.error('Error updating service:', error);
      toast({
        title: "Error",
        description: "Failed to update service",
        variant: "destructive",
      });
    }
  };

  const deleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from('services_20251230')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
      
      fetchAllContent();
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const addUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) return;
    
    try {
      const { error } = await supabase
        .from('admin_users_20251230')
        .insert([{
          username: newUser.username,
          email: newUser.email,
          password_hash: newUser.password,
          role: newUser.role
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User added successfully",
      });
      
      setNewUser({ username: '', email: '', password: '', role: 'editor' });
      fetchAllContent();
    } catch (error) {
      console.error('Error adding user:', error);
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">SPACE Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter password"
              />
            </div>
            <Button 
              onClick={handleLogin} 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-sm text-gray-600 text-center">
              <p>Demo Accounts:</p>
              <p>Admin: admin / space2024admin</p>
              <p>Editor: editor / editor2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">SPACE Admin Dashboard</h1>
              <Badge className="ml-4" variant={currentUser?.role === 'admin' ? 'default' : 'secondary'}>
                {currentUser?.role}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {currentUser?.username}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="hero" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="cases">Case Studies</TabsTrigger>
            <TabsTrigger value="brand">Brand</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* Hero Content Tab */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {heroContent && (
                  <>
                    <div>
                      <Label htmlFor="trust_badge">Trust Badge</Label>
                      <Input
                        id="trust_badge"
                        value={heroContent.trust_badge || ''}
                        onChange={(e) => setHeroContent(prev => ({ ...prev, trust_badge: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="main_headline">Main Headline</Label>
                      <Textarea
                        id="main_headline"
                        value={heroContent.main_headline || ''}
                        onChange={(e) => setHeroContent(prev => ({ ...prev, main_headline: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="subheadline">Subheadline</Label>
                      <Textarea
                        id="subheadline"
                        value={heroContent.subheadline || ''}
                        onChange={(e) => setHeroContent(prev => ({ ...prev, subheadline: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="metrics_text">Metrics Text</Label>
                      <Input
                        id="metrics_text"
                        value={heroContent.metrics_text || ''}
                        onChange={(e) => setHeroContent(prev => ({ ...prev, metrics_text: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="primary_cta_text">Primary CTA Text</Label>
                        <Input
                          id="primary_cta_text"
                          value={heroContent.primary_cta_text || ''}
                          onChange={(e) => setHeroContent(prev => ({ ...prev, primary_cta_text: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="secondary_cta_text">Secondary CTA Text</Label>
                        <Input
                          id="secondary_cta_text"
                          value={heroContent.secondary_cta_text || ''}
                          onChange={(e) => setHeroContent(prev => ({ ...prev, secondary_cta_text: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={updateHeroContent} className="w-full">
                      Update Hero Content
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* About Content Tab */}
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About Section Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {aboutContent && (
                  <>
                    <div>
                      <Label htmlFor="section_title">Section Title</Label>
                      <Input
                        id="section_title"
                        value={aboutContent.section_title || ''}
                        onChange={(e) => setAboutContent(prev => ({ ...prev, section_title: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="intro_text">Intro Text</Label>
                      <Textarea
                        id="intro_text"
                        value={aboutContent.intro_text || ''}
                        onChange={(e) => setAboutContent(prev => ({ ...prev, intro_text: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label>Years Stat</Label>
                        <Input
                          value={aboutContent.years_stat || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, years_stat: e.target.value }))}
                        />
                        <Label className="text-sm">Description</Label>
                        <Input
                          value={aboutContent.years_description || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, years_description: e.target.value }))}
                        />
                        <Label className="text-sm">Detail</Label>
                        <Textarea
                          value={aboutContent.years_detail || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, years_detail: e.target.value }))}
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label>Events Stat</Label>
                        <Input
                          value={aboutContent.events_stat || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, events_stat: e.target.value }))}
                        />
                        <Label className="text-sm">Description</Label>
                        <Input
                          value={aboutContent.events_description || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, events_description: e.target.value }))}
                        />
                        <Label className="text-sm">Detail</Label>
                        <Textarea
                          value={aboutContent.events_detail || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, events_detail: e.target.value }))}
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label>Business Stat</Label>
                        <Input
                          value={aboutContent.business_stat || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, business_stat: e.target.value }))}
                        />
                        <Label className="text-sm">Description</Label>
                        <Input
                          value={aboutContent.business_description || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, business_description: e.target.value }))}
                        />
                        <Label className="text-sm">Detail</Label>
                        <Textarea
                          value={aboutContent.business_detail || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, business_detail: e.target.value }))}
                          rows={2}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="testimonial_quote">Testimonial Quote</Label>
                      <Textarea
                        id="testimonial_quote"
                        value={aboutContent.testimonial_quote || ''}
                        onChange={(e) => setAboutContent(prev => ({ ...prev, testimonial_quote: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="testimonial_author">Testimonial Author</Label>
                        <Input
                          id="testimonial_author"
                          value={aboutContent.testimonial_author || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, testimonial_author: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="testimonial_title">Testimonial Title</Label>
                        <Input
                          id="testimonial_title"
                          value={aboutContent.testimonial_title || ''}
                          onChange={(e) => setAboutContent(prev => ({ ...prev, testimonial_title: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={updateAboutContent} className="w-full">
                      Update About Content
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="service_title">Title</Label>
                    <Input
                      id="service_title"
                      value={editingService?.title || ''}
                      onChange={(e) => setEditingService(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Service title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service_description">Description</Label>
                    <Textarea
                      id="service_description"
                      value={editingService?.description || ''}
                      onChange={(e) => setEditingService(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Service description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="service_metric">Metric</Label>
                    <Input
                      id="service_metric"
                      value={editingService?.metric || ''}
                      onChange={(e) => setEditingService(prev => ({ ...prev, metric: e.target.value }))}
                      placeholder="Performance metric"
                    />
                  </div>
                  <Button onClick={addService}>Add Service</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Existing Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div key={service.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold">{service.title}</h3>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline" onClick={() => setEditingService(service)}>
                              Edit
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => deleteService(service.id)}>
                              Delete
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                        <Badge variant="secondary">{service.metric}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            {currentUser?.role === 'admin' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Add New User</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="new_username">Username</Label>
                        <Input
                          id="new_username"
                          value={newUser.username}
                          onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="new_email">Email</Label>
                        <Input
                          id="new_email"
                          type="email"
                          value={newUser.email}
                          onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="new_password">Password</Label>
                        <Input
                          id="new_password"
                          type="password"
                          value={newUser.password}
                          onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="new_role">Role</Label>
                        <select
                          id="new_role"
                          value={newUser.role}
                          onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full p-2 border rounded"
                        >
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      </div>
                    </div>
                    <Button onClick={addUser}>Add User</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Existing Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div key={user.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <h3 className="font-semibold">{user.username}</h3>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                {user.role}
                              </Badge>
                              <Badge variant={user.is_active ? 'default' : 'destructive'}>
                                {user.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Created: {new Date(user.created_at).toLocaleDateString()}
                            {user.last_login && (
                              <div>Last login: {new Date(user.last_login).toLocaleDateString()}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Live Website Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    View your changes live on the website
                  </p>
                  <Button 
                    onClick={() => window.open('/', '_blank')}
                    className="w-full"
                  >
                    Open Live Website
                  </Button>
                  <div className="text-sm text-gray-500">
                    Changes are applied immediately after saving
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;