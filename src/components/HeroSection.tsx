import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import bannerImage from "@/assets/thailand-beach-boat.jpg";

const HeroSection = () => {
  return (
    <section className="font-quicksand">
      {/* Desktop and Tablet */}
      <div
        className="hidden sm:flex relative bg-cover bg-center items-start justify-center lg:justify-end min-h-screen"
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content Box */}
        <div className="relative bg-white/85 backdrop-blur-md p-6 md:p-8 lg:p-12 max-w-2xl w-full md:w-4/5 lg:w-3/5 shadow-2xl">
          <div className="space-y-5 sm:space-y-6 text-center lg:text-left">
            {/* Headline */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-primary mb-3 sm:mb-4 leading-tight">
                Thailand Digital Arrival Card
              </h1>
              <p className="text-base md:text-lg lg:text-2xl text-gray-800 mb-5 sm:mb-6 leading-relaxed font-medium">
                All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-primary flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-primary-foreground" />
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

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 bg-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 lg:w-7 lg:h-7 text-primary-foreground" />
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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3">
              <Button
                size="lg"
                className="w-full sm:w-auto sm:min-w-[200px] lg:min-w-[280px] bg-primary hover:bg-primary-dark text-primary-foreground font-bold px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
              >
                Apply For Thailand Digital Arrival Card
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto sm:min-w-[180px] lg:min-w-[220px] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 transition-all duration-300 text-sm md:text-base"
              >
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="sm:hidden relative">
        {/* Background Image Section */}
        <div
          className="h-[60vh] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${bannerImage})`,
          }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Floating Content Box */}
        <div className="relative -mt-20 mx-4 mb-8">
          <div className="bg-white/90 backdrop-blur-md p-6 shadow-2xl rounded-lg">
            <div className="space-y-4 text-left">
              {/* Headline */}
              <div>
                <h1 className="text-2xl font-bold text-primary mb-2 leading-tight">
                  Thailand Digital Arrival Card
                </h1>
                <p className="text-sm text-gray-800 mb-4 leading-relaxed font-medium">
                  All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary mb-1">
                      Complete application
                    </h3>
                    <p className="text-gray-700 text-xs font-medium">
                      Complete the application form.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary mb-1">
                      Receive your document
                    </h3>
                    <p className="text-gray-700 text-xs font-medium">
                      Receive your digital arrival card (PDF) via email.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-bold px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 text-sm"
                >
                  Apply For Thailand Digital Arrival Card
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-4 py-3 transition-all duration-300 text-sm"
                >
                  Contact us
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* White section below */}
        <div className="bg-white h-20"></div>
      </div>
    </section>
  );
};

export default HeroSection;
