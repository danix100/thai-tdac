import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQSection = () => {
  const faqData = [
    {
      question: "What is the Thailand Digital Arrival Card (TDAC)?",
      answer: "The TDAC is Thailand's new mandatory digital arrival form. All travelers must complete it online within 72 hours before entering Thailand."
    },
    {
      question: "How much does it cost to apply here?",
      answer: "Their service fee ranges from $50 to $70, depending on the processing option selected. This covers application handling, error checking, and 24/7 support."
    },
    {
      question: "When should I complete the TDAC?",
      answer: "You should complete the application at any time before your trip. They state they will deliver the TDAC confirmation exactly 3 days (72 hours) before your departure, as required by Thai Immigration."
    },
    {
      question: "Do children need a TDAC?",
      answer: "Yes. A TDAC is required for all travelers, including children and infants. The parent or guardian must complete the form on their behalf."
    },
    {
      question: "How do I receive my TDAC after applying?",
      answer: "After processing, you will receive the TDAC confirmation by email as a PDF document. You can either print it or show it digitally at immigration."
    },
    {
      question: "What if I make a mistake on the application?",
      answer: "Their team reviews the application for common errors. If corrections are needed, they assist you to ensure the form is accepted."
    },
    {
      question: "Do I still need a visa if I complete the TDAC?",
      answer: "Yes. The TDAC is not a visa. Depending on your nationality, you may still need a valid visa to enter Thailand. Their service only covers the TDAC application."
    },
    {
      question: "Why should I apply through this website?",
      answer: "Because they offer a convenient, guided application process with English support, round-the-clock assistance, error checking, and guaranteed, reliable delivery of your TDAC confirmation email."
    }
  ];

  return (
    <section className="py-16 bg-background font-quicksand">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            All the information you need to know about the Thailand Visa On Arrival
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
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg rounded-lg shadow-md transition-all duration-200 hover:shadow-lg pulse"
          >
            Apply For Your Thai Visa On Arrival
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;