import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQSection = () => {
  const faqData = [
    {
      question: "What is the Thailand Digital Arrival Card (TDAC)?",
      answer: "The TDAC is Thailand’s official digital arrival form, required for all travelers. It must be completed online within 72 hours before entering the country."
    },
    {
      question: "How much does it cost to apply?",
      answer: "The service fee ranges from $50 to $70 depending on the processing option. This fee includes application assistance, error verification, and 24/7 support."
    },
    {
      question: "When should I submit the TDAC?",
      answer: "You can complete the form anytime before your trip. The confirmation is delivered exactly 3 days (72 hours) prior to departure, as mandated by Thai Immigration."
    },
    {
      question: "Do children need a TDAC?",
      answer: "Yes. Every traveler, including children and infants, must have a TDAC. Parents or guardians should submit the form on their behalf."
    },
    {
      question: "How will I receive my TDAC?",
      answer: "Once processed, you’ll get the TDAC confirmation via email as a PDF. You can either print it or show it digitally at immigration."
    },
    {
      question: "What if I make a mistake on the application?",
      answer: "Our team reviews applications for common mistakes. If any corrections are needed, we’ll assist you to ensure the form is accepted."
    },
    {
      question: "Do I still need a visa if I have a TDAC?",
      answer: "Yes. The TDAC is not a visa. Depending on your nationality, a valid visa may still be required. This service only covers the TDAC application."
    },
    {
      question: "Why apply through this website?",
      answer: "We provide a simple, guided process with English support, 24/7 assistance, error checking, and guaranteed delivery of your TDAC confirmation email."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-background font-quicksand">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about the Thailand Visa On Arrival
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-primary/10 rounded-lg px-6 bg-white shadow-soft"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-6 text-base lg:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <Link to="/apply">
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg rounded-lg shadow-md transition-all duration-200 hover:shadow-lg pulse"
            >
              Apply For Your Thailand Visa On Arrival
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
