import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Users, Plane, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateInput } from '@/components/ui/date-input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { phoneCodes } from '@/data/phoneCodes';

// Country options for select components
const countries = [
  "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", 
  "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", 
  "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", 
  "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", 
  "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", 
  "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", 
  "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", 
  "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, Democratic Republic", 
  "Cook Islands", "Costa Rica", "Cote D'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", 
  "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", 
  "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", 
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", 
  "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
  "Haiti", "Heard Island & Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", 
  "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
  "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", 
  "Korea", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", 
  "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", 
  "Macao", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", 
  "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", 
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", 
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", 
  "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", 
  "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory", 
  "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", 
  "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", 
  "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Pierre and Miquelon", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", 
  "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia", "South Korea", 
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", 
  "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania", 
  "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", 
  "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", 
  "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", 
  "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", 
  "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
];

// Schema definitions
const travelerSchema = z.object({
  arrivalDate: z.date({
    required_error: "Arrival date is required.",
  }),
  passport: z.string().min(1, "Passport number is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthDate: z.date({
    required_error: "Birth date is required.",
  }),
  nationality: z.string().min(1, "Nationality is required"),
  countryOfResidence: z.string().min(1, "Country of residence is required"),
  email: z.string().email("Invalid email address"),
  confirmEmail: z.string().email("Invalid email address"),
  phoneCode: z.string().min(1, "Phone code is required"),
  phone: z.string().min(1, "Phone number is required"),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
  }),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
});

const formSchema = z.object({
  travelers: z.array(travelerSchema).min(1, "At least one traveler is required").max(4, "Maximum 4 travelers allowed"),
  // Travel information
  departureCountry: z.string().min(1, "Departure country is required"),
  purposeOfVisit: z.string().min(1, "Purpose of visit is required"), 
  flightNumber: z.string().optional(),
  accommodationType: z.string().min(1, "Accommodation type is required"),
  accommodationDetails: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const Apply = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelers: [
        {
          arrivalDate: undefined,
          passport: "",
          firstName: "",
          lastName: "",
          birthDate: undefined,
          nationality: "",
          countryOfResidence: "",
          email: "",
          confirmEmail: "",
          phoneCode: "+66",
          phone: "",
          gender: undefined,
        }
      ],
      departureCountry: "",
      purposeOfVisit: "",
      flightNumber: "",
      accommodationType: "",
      accommodationDetails: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "travelers"
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {      
      // Generate unique session ID for this application
      const sessionId = crypto.randomUUID();
      
      // Save visa application
      const { data: visaApplication, error: visaError } = await supabase
        .from('visa_applications')
        .insert({
          session_id: sessionId,
          departure_country: data.departureCountry,
          purpose_of_visit: data.purposeOfVisit,
          flight_number: data.flightNumber,
          accommodation_type: data.accommodationType,
          accommodation_details: data.accommodationDetails,
          status: 'pending'
        })
        .select()
        .single();

      if (visaError) {
        throw visaError;
      }

      // Save travelers
      const travelersData = data.travelers.map(traveler => ({
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
        title: "Application submitted successfully!",
        description: "We'll process your application and contact you with payment instructions.",
      });
      
      // Reset form and redirect
      form.reset();
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTraveler = () => {
    if (fields.length < 4) {
      append({
        arrivalDate: undefined,
        passport: "",
        firstName: "",
        lastName: "",
        birthDate: undefined,
        nationality: "",
        countryOfResidence: "",
        email: "",
        confirmEmail: "",
        phoneCode: "+66",
        phone: "",
        gender: undefined,
      });
    }
  };

  const removeTraveler = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12 font-quicksand">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Thailand Visa Application</h1>
            <p className="text-xl text-slate-600">Complete your visa application in a few simple steps</p>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                {/* Travelers Section */}
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Traveler Information
                    </h2>
                    <p className="text-slate-600">Provide details for all travelers</p>
                  </div>

                  {fields.map((field, index) => (
                    <div key={field.id} className="border border-gray-200 rounded-lg p-6 space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-slate-800">
                          Traveler {index + 1}
                        </h3>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeTraveler(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* First Name */}
                        <FormField
                          control={form.control}
                          name={`travelers.${index}.firstName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-700">
                                First Name <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter first name" className="h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Last Name */}
                        <FormField
                          control={form.control}
                          name={`travelers.${index}.lastName`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-700">
                                Last Name <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Enter last name" className="h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Birth Date */}
                        <FormField
                          control={form.control}
                          name={`travelers.${index}.birthDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-700">
                                Date of Birth <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <DateInput
                                  value={field.value}
                                  onChange={field.onChange}
                                  placeholder="dd/mm/yyyy"
                                  className="h-12"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Arrival Date */}
                        <FormField
                          control={form.control}
                          name={`travelers.${index}.arrivalDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-700">
                                Arrival Date <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <DateInput
                                  value={field.value}
                                  onChange={field.onChange}
                                  placeholder="dd/mm/yyyy"
                                  className="h-12"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Phone Code */}
                        <FormField
                          control={form.control}
                          name={`travelers.${index}.phoneCode`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-700">
                                Phone Code <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Select code" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-h-60">
                                  {phoneCodes.map((item, idx) => (
                                    <SelectItem key={idx} value={item.code}>
                                      <span className="flex items-center gap-2">
                                        <span>{item.flag}</span>
                                        <span>{item.code}</span>
                                        <span className="text-sm text-muted-foreground">{item.country}</span>
                                      </span>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Phone Number */}
                        <FormField
                          control={form.control}
                          name={`travelers.${index}.phone`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium text-slate-700">
                                Phone Number <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input {...field} type="tel" placeholder="Enter phone number" className="h-12" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg bg-gradient-primary hover:opacity-90 transition-opacity"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Visa Application"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Apply;