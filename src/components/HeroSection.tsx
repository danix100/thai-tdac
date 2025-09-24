import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import bannerImage from "@/assets/phuket-beach-banner.webp";

const HeroSection = () => {
  return (
    <section className="relative bg-white font-quicksand">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Image Section - Smaller portion on desktop */}
        <div className="w-full lg:w-2/5 relative">
          <img
            src={bannerImage}
            alt="Beautiful Phuket beach with traditional longtail boat and limestone cliffs"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-6 sm:p-8 lg:p-16 bg-white">
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left max-w-2xl">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-primary mb-4 sm:mb-6 leading-tight">
                Thailand Digital Arrival Card
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 mb-6 sm:mb-8 leading-relaxed font-medium">
                All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">
                    Complete application
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base font-medium">
                    Complete the application form.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">
                    Receive your document
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base font-medium">
                    Receive your digital arrival card (PDF) via email.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-dark text-primary-foreground font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Apply For Thailand Digital Arrival Card
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300"
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
