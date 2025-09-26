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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';
import { DateInput } from '@/components/ui/date-input';
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

const provinces = [
  "Amnat Charoen", "Ang Thong", "Bangkok", "Bueng Kan", "Buri Ram", "Chachoengsao", 
  "Chai Nat", "Chaiyaphum", "Chanthaburi", "Chiang Mai", "Chiang Rai", "Chon Buri", 
  "Chumphon", "Kalasin", "Kamphaeng Phet", "Kanchanaburi", "Khon Kaen", "Krabi", 
  "Lampang", "Lamphun", "Loei", "Lop Buri", "Mae Hong Son", "Maha Sarakham", 
  "Mukdahan", "Nakhon Nayok", "Nakhon Pathom", "Nakhon Phanom", "Nakhon Ratchasima", 
  "Nakhon Sawan", "Nakhon Si Thammarat", "Nan", "Narathiwat", "Nong Bua Lam Phu", 
  "Nong Khai", "Nonthaburi", "Pathum Thani", "Pattani", "Phang Nga", "Phatthalung", 
  "Phayao", "Phetchabun", "Phetchaburi", "Phichit", "Phitsanulok", "Phra Nakhon Si Ayutthaya", 
  "Phrae", "Phuket", "Prachin Buri", "Prachuap Khiri Khan", "Ranong", "Ratchaburi", 
  "Rayong", "Roi Et", "Sa Kaeo", "Sakon Nakhon", "Samut Prakan", "Samut Sakhon", 
  "Samut Songkhram", "Saraburi", "Satun", "Sing Buri", "Sisaket", "Songkhla", 
  "Sukhothai", "Suphan Buri", "Surat Thani", "Surin", "Tak", "Trang", "Trat", 
  "Ubon Ratchathani", "Udon Thani", "Uthai Thani", "Uttaradit", "Yala", "Yasothon"
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
  // Processing options
  processingOption: z.enum(["fast", "ultra"]).optional(),
});

