import { Card } from "@/components/ui/card";
import { FileText, Mail, Plane } from "lucide-react";

const HowToApply = () => {
  const steps = [
    {
      number: "1",
      title: "Fill out the online form",
      icon: FileText,
      description: "Complete our simple online application form with your travel details and personal information."
    },
    {
      number: "2", 
      title: "Receive your TDAC instantly by email (PDF)",
      icon: Mail,
      description: "Get your Thailand Digital Arrival Card delivered directly to your email as a PDF document."
    },
    {
      number: "3",
      title: "Show it at the airport upon arrival", 
      icon: Plane,
      description: "Present your digital arrival card to immigration officials when you arrive in Thailand."
    }
  ];

  return (
    <section className="py-16 bg-accent/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            How to Apply
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Card key={index} className="relative p-8 bg-white shadow-soft hover:shadow-elegant transition-all duration-300 transform hover:scale-105 border-primary/10">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
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
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/60 to-primary/30 z-10"></div>
                )}
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-6 py-3 shadow-soft">
            <span className="text-primary font-semibold">Great</span>
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-muted-foreground">30,207 reviews on ★ Trustpilot</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToApply;