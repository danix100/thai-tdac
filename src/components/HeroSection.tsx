import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import bannerImage from "@/assets/phuket-beach-banner.webp";

const HeroSection = () => {
  return (
    <section className="relative bg-white font-quicksand">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Image Section */}
        <div className="w-full lg:w-2/5 relative">
          <img
            src={bannerImage}
            alt="Beautiful Phuket beach with traditional longtail boat and limestone cliffs"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-3/5 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-white">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left max-w-2xl">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4 leading-snug">
                Thailand Digital Arrival Card
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-800 mb-4 sm:mb-6 leading-relaxed font-medium">
                All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-1">
                    Complete application
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base font-medium">
                    Complete the application form.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary mb-1">
                    Receive your document
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base font-medium">
                    Receive your digital arrival card (PDF) via email.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary-dark text-primary-foreground font-bold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Apply For Thailand Digital Arrival Card
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-5 py-2.5 rounded-lg transition-all duration-300"
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