type FormData = z.infer<typeof formSchema>;

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
          phoneCode: "",
          phone: "",
          gender: undefined,
        }
      ],
      departureCountry: "",
      purposeOfVisit: "",
      flightNumber: "",
      accommodationType: "",
      accommodationDetails: "",
      processingOption: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "travelers"
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Removed dangerous logging of sensitive data
      
      // Generate unique session ID for this application
      const sessionId = crypto.randomUUID();
      
      // Save visa application with processing option
      const { data: visaApplication, error: visaError } = await supabase
        .from('visa_applications')
        .insert({
          session_id: sessionId,
          departure_country: data.departureCountry,
          purpose_of_visit: data.purposeOfVisit,
          flight_number: data.flightNumber,
          accommodation_type: data.accommodationType,
          accommodation_details: data.accommodationDetails,
          processing_option: data.processingOption || 'standard', // Default to standard if not selected
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
        description: "Application submitted successfully! We'll process your application and payment separately via secure channels.",
      });
      
      setCurrentStep(4);
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
        phoneCode: "",
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

  const steps = [
    { number: 1, title: "Prerequisite", active: currentStep === 1 },
    { number: 2, title: "Travel Information", active: currentStep === 2 },
    { number: 3, title: "Payment", active: currentStep === 3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8 font-quicksand">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Mobile Title Only */}
          <div className="lg:hidden mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              {currentStep === 1 && "Prerequisite"}
              {currentStep === 2 && "Travel Information"}
              {currentStep === 3 && "Payment"}
            </h1>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Desktop Stepper - Vertical Left Column */}
            {currentStep <= 3 && (
              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-0 space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-8">Application Steps</h2>
                  <div className="relative">
                    {steps.map((step, index) => (
                      <div key={step.number} className="relative flex items-center mb-8 last:mb-0">
                        {/* Connecting Line */}
                        {index < steps.length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                        )}
                        
                        {/* Step Circle */}
                        <div
                          className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold z-10 mr-4",
                            step.active
                              ? "bg-primary text-white"
                              : currentStep > step.number
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          )}
                        >
                          {currentStep > step.number ? "✓" : step.number}
                        </div>
                        
                        {/* Step Title */}
                        <span
                          className={cn(
                            "text-lg font-medium",
                            step.active
                              ? "text-primary"
                              : currentStep > step.number
                              ? "text-green-700"
                              : "text-gray-600"
                          )}
                        >
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tablet Horizontal Stepper */}
            {currentStep <= 3 && (
              <div className="hidden md:block lg:hidden col-span-full mb-6">
                <div className="flex justify-between items-center bg-white rounded-lg shadow-sm p-6">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-center">
                      <div className="flex items-center">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold",
                            step.active
                              ? "bg-primary text-white"
                              : currentStep > step.number
                              ? "bg-green-500 text-white"
                              : "bg-gray-200 text-gray-600"
                          )}
                        >
                          {currentStep > step.number ? "✓" : step.number}
                        </div>
                        <span
                          className={cn(
                            "ml-3 font-medium",
                            step.active
                              ? "text-primary"
                              : currentStep > step.number
                              ? "text-green-700"
                              : "text-gray-600"
                          )}
                        >
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={cn(
                            "w-16 h-0.5 mx-4",
                            currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Form Content */}
            <div className={cn(
              currentStep <= 3 ? "lg:col-span-4" : "lg:col-span-5"
            )}>
              <div className="bg-white rounded-lg shadow-soft p-6 md:p-8">
                {/* Step 1: Traveler Details */}
                {currentStep === 1 && (
                  <Form {...form}>
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Traveler Details</h2>
                        <p className="text-slate-600 mb-8">Please provide information for all travelers</p>
                      </div>

                      {fields.map((field, index) => (
                        <div key={field.id} className="border border-gray-200 rounded-lg p-6 space-y-6">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                              <Users className="h-5 w-5" />
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
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>

                          {/* Arrival Date */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.arrivalDate`}
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                  Arrival Date in Thailand <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <DateInput
                                    date={field.value}
                                    onDateChange={field.onChange}
                                    placeholder="Pick arrival date"
                                    minDate={new Date()}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Passport Number */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.passport`}
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                  Passport Number <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Passport number" 
                                    {...field} 
                                    className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Full Name */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.firstName`}
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                    First Name <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="First name" 
                                      {...field} 
                                      className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.lastName`}
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                    Last Name <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Last name" 
                                      {...field} 
                                      className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Birth Date */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.birthDate`}
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                  Date of Birth <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <DateInput
                                    date={field.value}
                                    onDateChange={field.onChange}
                                    placeholder="Pick birth date"
                                    maxDate={new Date()}
                                    minDate={new Date("1900-01-01")}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Nationality and Country of Residence */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.nationality`}
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                    Nationality <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                        <SelectValue placeholder="Select nationality" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-64">
                                      {countries.map((country) => (
                                        <SelectItem key={country} value={country}>
                                          {country}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.countryOfResidence`}
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                    Country of Residence <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                        <SelectValue placeholder="Select residence country" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-64">
                                      {countries.map((country) => (
                                        <SelectItem key={country} value={country}>
                                          {country}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Email */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.email`}
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                    Email Address <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Email address" 
                                      type="email"
                                      {...field} 
                                      className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.confirmEmail`}
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                    Confirm Email <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Confirm email address" 
                                      type="email"
                                      {...field} 
                                      className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Phone */}
                          <div className="grid md:grid-cols-3 gap-4">
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.phoneCode`}
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                    Phone Code <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                        <SelectValue placeholder="Select country code" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-64">
                                      {phoneCodes.map((phone) => (
                                        <SelectItem key={phone.code} value={phone.code}>
                                          <div className="flex items-center gap-2">
                                            <span>{phone.flag}</span>
                                            <span>{phone.code}</span>
                                            <span className="text-muted-foreground text-sm">{phone.country}</span>
                                          </div>
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.phone`}
                              render={({ field }) => (
                                <FormItem className="md:col-span-2 space-y-3">
                                  <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                    Phone Number <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="Phone number" 
                                      {...field} 
                                      className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Gender */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.gender`}
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                  Gender <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex space-x-6"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="male" id={`male-${index}`} />
                                      <Label htmlFor={`male-${index}`} className="font-medium">Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="female" id={`female-${index}`} />
                                      <Label htmlFor={`female-${index}`} className="font-medium">Female</Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      ))}

                      {/* Add Traveler Button */}
                      {fields.length < 4 && (
                        <div className="flex flex-col items-center gap-2 p-6 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5 hover:bg-primary/10 transition-all">
                          <Button
                            type="button"
                            variant="default"
                            onClick={addTraveler}
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                            size="lg"
                          >
                            <Plus className="h-5 w-5" />
                            Add Another Traveler
                          </Button>
                          <p className="text-sm text-slate-600">
                            You can add up to 4 travelers ({fields.length}/4)
                          </p>
                        </div>
                      )}

                      {/* Next Step Button */}
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={() => {
                            const travelersValid = form.trigger("travelers");
                            if (travelersValid) {
                              setCurrentStep(2);
                            }
                          }}
                          className="px-8"
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}

                {/* Step 2: Travel Information */}
                {currentStep === 2 && (
                  <Form {...form}>
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3">
                          <Plane className="h-6 w-6" />
                          Travel Information
                        </h2>
                        <p className="text-slate-600 mb-8">Tell us about your travel plans to Thailand</p>
                      </div>

                      {/* Departure Country */}
                      <FormField
                        control={form.control}
                        name="departureCountry"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                              Departure Country <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                  <SelectValue placeholder="Select departure country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-64">
                                {countries.map((country) => (
                                  <SelectItem key={country} value={country}>
                                    {country}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Purpose of Visit */}
                      <FormField
                        control={form.control}
                        name="purposeOfVisit"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                              Purpose of Visit <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                  <SelectValue placeholder="Select purpose of visit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="tourism">Tourism</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="transit">Transit</SelectItem>
                                <SelectItem value="visiting-family">Visiting Family/Friends</SelectItem>
                                <SelectItem value="medical">Medical Treatment</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Flight Number */}
                      <FormField
                        control={form.control}
                        name="flightNumber"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                              Flight Number (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="e.g., TG123" 
                                {...field} 
                                className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Accommodation */}
                      <FormField
                        control={form.control}
                        name="accommodationType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                              <MapPin className="inline h-5 w-5 mr-2" />
                              Accommodation Type <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                  <SelectValue placeholder="Select accommodation type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hotel">Hotel</SelectItem>
                                <SelectItem value="hostel">Hostel</SelectItem>
                                <SelectItem value="resort">Resort</SelectItem>
                                <SelectItem value="airbnb">Airbnb/Vacation Rental</SelectItem>
                                <SelectItem value="friends-family">Friends/Family</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Accommodation Details */}
                      <FormField
                        control={form.control}
                        name="accommodationDetails"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                              Accommodation Details (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Hotel name, address, or other details" 
                                {...field} 
                                className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Navigation Buttons */}
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(1)}
                        >
                          Previous Step
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            const isValid = form.trigger(["departureCountry", "purposeOfVisit", "accommodationType"]);
                            if (isValid) {
                              setCurrentStep(3);
                            }
                          }}
                          className="px-8"
                        >
                          Next Step
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}

                {/* Step 3: Processing Options */}
                {currentStep === 3 && (
                  <Form {...form}>
                    <div className="space-y-8">
                      <div>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
                          <p className="text-center text-slate-800 text-lg font-bold">
                            This document has a cost of <span className="text-2xl font-extrabold text-primary">$49.99</span> by traveler - Estimated delivery time ~ less than 24 hours.
                          </p>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Payment</h2>
                        <p className="text-slate-600 mb-8">Choose your preferred processing speed</p>
                      </div>

                      {/* Processing Options */}
                      <FormField
                        control={form.control}
                        name="processingOption"
                        render={({ field }) => (
                          <FormItem className="space-y-6">
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="space-y-4"
                              >
                                {/* Fast Option */}
                                <div className="flex items-center space-x-4 p-4 border-2 border-blue-200 rounded-lg hover:border-blue-300 transition-colors bg-blue-50">
                                  <RadioGroupItem value="fast" id="fast" />
                                  <Label htmlFor="fast" className="flex-1 cursor-pointer">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-semibold text-blue-800">Fast</div>
                                        <div className="text-blue-600 mt-2">Processed in less than 4 hours</div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-xl font-bold text-blue-600">+ $20.00</div>
                                        <div className="text-sm text-blue-600">Additional fee</div>
                                      </div>
                                    </div>
                                  </Label>
                                </div>

                                {/* Ultra Premium Option */}
                                <div className="flex items-center space-x-4 p-4 border-2 border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
                                  <RadioGroupItem value="ultra" id="ultra" />
                                  <Label htmlFor="ultra" className="flex-1 cursor-pointer">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-semibold text-slate-800">Ultra Premium</div>
                                        <div className="inline-block bg-yellow-200 text-yellow-800 text-sm px-2 py-1 rounded-full mt-2">
                                          Processed in less than one hour
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-xl font-bold text-slate-800">+ $50.00</div>
                                        <div className="text-sm text-slate-600">Additional fee</div>
                                      </div>
                                    </div>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="text-center text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                        * The price to be paid is multiplied by the number of travelers.
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setCurrentStep(2)}
                        >
                          Previous
                        </Button>
                        <Button
                          type="submit"
                          onClick={form.handleSubmit(onSubmit)}
                          disabled={isSubmitting}
                          className="px-8 bg-red-600 hover:bg-red-700 text-white"
                        >
                          {isSubmitting ? "Submitting..." : "Submit"}
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}

                {/* Step 4: Success */}
                {currentStep === 4 && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Application Submitted!</h2>
                    <p className="text-slate-600 max-w-md mx-auto">
                      Your visa application has been successfully submitted. We'll process your application and contact you regarding payment through secure channels.
                    </p>
                    <div className="space-y-4">
                      <Button
                        onClick={() => navigate('/')}
                        className="px-8"
                      >
                        Return to Home
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Apply;