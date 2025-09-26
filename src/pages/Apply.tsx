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
          <div className="lg:hidden mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              {currentStep === 1 && "Prerequisite"}
              {currentStep === 2 && "Travel Information"}
            </h1>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Desktop Stepper - Vertical Left Column */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-8 space-y-6 bg-white p-6 rounded-lg shadow-sm">
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
                          "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold z-10 mr-4 flex-shrink-0",
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

            {/* Tablet Horizontal Stepper */}
            <div className="hidden md:block lg:hidden col-span-full mb-6 sticky top-0 z-10 bg-background">
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

            {/* Main Form Content */}
            <div className="lg:col-span-4">
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
                                <FormLabel className="text-base font-medium text-slate-700">
                                  Arrival Date in Thailand
                                </FormLabel>
                                <FormControl>
                                  <DateInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select arrival date"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Passport */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.passport`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Passport Number</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Enter passport number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Gender */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.gender`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Gender</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.firstName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Enter first name" />
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
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Enter last name" />
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
                                <FormLabel className="text-base font-medium text-slate-700">
                                  Date of birth
                                </FormLabel>
                                <FormControl>
                                  <DateInput
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select birth date"
                                    className="w-full"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Nationality */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.nationality`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nationality</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select nationality" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {countries.map((country) => (
                                          <SelectItem key={country} value={country}>
                                            {country}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Country of Residence */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.countryOfResidence`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Country of Residence</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {countries.map((country) => (
                                          <SelectItem key={country} value={country}>
                                            {country}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.email`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="email" placeholder="Enter email address" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Confirm Email */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.confirmEmail`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Confirm Email Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="email" placeholder="Confirm email address" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Phone Code */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.phoneCode`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Code</FormLabel>
                                  <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Code" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {phoneCodes.map((item) => (
                                          <SelectItem key={item.code} value={item.code}>
                                            {item.country} ({item.code})
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Phone */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.phone`}
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Enter phone number" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      ))}

                      {/* Add Traveler Button */}
                      {fields.length < 4 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addTraveler}
                          className="w-full border-dashed border-2 h-12 text-slate-600 hover:text-slate-800"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Another Traveler (Max 4)
                        </Button>
                      )}

                      {/* Navigation */}
                      <div className="flex justify-end">
                        <Button onClick={() => setCurrentStep(2)} className="px-8">
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
                        <p className="text-slate-600 mb-8">Tell us about your travel plans</p>
                      </div>

                      <div className="space-y-6">
                        {/* Departure Country */}
                        <FormField
                          control={form.control}
                          name="departureCountry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Departure Country</FormLabel>
                              <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select departure country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {countries.map((country) => (
                                      <SelectItem key={country} value={country}>
                                        {country}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Purpose of Visit */}
                          <FormField
                            control={form.control}
                            name="purposeOfVisit"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Purpose of Visit</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select purpose" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="tourism">Tourism</SelectItem>
                                      <SelectItem value="business">Business</SelectItem>
                                      <SelectItem value="transit">Transit</SelectItem>
                                      <SelectItem value="medical">Medical</SelectItem>
                                      <SelectItem value="education">Education</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Flight Number */}
                          <FormField
                            control={form.control}
                            name="flightNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Flight Number (Optional)</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="e.g., TG123" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Accommodation */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Accommodation in Thailand
                          </h3>
                          
                          <FormField
                            control={form.control}
                            name="accommodationType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Accommodation Type</FormLabel>
                                <FormControl>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select accommodation type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="hotel">Hotel</SelectItem>
                                      <SelectItem value="hostel">Hostel</SelectItem>
                                      <SelectItem value="guesthouse">Guesthouse</SelectItem>
                                      <SelectItem value="apartment">Apartment/Condo</SelectItem>
                                      <SelectItem value="resort">Resort</SelectItem>
                                      <SelectItem value="friends_family">Friends/Family</SelectItem>
                                      <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="accommodationDetails"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Accommodation Details (Optional)</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    placeholder="Hotel name, address, or other details" 
                                  />
                                </FormControl>
                                <FormDescription>
                                  Please provide the name and address of your accommodation
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Processing Options */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-slate-800">Processing Options</h3>
                          
                          <FormField
                            control={form.control}
                            name="processingOption"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="grid grid-cols-1 gap-4"
                                  >
                                    <div>
                                      <RadioGroupItem value="fast" id="fast" className="peer sr-only" />
                                      <Label
                                        htmlFor="fast"
                                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                      >
                                        <div className="flex items-center justify-between w-full">
                                          <div className="flex items-center space-x-3">
                                            <div className="space-y-1">
                                              <div className="font-semibold">Fast Track Processing</div>
                                              <div className="text-sm text-slate-600">
                                                Get your visa processed within 24-48 hours
                                              </div>
                                            </div>
                                          </div>
                                          <div className="text-right">
                                            <div className="text-xl font-bold text-slate-800">+ $20.00</div>
                                            <div className="text-sm text-slate-600">Additional fee</div>
                                          </div>
                                        </div>
                                      </Label>
                                    </div>
                                    
                                    <div>
                                      <RadioGroupItem value="ultra" id="ultra" className="peer sr-only" />
                                      <Label
                                        htmlFor="ultra"
                                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                      >
                                        <div className="flex items-center justify-between w-full">
                                          <div className="flex items-center space-x-3">
                                            <div className="space-y-1">
                                              <div className="font-semibold">Ultra Fast Processing</div>
                                              <div className="text-sm text-slate-600">
                                                Emergency processing within 12-24 hours
                                              </div>
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
                        </div>

                        <div className="text-center text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                          * The price to be paid is multiplied by the number of travelers.
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                          >
                            Previous
                          </Button>
                          <Button
                            type="button"
                            onClick={async () => {
                              const isValid = await form.trigger(); // Validate form
                              if (isValid) {
                                const formData = form.getValues();
                                navigate('/payment', { state: { formData } });
                              }
                            }}
                            className="px-8 bg-red-600 hover:bg-red-700 text-white"
                          >
                            Continue to Payment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
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