import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import bannerImage from "@/assets/thailand-beach-boat.jpg";

const HeroSection = () => {
  return (
    <div className="font-quicksand">
      {/* Desktop and Tablet Layout */}
      <section className="hidden md:flex">
        {/* Image Section - Left Side (60%) */}
        <div 
          className="w-3/5 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Content Section - Right Side (40%) */}
        <div className="w-2/5 bg-white flex items-center">
          <div className="p-6 md:p-8 lg:p-12 w-full">
            <div className="space-y-4 md:space-y-5 lg:space-y-6 text-left">
              {/* Headline */}
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-primary mb-2 md:mb-3 lg:mb-4 leading-tight">
                  Thailand Digital Arrival Card
                </h1>
                <p className="text-sm md:text-base lg:text-xl text-gray-800 mb-4 md:mb-5 lg:mb-6 leading-relaxed font-medium">
                  All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-4 md:space-y-5 lg:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-primary flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base lg:text-lg font-bold text-primary mb-1">
                      Complete application
                    </h3>
                    <p className="text-gray-700 text-xs md:text-sm lg:text-base font-medium">
                      Complete the application form.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-base lg:text-lg font-bold text-primary mb-1">
                      Receive your document
                    </h3>
                    <p className="text-gray-700 text-xs md:text-sm lg:text-base font-medium">
                      Receive your digital arrival card (PDF) via email.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 md:gap-4 pt-2 md:pt-3">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-bold px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
                >
                  Apply For Thailand Digital Arrival Card
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 transition-all duration-300 text-sm md:text-base"
                >
                  Contact us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Layout */}
      <div className="md:hidden relative">
        {/* Background Image Section */}
        <div
          className="h-64 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Content Box */}
        <div className="relative -mt-16 mx-4 z-10">
          <div className="bg-white/95 backdrop-blur-md p-6 shadow-2xl rounded-lg">
            <div className="space-y-5 text-center">
              {/* Headline */}
              <div>
                <h1 className="text-2xl font-bold text-primary mb-3 leading-tight">
                  Thailand Digital Arrival Card
                </h1>
                <p className="text-base text-gray-800 mb-4 leading-relaxed font-medium">
                  All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-primary mb-1">
                      Complete application
                    </h3>
                    <p className="text-gray-700 text-sm font-medium">
                      Complete the application form.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-base font-bold text-primary mb-1">
                      Receive your document
                    </h3>
                    <p className="text-gray-700 text-sm font-medium">
                      Receive your digital arrival card (PDF) via email.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 pt-3">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Apply For Thailand Digital Arrival Card
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-6 py-3 transition-all duration-300"
                >
                  Contact us
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* White Section Below */}
        <div className="bg-white h-16"></div>
      </div>
    </div>
  );
};

export default HeroSection;
