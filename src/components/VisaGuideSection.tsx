import thailandCoupleImage from '@/assets/thailand-couple.png';

const VisaGuideSection = () => {
  return (
    <section className="py-16 bg-background font-quicksand">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Content */}
          <div className="w-full md:w-3/5 lg:w-1/2 flex flex-col justify-center space-y-4 order-2 md:order-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary leading-tight">
              How to Get an Thailand Visa On Arrival
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                You can easily apply for your Thailand Visa On Arrival using our simple electronic form. 
                Just follow the steps, pay the fee, and wait to receive your approved card via email.
              </p>
              
              <p className="text-lg">
                Our application page provides clear instructions on how to get your Thailand Visa On Arrival.
              </p>
              
              <p className="text-lg">
                To make the process smoother, be sure you have all the necessary documents ready and 
                understand the steps involved.
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className="w-full md:w-2/5 lg:w-1/2 flex-shrink-0 order-1 md:order-2">
            <img 
              src={thailandCoupleImage}
              alt="Couple in traditional Thai dress at temple"
              className="w-full h-full object-cover rounded-lg shadow-soft"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaGuideSection;