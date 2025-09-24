import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import bannerImage from "@/assets/phuket-beach-banner.webp";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center min-h-[600px] flex items-center"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Floating Transparent Content Box */}
      <div className="relative w-full lg:w-1/2 ml-auto bg-white/80 backdrop-blur-md p-8 lg:p-16 rounded-2xl shadow-2xl">
        <div className="space-y-8 text-center lg:text-left max-w-2xl mx-auto">
          <div>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-primary mb-6 leading-tight">
              Thailand Digital Arrival Card
            </h1>
            <p className="text-xl lg:text-2xl text-gray-800 mb-8 leading-relaxed font-medium">
              All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Complete application</h3>
                <p className="text-gray-700 font-medium">Complete the application form.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">Receive your document</h3>
                <p className="text-gray-700 font-medium">
                  Receive your digital arrival card (PDF) via email.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Apply For Thailand Digital Arrival Card
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-8 py-4 rounded-lg transition-all duration-300"
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
