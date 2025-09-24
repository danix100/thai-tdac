import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, UserIcon } from "lucide-react";
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

const formSchema = z.object({
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

type FormData = z.infer<typeof formSchema>;

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    // Handle form submission
  };

  const steps = [
    { number: 1, title: "Prerequisite", active: true },
    { number: 2, title: "Travel Information", active: false },
    { number: 3, title: "Payment", active: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-8 font-quicksand">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Stepper (Desktop) / Title (Mobile) */}
            <div className="lg:w-64 lg:sticky lg:top-24 lg:h-fit">
              {/* Mobile Title */}
              <div className="lg:hidden mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Prerequisite</h1>
                <div className="w-12 h-1 bg-primary mt-2"></div>
              </div>
              
              {/* Desktop Stepper */}
              <div className="hidden lg:block bg-white rounded-lg shadow-soft p-6">
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
                            "text-sm font-semibold",
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

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-soft p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Arrival Date */}
                      <FormField
                        control={form.control}
                        name="arrivalDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                              Arrival Date
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
                        name="passport"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                              Passport
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
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                              Name
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
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                              Last Name
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
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                              Birth Date
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
                        name="nationality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                              Nationality
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
                      name="countryOfResidence"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                            Country/Territory of Residence
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                              Email
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
                        name="confirmEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                              Confirm Email
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
                        name="phoneCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                              Phone Code
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
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                              Phone
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
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel className="text-lg font-bold text-slate-800">
                            Gender
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-primary transition-all">
                                  <RadioGroupItem value="male" id="male" />
                                  <UserIcon className="h-5 w-5 text-blue-500" />
                                  <Label htmlFor="male" className="font-semibold cursor-pointer text-slate-700">
                                    Male
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-3 border-2 border-gray-200 rounded-lg p-4 hover:bg-gray-50 hover:border-primary transition-all">
                                  <RadioGroupItem value="female" id="female" />
                                  <UserIcon className="h-5 w-5 text-pink-500" />
                                  <Label htmlFor="female" className="font-semibold cursor-pointer text-slate-700">
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

                    {/* Add Other Traveler Button */}
                    <div className="pt-4 border-t border-gray-200">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 transition-all"
                      >
                        Add Other Traveler
                      </Button>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6 border-t border-gray-200">
                      <Button
                        type="submit"
                        className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 text-lg rounded-lg shadow-md hover:shadow-lg transition-all"
                      >
                        Continue to Travel Information
                      </Button>
                    </div>
                  </form>
                </Form>
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