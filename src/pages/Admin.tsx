import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Users, MessageSquare, FileText, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { User, Session } from '@supabase/supabase-js';

interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  nationality: string;
  passport: string;
  email: string;
  reason: string;
  content: string;
  created_at: string;
}

interface VisaApplication {
  id: string;
  session_id: string;
  departure_country: string;
  purpose_of_visit: string;
  flight_number: string;
  accommodation_type: string;
  accommodation_details: string;
  status: string;
  created_at: string;
}

interface Traveler {
  id: string;
  visa_application_id: string;
  first_name: string;
  last_name: string;
  passport_number: string;
  date_of_birth: string;
  arrival_date: string;
  phone: string;
  email: string;
  gender: string;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [visaApplications, setVisaApplications] = useState<VisaApplication[]>([]);
  const [travelers, setTravelers] = useState<Traveler[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        // Redirect unauthenticated users
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch contact submissions
      const { data: contacts, error: contactError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (contactError) throw contactError;
      setContactSubmissions(contacts || []);

      // Fetch visa applications
      const { data: visas, error: visaError } = await supabase
        .from('visa_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (visaError) throw visaError;
      setVisaApplications(visas || []);

      // Fetch travelers
      const { data: travelersData, error: travelersError } = await supabase
        .from('travelers')
        .select('*')
        .order('created_at', { ascending: false });

      if (travelersError) throw travelersError;
      setTravelers(travelersData || []);

    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message || "Failed to load admin data",
        variant: "destructive",
      });
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12 font-quicksand">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
              <p className="text-slate-600">Welcome back, {user.email}</p>
            </div>
            <Button onClick={signOut} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contact Submissions</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contactSubmissions.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visa Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{visaApplications.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Travelers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{travelers.length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="contacts" className="w-full">
            <TabsList>
              <TabsTrigger value="contacts">Contact Submissions</TabsTrigger>
              <TabsTrigger value="visas">Visa Applications</TabsTrigger>
              <TabsTrigger value="travelers">Travelers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contacts" className="space-y-4">
              {contactSubmissions.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No contact submissions yet</p>
                  </CardContent>
                </Card>
              ) : (
                contactSubmissions.map((contact) => (
                  <Card key={contact.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {contact.first_name} {contact.last_name}
                          </CardTitle>
                          <CardDescription>{contact.email}</CardDescription>
                        </div>
                        <Badge variant="secondary">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <span className="font-medium">Nationality:</span> {contact.nationality}
                        </div>
                        <div>
                          <span className="font-medium">Passport:</span> {contact.passport}
                        </div>
                        <div>
                          <span className="font-medium">Reason:</span> {contact.reason}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Message:</span>
                        <p className="mt-2 text-sm text-muted-foreground">{contact.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="visas" className="space-y-4">
              {visaApplications.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No visa applications yet</p>
                  </CardContent>
                </Card>
              ) : (
                visaApplications.map((visa) => (
                  <Card key={visa.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">
                          Application #{visa.session_id.slice(0, 8)}
                        </CardTitle>
                        <Badge variant={visa.status === 'pending' ? 'secondary' : 'default'}>
                          {visa.status}
                        </Badge>
                      </div>
                      <CardDescription>
                        {new Date(visa.created_at).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="font-medium">Departure:</span> {visa.departure_country}
                        </div>
                        <div>
                          <span className="font-medium">Purpose:</span> {visa.purpose_of_visit}
                        </div>
                        <div>
                          <span className="font-medium">Flight:</span> {visa.flight_number || 'Not provided'}
                        </div>
                        <div>
                          <span className="font-medium">Accommodation:</span> {visa.accommodation_type}
                        </div>
                        {visa.accommodation_details && (
                          <div className="col-span-2">
                            <span className="font-medium">Details:</span> {visa.accommodation_details}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="travelers" className="space-y-4">
              {travelers.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No travelers yet</p>
                  </CardContent>
                </Card>
              ) : (
                travelers.map((traveler) => (
                  <Card key={traveler.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {traveler.first_name} {traveler.last_name}
                      </CardTitle>
                      <CardDescription>{traveler.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="font-medium">Passport:</span> {traveler.passport_number}
                        </div>
                        <div>
                          <span className="font-medium">DOB:</span> {new Date(traveler.date_of_birth).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Arrival:</span> {new Date(traveler.arrival_date).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium">Phone:</span> {traveler.phone}
                        </div>
                        <div>
                          <span className="font-medium">Gender:</span> {traveler.gender}
                        </div>
                        <div>
                          <span className="font-medium">Applied:</span> {new Date(traveler.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;