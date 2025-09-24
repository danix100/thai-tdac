import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, UserIcon, X, CreditCard, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const travelerSchema = z.object({
  arrivalDate: z.date({
    required_error: "Arrival date is required.",
  }),
  passport: z.string().min(1, "Passport number is required").max(20, "Passport number too long"),
  firstName: z.string().min(1, "First name is required").max(50, "First name too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long"),
  birthDate: z.date({
    required_error: "Birth date is required.",
  }),
  nationality: z.string().min(1, "Nationality is required"),
  countryOfResidence: z.string().min(1, "Country of residence is required"),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  confirmEmail: z.string().email("Invalid email address").max(255, "Email too long"),
  phoneCode: z.string().min(1, "Phone code is required"),
  phone: z.string().min(1, "Phone number is required").max(20, "Phone number too long"),
  gender: z.enum(["male", "female"], {
    required_error: "Gender is required",
  }),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails don't match",
  path: ["confirmEmail"],
});

const formSchema = z.object({
  travelers: z.array(travelerSchema).min(1, "At least one traveler is required").max(4, "Maximum 4 travelers allowed"),
});

type FormData = z.infer<typeof formSchema>;

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(1);
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
      ]
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "travelers"
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    // Handle form submission
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
          {currentStep <= 3 && (
            <div className="md:hidden mb-6">
              <h1 className="text-2xl font-bold text-slate-800">
                {currentStep === 1 && "Prerequisite"}
                {currentStep === 2 && "Travel Information"}
                {currentStep === 3 && "Payment"}
              </h1>
              <div className="w-12 h-1 bg-primary mt-2"></div>
            </div>
          )}

          {/* Horizontal Stepper for Tablet Only */}
          {currentStep <= 3 && (
            <div className="hidden md:block lg:hidden mb-8">
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="flex items-center justify-center">
                {steps.map((step, index) => (
                  <div key={step.number} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
                          step.active
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-200 text-gray-500"
                        )}
                      >
                        {step.number}
                      </div>
                      <span
                        className={cn(
                          "mt-2 text-sm font-medium text-center",
                          step.active ? "text-primary" : "text-gray-500"
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-16 h-0.5 bg-gray-200 mx-4 mt-[-20px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Stepper Sidebar */}
            {currentStep <= 3 && (
              <div className="hidden lg:block lg:w-64 lg:sticky lg:top-24 lg:h-fit">
              <div className="bg-white rounded-lg shadow-soft p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Application Steps</h2>
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <div key={step.number} className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold",
                            step.active
                              ? "bg-primary text-primary-foreground"
                              : "bg-gray-200 text-gray-500"
                          )}
                        >
                          {step.number}
                        </div>
                        {index < steps.length - 1 && (
                          <div className="w-0.5 h-12 bg-gray-200 mt-2" />
                        )}
                      </div>
                      <div className="mt-2">
                        <span
                          className={cn(
                            "text-base font-semibold",
                            step.active ? "text-slate-800" : "text-gray-500"
                          )}
                        >
                          {step.title}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            )}

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-soft p-4 md:p-8">
                {currentStep === 1 && (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                    {fields.map((field, index) => (
                      <div key={field.id} className="space-y-8">
                        {/* Traveler Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                          <h3 className="text-2xl font-bold text-slate-800">
                            {index === 0 ? "Primary Traveler" : `Traveler ${index + 1}`}
                          </h3>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeTraveler(index)}
                              className="text-red-500 border-red-200 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 items-start">
                          {/* Arrival Date */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.arrivalDate`}
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-bold text-slate-800">
                                  Arrival Date <span className="text-red-500">*</span>
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-full pl-3 text-left font-normal h-12 border-2 border-gray-200 hover:border-primary",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select arrival date</span>
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
                                      disabled={(date) => date < new Date()}
                                      initialFocus
                                      className={cn("p-3 pointer-events-auto")}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Passport */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.passport`}
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-bold text-slate-800">
                                  Passport <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="1234567"
                                    className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Name */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.firstName`}
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-bold text-slate-800">
                                  Name <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Wilson"
                                    className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    {...field}
                                  />
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
                              <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-bold text-slate-800">
                                  Last Name <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Johnson"
                                    className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    {...field}
                                  />
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
                              <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-bold text-slate-800">
                                  Birth Date <span className="text-red-500">*</span>
                                </FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-full pl-3 text-left font-normal h-12 border-2 border-gray-200 hover:border-primary",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Select birth date</span>
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
                                      className={cn("p-3 pointer-events-auto")}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Nationality */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.nationality`}
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-bold text-slate-800">
                                  Nationality <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary">
                                      <SelectValue placeholder="Select one" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                    <SelectItem value="au">Australia</SelectItem>
                                    <SelectItem value="de">Germany</SelectItem>
                                    <SelectItem value="fr">France</SelectItem>
                                    <SelectItem value="jp">Japan</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        {/* Country/Territory of Residence */}
                        <FormField
                          control={form.control}
                          name={`travelers.${index}.countryOfResidence`}
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-lg font-bold text-slate-800">
                                Country/Territory of Residence <span className="text-red-500">*</span>
                              </FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary">
                                    <SelectValue placeholder="Select one" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="us">United States</SelectItem>
                                  <SelectItem value="uk">United Kingdom</SelectItem>
                                  <SelectItem value="ca">Canada</SelectItem>
                                  <SelectItem value="au">Australia</SelectItem>
                                  <SelectItem value="de">Germany</SelectItem>
                                  <SelectItem value="fr">France</SelectItem>
                                  <SelectItem value="jp">Japan</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 items-start">
                          {/* Email */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.email`}
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-bold text-slate-800">
                                  Email <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="wilson@johnson.com"
                                    className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    {...field}
                                  />
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
                              <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-bold text-slate-800">
                                  Confirm Email <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="wilson@johnson.com"
                                    className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    {...field}
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
                              <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-bold text-slate-800">
                                  Phone Code <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary">
                                      <SelectValue placeholder="Select one" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="+1">+1 (US/Canada)</SelectItem>
                                    <SelectItem value="+44">+44 (UK)</SelectItem>
                                    <SelectItem value="+61">+61 (Australia)</SelectItem>
                                    <SelectItem value="+49">+49 (Germany)</SelectItem>
                                    <SelectItem value="+33">+33 (France)</SelectItem>
                                    <SelectItem value="+81">+81 (Japan)</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* Phone */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.phone`}
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-lg font-bold text-slate-800">
                                  Phone <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="123456789"
                                    className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                                    {...field}
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
                            <FormItem className="space-y-4">
                              <FormLabel className="text-lg font-bold text-slate-800">
                                Gender <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-2"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-primary transition-all">
                                      <RadioGroupItem value="male" id={`male-${index}`} />
                                      <UserIcon className="h-5 w-5 text-blue-500" />
                                      <Label htmlFor={`male-${index}`} className="font-semibold cursor-pointer text-slate-700">
                                        Male
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-primary transition-all">
                                      <RadioGroupItem value="female" id={`female-${index}`} />
                                      <UserIcon className="h-5 w-5 text-pink-500" />
                                      <Label htmlFor={`female-${index}`} className="font-semibold cursor-pointer text-slate-700">
                                        Female
                                      </Label>
                                    </div>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}

                    {/* Add Other Traveler Button */}
                    {fields.length < 4 && (
                      <div className="pt-4 border-t border-gray-200">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addTraveler}
                          className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 transition-all"
                        >
                          Add Other Traveler ({fields.length}/4)
                        </Button>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-200">
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-4 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        <span className="block md:hidden">Continue</span>
                        <span className="hidden md:block">Continue to Travel Information</span>
                      </Button>
                    </div>
                  </form>
                </Form>
                )}

                {currentStep === 2 && (
                  <div className="space-y-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-8">Arrival Information</h2>
                    
                    <div className="space-y-6">
                      {/* Departure Country */}
                      <div className="space-y-3">
                        <Label className="text-base md:text-lg font-bold text-slate-800">
                          Departure Country. Country/Territory where you Boarded
                        </Label>
                        <Select>
                          <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="sg">Singapore</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Purpose */}
                      <div className="space-y-3">
                        <Label className="text-base md:text-lg font-bold text-slate-800">
                          Purpose
                        </Label>
                        <Select>
                          <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tourism">Tourism</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="transit">Transit</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Flight Number */}
                    <div className="space-y-3">
                      <Label className="text-base md:text-lg font-bold text-slate-800">Flight Number</Label>
                      <Input 
                        placeholder="1234567" 
                        className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary text-gray-400"
                      />
                    </div>

                    {/* Accommodation Information */}
                    <div className="space-y-6 mt-12">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800">Accommodation Information</h3>
                      
                      {/* Province of Hotel */}
                      <div className="space-y-3">
                        <Label className="text-base md:text-lg font-bold text-slate-800">
                          Province of Hotel/Accommodation
                        </Label>
                        <Select>
                          <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary">
                            <SelectValue placeholder="Select one" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bangkok">Bangkok</SelectItem>
                            <SelectItem value="phuket">Phuket</SelectItem>
                            <SelectItem value="chiang-mai">Chiang Mai</SelectItem>
                            <SelectItem value="pattaya">Pattaya</SelectItem>
                            <SelectItem value="krabi">Krabi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Address */}
                      <div className="space-y-3">
                        <Label className="text-base md:text-lg font-bold text-slate-800">
                          Address or name of Hotel/Accommodation
                        </Label>
                        <textarea
                          className="w-full min-h-[120px] p-4 border-2 border-gray-200 rounded-md hover:border-primary focus:border-primary focus:outline-none resize-none text-gray-400"
                          placeholder="Insert the address of the hotel or accommodation where you will be staying in Thailand."
                        />
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row gap-4 md:justify-between">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="w-full md:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-4 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-lg transition-all order-2 md:order-1"
                      >
                        Back to Prerequisite
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-4 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-lg shadow-md hover:shadow-lg transition-all order-1 md:order-2"
                      >
                        <span className="block md:hidden">Continue</span>
                        <span className="hidden md:block">Continue to Payment</span>
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Confirm Payment</h2>
                    </div>

                    <div className="max-w-md mx-auto space-y-6">
                      {/* Card Number */}
                      <div className="space-y-3">
                        <Label className="text-base font-medium text-slate-800">Card Number</Label>
                        <div className="relative">
                          <Input 
                            placeholder="1234 5678 9012 3456"
                            className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary pr-20"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                            <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                            <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                            <div className="w-8 h-5 bg-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">AE</div>
                          </div>
                        </div>
                      </div>

                      {/* Expiration and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label className="text-base font-medium text-slate-800">Expiration (MM/YY)</Label>
                          <Input 
                            placeholder="12/25"
                            className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                          />
                        </div>
                        <div className="space-y-3">
                          <Label className="text-base font-medium text-slate-800">CVV</Label>
                          <Input 
                            placeholder="123"
                            className="h-12 border-2 border-gray-200 hover:border-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      {/* Pay Now Button */}
                      <Button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 text-lg rounded-lg shadow-md hover:shadow-lg transition-all mt-8"
                      >
                        Pay Now
                      </Button>

                      {/* Security Info */}
                      <div className="text-center space-y-2 mt-6">
                        <p className="text-sm text-slate-600">We accept all major credit cards.</p>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                          <Lock className="h-4 w-4 text-green-500" />
                          <span>Secure payment.</span>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="pt-6 border-t border-gray-200 flex justify-start">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(2)}
                        className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-3 text-base rounded-lg transition-all"
                      >
                        Previous
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === 4 && (
                  <div className="space-y-8 text-center max-w-2xl mx-auto">
                    <div className="space-y-6">
                      <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Thank You!</h2>
                      
                      <div className="space-y-4">
                        <p className="text-lg text-slate-600">
                          Your application has been submitted successfully.
                        </p>
                        <p className="text-base text-slate-500">
                          Updates will be sent to your email address. Please check your inbox for confirmation and further instructions.
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
                      <Button
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 text-lg rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        Back to Home
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setCurrentStep(1);
                          // Reset form data
                          form.reset({
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
                            ]
                          });
                        }}
                        className="w-full md:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8 py-4 text-lg rounded-lg transition-all"
                      >
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