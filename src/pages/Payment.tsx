import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData;

  const handlePayment = async () => {
    if (!formData) {
      toast({
        title: "Error",
        description: "No application data found. Please restart the application process.",
        variant: "destructive",
      });
      navigate('/apply');
      return;
    }

    setIsProcessing(true);
    try {
      // Generate unique session ID for this application
      const sessionId = crypto.randomUUID();
      
      // Save visa application with processing option
      const { data: visaApplication, error: visaError } = await supabase
        .from('visa_applications')
        .insert({
          session_id: sessionId,
          departure_country: formData.departureCountry,
          purpose_of_visit: formData.purposeOfVisit,
          flight_number: formData.flightNumber,
          accommodation_type: formData.accommodationType,
          accommodation_details: formData.accommodationDetails,
          processing_option: formData.processingOption || 'standard',
          status: 'pending'
        })
        .select()
        .single();

      if (visaError) {
        throw visaError;
      }

      // Save travelers
      const travelersData = formData.travelers.map((traveler: any) => ({
        visa_application_id: visaApplication.id,
        first_name: traveler.firstName,
        last_name: traveler.lastName,
        passport_number: traveler.passport,
        date_of_birth: traveler.birthDate.toISOString().split('T')[0],
        arrival_date: traveler.arrivalDate.toISOString().split('T')[0],
        phone: `${traveler.phoneCode}${traveler.phone}`,
        email: traveler.email,
        gender: traveler.gender,
      }));

      const { error: travelersError } = await supabase
        .from('travelers')
        .insert(travelersData);

      if (travelersError) {
        throw travelersError;
      }

      toast({
        title: "Payment processed successfully!",
        description: "Your application has been submitted and payment confirmed.",
      });
      
      navigate('/payment/success');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8 font-quicksand">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-soft p-6 md:p-8">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-center text-green-600 mb-8">Confirm Payment</h1>
              </div>

              <div className="max-w-md mx-auto space-y-6">
                {/* Card Number */}
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      placeholder="Card Number"
                      className="pr-20 h-14 text-lg rounded-2xl border-2"
                      disabled
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                      <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                      <div className="w-8 h-5 bg-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">AE</div>
                    </div>
                  </div>
                </div>

                {/* Expiration and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Expiration (MM/YY)"
                    className="h-14 text-lg rounded-2xl border-2"
                    disabled
                  />
                  <Input
                    placeholder="CVV"
                    className="h-14 text-lg rounded-2xl border-2"
                    disabled
                  />
                </div>

                {/* Pay Now Button */}
                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full h-14 text-xl font-semibold bg-green-500 hover:bg-green-600 rounded-2xl"
                >
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>

                {/* Security Messages */}
                <div className="text-center space-y-2">
                  <p className="text-slate-600">We accept all major credit cards.</p>
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Secure payment.</span>
                  </div>
                </div>

                {/* Previous Button */}
                <div className="flex justify-start mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/apply')}
                    className="px-8 py-3 rounded-xl border-2"
                  >
                    Previous
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payment;