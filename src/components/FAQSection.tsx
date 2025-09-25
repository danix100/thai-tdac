import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = [
  {
    question: "What exactly is the Thailand Digital Arrival Card (TDAC)?",
    answer: "The TDAC is Thailand's official digital arrival form, required for all travelers. It must be completed online within 72 hours before entering the country."
  },
  {
    question: "How much will it cost me to apply?",
    answer: "The service fee ranges from $50 to $70 depending on the processing option. This fee includes application assistance, error verification, and 24/7 support."
  },
  {
    question: "When should I fill out the TDAC?",
    answer: "You can complete the form anytime before your trip. The confirmation is delivered exactly 3 days (72 hours) prior to departure, as mandated by Thai Immigration."
  },
  {
    question: "Are children required to have a TDAC too?",
    answer: "Yes. Every traveler, including children and infants, must have a TDAC. Parents or guardians should submit the form on their behalf."
  },
  {
    question: "How will I get my TDAC after applying?",
    answer: "Once processed, you'll get the TDAC confirmation via email as a PDF. You can either print it or show it digitally at immigration."
  },
  {
    question: "What if I accidentally make a mistake on the form?",
    answer: "Our team reviews applications for common mistakes. If any corrections are needed, we'll assist you to ensure the form is accepted."
  },
  {
    question: "Do I still need a visa if I complete the TDAC?",
    answer: "Yes. The TDAC is not a visa. Depending on your nationality, a valid visa may still be required. This service only covers the TDAC application."
  },
  {
    question: "Why should I apply using this website?",
    answer: "We provide a simple, guided process with English support, 24/7 assistance, error checking, and guaranteed delivery of your TDAC confirmation email."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 px-4 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-background border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
