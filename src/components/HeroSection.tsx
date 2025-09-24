import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import bannerImage from "@/assets/phuket-beach-banner.webp";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center min-h-[600px] flex items-center justify-center lg:justify-end"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Floating Content Box */}
      <div className="
        relative 
        bg-white/85 backdrop-blur-md 
        rounded-2xl shadow-2xl
        p-6 sm:p-8 lg:p-12 
        max-w-xl 
        mx-auto lg:mx-12
      ">
        <div className="space-y-6 text-center lg:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">
              Thailand Digital Arrival Card
            </h1>
            <p className="text-lg sm:text-xl text-gray-800 mb-6 leading-relaxed font-medium">
              All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">Complete application</h3>
                <p className="text-gray-700 text-sm sm:text-base font-medium">Complete the application form.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary mb-1">Receive your document</h3>
                <p className="text-gray-700 text-sm sm:text-base font-medium">
                  Receive your digital arrival card (PDF) via email.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply For Thailand Digital Arrival Card
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-6 py-3 rounded-lg transition-all duration-300"
            >
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
