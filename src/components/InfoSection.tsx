import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Shield, Headphones, RefreshCw } from "lucide-react";
import arrivalCardImage from "@/assets/arrival-card.png";

const InfoSection = () => {
  const advantages = [
    {
      icon: Clock,
      title: "Request Anytime",
      description: "Available 24/7, all year round"
    },
    {
      icon: RefreshCw,
      title: "Money-back Guarantee",
      description: "Not satisfied? Claim a refund easily."
    },
    {
      icon: Headphones,
      title: "Support Around the Clock",
      description: "Get help whenever you need it."
    },
    {
      icon: Shield,
      title: "Simple Process",
      description: "Quick and easy application steps"
    }
  ];

  return (
    <div className="py-16 bg-background font-quicksand">
      <div className="container mx-auto px-4 space-y-16">
        
        {/* What is Thailand Visa on Arrival Section */}
        <div className="mx-4 lg:mx-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">
                What Is a <span className="text-primary-light">Thailand Visa On Arrival</span>?
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The <strong className="text-primary">Thailand Visa On Arrival</strong> is an essential document for travelers entering Thailand. It collects key information about international visitors for entry and exit records.
                </p>
                
                <p>
                  The Travel Declaration Card helps <strong className="text-primary">speed up immigration procedures upon arrival</strong> and supports statistical and security requirements.
                </p>
                
                <p>
                  Previously a paper form filled out at the airport, the process is now fully electronic, eliminating all physical paperwork.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-6 py-3 rounded-lg shadow-soft transition-all duration-200"
                >
                  Enter Thailand &gt;&gt;
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  Check Status
                </Button>
              </div>
            </div>
            
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <img 
                    src={arrivalCardImage} 
                    alt="Thailand Digital Arrival Card Preview" 
                    className="w-full h-auto rounded-lg shadow-soft"
                  />
                </div>
              </div>
          </div>
        </div>
        
        {/* Advantages Section */}
        <div className="bg-primary rounded-3xl p-8 lg:p-12 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Why Choose Us for Your Application
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <Card key={index} className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20 shadow-soft hover:shadow-elegant hover:bg-white/15 transition-all duration-300">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-primary-foreground mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    {advantage.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
        
        {/* Do I Need Section */}
        <div className="bg-accent/30 rounded-3xl p-8 lg:p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-6 text-center">
              Do I need a <span className="text-primary-light">Thailand Visa On Arrival</span>?
            </h2>
          
          <div className="space-y-4 text-center max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground">
              <strong className="text-primary">Yes</strong>, every arriving traveler must have an approved Travel Declaration Card to enter or
