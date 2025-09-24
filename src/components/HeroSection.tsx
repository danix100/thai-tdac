import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import bannerImage from "@/assets/thailand-beach-boat.jpg";

const HeroSection = () => {
  return (
    <div className="font-quicksand">
      {/* Desktop and Tablet Layout */}
      <section 
        className="hidden md:block relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content Box - Larger and more transparent */}
        <div className="relative flex items-center justify-center min-h-[70vh]">
          <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 lg:p-16 max-w-4xl w-full md:w-4/5 lg:w-3/4 shadow-2xl mx-4">
            <div className="space-y-6 md:space-y-8 lg:space-y-10 text-left">
              {/* Headline */}
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-primary mb-3 md:mb-4 lg:mb-6 leading-tight">
                  Thailand Digital Arrival Card
                </h1>
                <p className="text-base md:text-lg lg:text-2xl text-gray-800 mb-6 md:mb-8 lg:mb-10 leading-relaxed font-medium">
                  All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
                </p>
              </div>

              {/* Process Steps */}
              <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-primary flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-primary mb-2">
                      Complete application
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base lg:text-lg font-medium">
                      Complete the application form.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-primary mb-2">
                      Receive your document
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base lg:text-lg font-medium">
                      Receive your digital arrival card (PDF) via email.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col md:flex-row gap-4 md:gap-6 pt-4 md:pt-6">
                <Button
                  size="lg"
                  className="w-full md:w-auto md:min-w-[280px] lg:min-w-[320px] bg-primary hover:bg-primary-dark text-primary-foreground font-bold px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 shadow-lg hover:shadow-xl transition-all duration-300 text-base md:text-lg"
                >
                  Apply For Thailand Digital Arrival Card
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full md:w-auto md:min-w-[220px] lg:min-w-[260px] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-6 md:px-8 lg:px-10 py-3 md:py-4 lg:py-5 transition-all duration-300 text-base md:text-lg"
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
