import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Mail, CheckCircle } from "lucide-react";
import bannerImage from "@/assets/phuket-beach-banner.webp";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-accent/30 to-accent/50 py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <img 
                src={bannerImage} 
                alt="Beautiful Phuket beach with traditional longtail boat and limestone cliffs"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-primary mb-4 leading-tight">
                Thailand Digital Arrival Card
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
              </p>
            </div>
            
            {/* Process Steps */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-primary/20 shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Complete application</h3>
                    <p className="text-sm text-muted-foreground">Complete the application form.</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-primary/20 shadow-soft hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary mb-2">Receive you document</h3>
                    <p className="text-sm text-muted-foreground">Receive your digital arrival card (PDF) via email.</p>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-semibold px-8 py-4 rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Apply For Thailand Digital Arrival Card
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;