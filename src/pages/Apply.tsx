import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Trash2, Users, Plane, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

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
        description: "Application submitted successfully! We'll process your application and payment separately via secure channels.",
      });
      
      setCurrentStep(3);
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
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8 font-quicksand">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Mobile Title Only */}
          {currentStep <= 2 && (
            <div className="md:hidden mb-6">
              <h1 className="text-2xl font-bold text-slate-800">
                {currentStep === 1 && "Prerequisite"}
                {currentStep === 2 && "Travel Information"}
              </h1>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Desktop Stepper - Left Column */}
            {currentStep <= 2 && (
              <div className="hidden md:block lg:col-span-1">
                <div className="sticky top-8 space-y-4">
                  <h2 className="text-xl font-bold text-slate-800 mb-6">Application Steps</h2>
                  {steps.map((step) => (
                    <div
                      key={step.number}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg border-2 transition-all",
                        step.active
                          ? "border-primary bg-primary/5"
                          : currentStep > step.number
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      )}
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                          step.active
                            ? "bg-primary text-white"
                            : currentStep > step.number
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        )}
                      >
                        {currentStep > step.number ? "✓" : step.number}
                      </div>
                      <span
                        className={cn(
                          "font-medium",
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
            )}

            {/* Main Form Content */}
            <div className={cn(
              currentStep <= 2 ? "lg:col-span-2" : "lg:col-span-3"
            )}>
              {/* Mobile Stepper */}
              {currentStep <= 2 && (
                <div className="md:hidden mb-6">
                  <div className="flex justify-between items-center">
                    {steps.map((step, index) => (
                      <div key={step.number} className="flex items-center">
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                            step.active
                              ? "bg-primary text-white"
                              : currentStep > step.number
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-gray-600"
                          )}
                        >
                          {currentStep > step.number ? "✓" : step.number}
                        </div>
                        {index < steps.length - 1 && (
                          <div
                            className={cn(
                              "w-12 h-0.5 mx-2",
                              currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                            )}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full h-12 border-2 border-gray-200 hover:border-primary focus:border-primary pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date < new Date() || date < new Date("1900-01-01")
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
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
                                    placeholder="Enter passport number" 
                                    className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Name Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                      placeholder="Enter first name" 
                                      className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                      {...field} 
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
                                      placeholder="Enter last name" 
                                      className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                      {...field} 
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
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant={"outline"}
                                        className={cn(
                                          "w-full h-12 border-2 border-gray-200 hover:border-primary focus:border-primary pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick your birth date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                      }
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Nationality and Country of Residence */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.nationality`}
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                    Nationality <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                        <SelectValue placeholder="Select nationality" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
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
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                        <SelectValue placeholder="Select country of residence" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
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

                          {/* Contact Information */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                      type="email"
                                      placeholder="Enter email address" 
                                      className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                      {...field} 
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
                                      type="email"
                                      placeholder="Confirm email address" 
                                      className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Phone Number */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.phoneCode`}
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                    Phone Code <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input 
                                      placeholder="+1" 
                                      className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <div className="md:col-span-2">
                              <FormField
                                control={form.control}
                                name={`travelers.${index}.phone`}
                                render={({ field }) => (
                                  <FormItem className="space-y-3">
                                    <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                                      Phone Number <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                      <Input 
                                        placeholder="Enter phone number" 
                                        className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                        {...field} 
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
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
                                    defaultValue={field.value}
                                    className="flex gap-6"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="male" id={`male-${index}`} />
                                      <Label htmlFor={`male-${index}`}>Male</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="female" id={`female-${index}`} />
                                      <Label htmlFor={`female-${index}`}>Female</Label>
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
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addTraveler}
                          className="w-full py-3 border-dashed border-2 border-primary text-primary hover:bg-primary/5"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Another Traveler (up to 4 total)
                        </Button>
                      )}

                      {/* Navigation */}
                      <div className="pt-6 border-t border-gray-200 flex justify-end">
                        <Button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="px-8 py-3"
                        >
                          Next
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
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Travel Information</h2>
                        <p className="text-slate-600 mb-8">Please provide your travel details</p>
                      </div>

                      {/* Departure Country */}
                      <FormField
                        control={form.control}
                        name="departureCountry"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                              Departure Country. Country/Territory where you Boarded <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                  <SelectValue placeholder="Select departure country" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
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
                              Purpose <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                  <SelectValue placeholder="Select purpose of visit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="tourism">Tourism</SelectItem>
                                <SelectItem value="business">Business</SelectItem>
                                <SelectItem value="transit">Transit</SelectItem>
                                <SelectItem value="medical">Medical</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="meeting_friends_family">Meeting Friends/Family</SelectItem>
                                <SelectItem value="sports">Sports</SelectItem>
                                <SelectItem value="employment">Employment</SelectItem>
                                <SelectItem value="investment">Investment</SelectItem>
                                <SelectItem value="others">Others</SelectItem>
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
                                className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Accommodation Type */}
                      <FormField
                        control={form.control}
                        name="accommodationType"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-base md:text-lg font-bold text-slate-800">
                              Province of Hotel/Accommodation <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary">
                                  <SelectValue placeholder="Select province" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {provinces.map((province) => (
                                  <SelectItem key={province} value={province}>
                                    {province}
                                  </SelectItem>
                                ))}
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
                              Hotel/Accommodation Name & Address (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Enter hotel name and address" 
                                className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Navigation Buttons */}
                      <div className="pt-6 border-t border-gray-200 flex justify-between">
                        <Button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          variant="outline"
                          className="px-8 py-3"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={form.handleSubmit(onSubmit)}
                          disabled={isSubmitting}
                          className="px-8 py-3"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Application"}
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}

                {/* Step 3: Success */}
                {currentStep === 3 && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-800">Application Submitted Successfully!</h2>
                    <p className="text-lg text-slate-600 max-w-md mx-auto">
                      Thank you for your application. We'll review it and contact you with payment instructions and next steps.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={() => navigate('/')} variant="outline">
                        Go Home
                      </Button>
                      <Button onClick={() => window.location.reload()}>
                        Apply Again
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