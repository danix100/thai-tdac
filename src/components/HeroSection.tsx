import { Button } from "@/components/ui/button";
import { FileText, Mail } from "lucide-react";
import bannerImage from "@/assets/phuket-beach-banner.webp";

const HeroSection = () => {
  return (
    <section className="relative bg-white font-quicksand">
      <div className="flex flex-col lg:flex-row items-stretch min-h-[600px] relative">
        {/* Image Section */}
        <div className="w-full lg:w-2/5 flex-shrink-0 relative z-10">
          <img
            src={bannerImage}
            alt="Beautiful Phuket beach with traditional longtail boat and limestone cliffs"
            className="w-full h-full object-cover object-right"
          />
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-3/5 flex items-start justify-center bg-white relative z-0 lg:pl-12 p-6 sm:p-8 lg:p-12">
          <div className="space-y-5 sm:space-y-6 text-center lg:text-left max-w-2xl">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-primary mb-3 sm:mb-4 leading-tight">
                Thailand Digital Arrival Card
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-800 mb-5 sm:mb-6 leading-relaxed font-medium">
                All travellers must present the Thailand Digital Arrival Card to arrival in Thailand
              </p>
            </div>

            {/* Process Steps */}
            <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-primary flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary-foreground" />
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

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary-foreground" />
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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3">
              <Button
                size="lg"
                className="w-full sm:w-auto sm:min-w-[260px] bg-primary hover:bg-primary-dark text-primary-foreground font-bold px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Apply For Thailand Digital Arrival Card
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto sm:min-w-[200px] border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300"
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
