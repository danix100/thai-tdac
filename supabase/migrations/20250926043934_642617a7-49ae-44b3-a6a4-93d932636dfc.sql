-- Create table for visa applications
CREATE TABLE public.visa_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  departure_country TEXT,
  purpose_of_visit TEXT,
  flight_number TEXT,
  accommodation_type TEXT,
  accommodation_details TEXT,
  card_number TEXT,
  expiry_date TEXT,
  cardholder_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for travelers (linked to visa applications)
CREATE TABLE public.travelers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visa_application_id UUID NOT NULL REFERENCES public.visa_applications(id) ON DELETE CASCADE,
  arrival_date DATE NOT NULL,
  passport_number TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  gender TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  nationality TEXT NOT NULL,
  passport TEXT NOT NULL,
  email TEXT NOT NULL,
  confirm_email TEXT NOT NULL,
  reason TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.visa_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.travelers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (since these are form submissions before authentication)
CREATE POLICY "Anyone can insert visa applications" 
ON public.visa_applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can insert travelers" 
ON public.travelers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can insert contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Admin access policies (for future admin functionality)
CREATE POLICY "Admins can view all visa applications" 
ON public.visa_applications 
FOR SELECT 
USING (false); -- Will be updated when admin system is implemented

CREATE POLICY "Admins can view all travelers" 
ON public.travelers 
FOR SELECT 
USING (false); -- Will be updated when admin system is implemented

CREATE POLICY "Admins can view all contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (false); -- Will be updated when admin system is implemented

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_visa_applications_updated_at
  BEFORE UPDATE ON public.visa_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_visa_applications_session_id ON public.visa_applications(session_id);
CREATE INDEX idx_visa_applications_created_at ON public.visa_applications(created_at);
CREATE INDEX idx_travelers_visa_application_id ON public.travelers(visa_application_id);
CREATE INDEX idx_contact_submissions_created_at ON public.contact_submissions(created_at);