import { Card } from "@/components/ui/card";
import { FileText, Mail, Plane } from "lucide-react";

const HowToApply = () => {
  const steps = [
    {
      number: "1",
      title: "Fill out the online form",
      icon: FileText,
      description:
        "Complete our simple online application form with your travel details and personal information.",
    },
    {
      number: "2",
      title: "Receive your TDAC instantly by email (PDF)",
      icon: Mail,
      description:
        "Get your Thailand Digital Arrival Card delivered directly to your email as a PDF document.",
    },
    {
      number: "3",
      title: "Show it at the airport upon arrival",
      icon: Plane,
      description:
        "Present your digital arrival card to immigration officials when you arrive in Thailand.",
    },
  ];

  return (
    <section className="py-16 bg-accent/30 font-quicksand">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            How to Apply
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card
                key={index}
                className="relative p-8 bg-white shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105 border-primary/10"
              >
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-light text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Trustpilot Rating */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-8 py-4 shadow-soft">
            <span className="text-[#00B67A] font-semibold text-lg sm:text-xl">
              Great
            </span>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src="https://images-static.trustpilot.com/api/stars/4/star.svg"
                  alt="Trustpilot star"
                  className="w-7 h-7 sm:w-8 sm:h-8"
                />
              ))}
            </div>
            <span className="text-black text-sm sm:text-base font-medium">
              30,207 reviews on{" "}
              <span className="text-[#00B67A]">★ Trustpilot</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToApply;
