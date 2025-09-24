import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Shield, Headphones, RefreshCw } from "lucide-react";
import arrivalCardImage from "@/assets/arrival-card.png";

const InfoSection = () => {
  const advantages = [
    {
      icon: Clock,
      title: "Request the document any day of the year",
      description: "Available 24/7, 365 days a year"
    },
    {
      icon: RefreshCw,
      title: "Refund guarantee",
      description: "Not satisfied? Request a refund."
    },
    {
      icon: Headphones,
      title: "24/7 customer support",
      description: "Contact us anytime for assistance."
    },
    {
      icon: Shield,
      title: "Simple steps",
      description: "Easy and straightforward process"
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
                What Is an <span className="text-primary-light">Thailand Visa On Arrival</span>?
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  The <strong className="text-primary">Thailand Visa On Arrival</strong>, is a <strong>mandatory document</strong> for travelers visiting Thailand. The system gathers important information about international visitors entering and leaving the country.
                </p>
                
                <p>
                  The purpose of the Travel Declaration Card is to <strong className="text-primary">facilitate the immigration process on arrival in Thailand</strong> and collect data for statistical and security purposes.
                </p>
                
                <p>
                  Previously, the Thailand Visa On Arrival was a physical form that passengers had to fill out upon arrival. The system has now moved to an electronic format, removing all physical paperwork.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-6 py-3 rounded-lg shadow-soft transition-all duration-200"
                >
                  Entry to Thailand &gt;&gt;
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  Check status
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
              Advantages of processing your application with us
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
              Do I need an <span className="text-primary-light">Thailand Visa On Arrival</span>?
            </h2>
          
          <div className="space-y-4 text-center max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground">
              <strong className="text-primary">Yes</strong>, all arriving passengers must have an approved Travel Declaration Card to enter and exit Thailand.
            </p>
            
            <p className="text-lg text-muted-foreground">
              <strong className="text-primary-dark">You will not be granted entry into the country without this vital document.</strong>
            </p>
            
            <p className="text-muted-foreground">
              Remember that an Travel Declaration Card is not the same as a visa. Although you may or may not need a visa to travel to Thailand, <strong className="text-primary">you will always need an Travel Declaration Card.</strong>
            </p>
          </div>
        </div>
        
        {/* Countries Section */}
        <div className="text-center">
        </div>
        
      </div>
    </div>
  );
};

export default InfoSection;