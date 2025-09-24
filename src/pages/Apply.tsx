import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, UserIcon, X } from "lucide-react";
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

const travelerSchema = z
  .object({
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
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Emails don't match",
    path: ["confirmEmail"],
  });

const formSchema = z.object({
  travelers: z
    .array(travelerSchema)
    .min(1, "At least one traveler is required")
    .max(4, "Maximum 4 travelers allowed"),
});

type FormData = z.infer<typeof formSchema>;

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(1);

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
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "travelers",
  });

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
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
          <div className="md:hidden mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              {currentStep === 1 && "Prerequisite"}
              {currentStep === 2 && "Travel Information"}
              {currentStep === 3 && "Payment"}
            </h1>
            <div className="w-12 h-1 bg-primary mt-2"></div>
          </div>

          {/* Horizontal Stepper for Tablet Only */}
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

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Stepper Sidebar */}
            <div className="hidden lg:block lg:w-64 lg:sticky lg:top-24 lg:h-fit">
              <div className="bg-white rounded-lg shadow-soft p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">
                  Application Steps
                </h2>
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

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-soft p-4 md:p-8">
                {currentStep === 1 && (
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-12"
                    >
                      {fields.map((field, index) => (
                        <div key={field.id} className="space-y-8">
                          {/* Traveler Header */}
                          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <h3 className="text-2xl font-bold text-slate-800">
                              {index === 0
                                ? "Primary Traveler"
                                : `Traveler ${index + 1}`}
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
                                <FormItem>
                                  <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                    Arrival Date{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "w-full pl-3 text-left font-normal h-12 border-2 border-gray-200 hover:border-primary",
                                            !field.value &&
                                              "text-muted-foreground"
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
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date < new Date()
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

                            {/* Passport */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.passport`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                    Passport{" "}
                                    <span className="text-red-500">*</span>
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

                            {/* First Name */}
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.firstName`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                    Name{" "}
                                    <span className="text-red-500">*</span>
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
                                <FormItem>
                                  <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                    Last Name{" "}
                                    <span className="text-red-500">*</span>
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
                                <FormItem>
                                  <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                    Birth Date{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant="outline"
                                          className={cn(
                                            "w-full pl-3 text-left font-normal h-12 border-2 border-gray-200 hover:border-primary",
                                            !field.value &&
                                              "text-muted-foreground"
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
                                    <PopoverContent
                                      className="w-auto p-0"
                                      align="start"
                                    >
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date > new Date() ||
                                          date < new Date("1900-01-01")
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
                                <FormItem>
                                  <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                    Nationality{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary">
                                        <SelectValue placeholder="Select one" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="us">
                                        United States
                                      </SelectItem>
                                      <SelectItem value="uk">
                                        United Kingdom
                                      </SelectItem>
                                      <SelectItem value="ca">
                                        Canada
                                      </SelectItem>
                                      <SelectItem value="au">
                                        Australia
                                      </SelectItem>
                                      <SelectItem value="de">
                                        Germany
                                      </SelectItem>
                                      <SelectItem value="fr">
                                        France
                                      </SelectItem>
                                      <SelectItem value="jp">Japan</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Country of Residence */}
                          <FormField
                            control={form.control}
                            name={`travelers.${index}.countryOfResidence`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                  Country/Territory of Residence{" "}
                                  <span className="text-red-500">*</span>
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary">
                                      <SelectValue placeholder="Select one" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="us">
                                      United States
                                    </SelectItem>
                                    <SelectItem value="uk">
                                      United Kingdom
                                    </SelectItem>
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

                          {/* Email + Confirm Email + Phone */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 items-start">
                            <FormField
                              control={form.control}
                              name={`travelers.${index}.email`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                    Email{" "}
                                    <span className="text-red-500">*</span>
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

                            <FormField
                              control={form.control}
                              name={`travelers.${index}.confirmEmail`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                    Confirm Email{" "}
                                    <span className="text-red-500">*</span>
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

                            <FormField
                              control={form.control}
                              name={`travelers.${index}.phoneCode`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                    Phone Code{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl>
                                      <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-primary">
                                        <SelectValue placeholder="Code" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="+1">+1</SelectItem>
                                      <SelectItem value="+44">+44</SelectItem>
                                      <SelectItem value="+61">+61</SelectItem>
                                      <SelectItem value="+49">+49</SelectItem>
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
                                <FormItem>
                                  <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                    Phone Number{" "}
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="tel"
                                      placeholder="1234567890"
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
                              <FormItem>
                                <FormLabel className="text-lg font-bold text-slate-800 mb-2">
                                  Gender <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-x-6"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="male"
                                        id={`male-${index}`}
                                      />
                                      <Label
                                        htmlFor={`male-${index}`}
                                        className="text-base font-medium text-gray-700"
                                      >
                                        Male
                                      </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem
                                        value="female"
                                        id={`female-${index}`}
                                      />
                                      <Label
                                        htmlFor={`female-${index}`}
                                        className="text-base font-medium text-gray-700"
                                      >
                                        Female
                                      </Label>
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
                          size="lg"
                          onClick={addTraveler}
                          className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          <UserIcon className="h-5 w-5 mr-2" />
                          Add Traveler
                        </Button>
                      )}

                      {/* Next Button */}
                      <div className="flex justify-end pt-4">
                        <Button
                          type="submit"
                          size="lg"
                          className="px-8 bg-primary hover:bg-primary/90 text-white"
                          onClick={() => setCurrentStep(2)}
                        >
                          Next
                        </Button>
                      </div>
                    </form>
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
