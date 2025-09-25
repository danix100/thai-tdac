import arrivalCardImage from '@/assets/arrival-card-form.jpg';

const VisaGuideSection = () => {
  return (
    <section className="py-16 bg-background font-quicksand">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Content */}
          <div className="w-full md:w-3/5 lg:w-1/2 flex flex-col justify-center space-y-4 order-2 md:order-1">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary leading-tight">
              Applying for a Thailand Visa On Arrival
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Applying for your Thailand Visa On Arrival is quick and straightforward with our online form. 
                Complete the steps, submit the payment, and receive your approved card directly via email.
              </p>
              
              <p className="text-lg">
                Our application page guides you clearly through each step to ensure your Visa On Arrival is processed smoothly.
              </p>
              
              <p className="text-lg">
                To avoid delays, have all required documents ready and familiarize yourself with the procedure beforehand.
              </p>
            </div>
          </div>
          
          {/* Image */}
          <div className="w-full md:w-2/5 lg:w-1/2 flex-shrink-0 order-1 md:order-2">
            <img 
              src={arrivalCardImage}
              alt="Thailand Visa on Arrival card form preview"
              className="w-full h-full object-cover rounded-lg shadow-soft"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaGuideSection;
