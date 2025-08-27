import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq3Props {
  heading: string;
  description: string;
  items?: FaqItem[];
  supportHeading: string;
  supportDescription: string;
  supportButtonText: string;
  supportButtonUrl: string;
}

const faqItems = [
  {
    id: "faq-1",
    question: "How do I track my parcel?",
    answer:
      "You can track your parcel in real-time using the tracking ID provided at the time of booking. Just enter it in the Track Parcel section of our app.",
  },
  {
    id: "faq-2",
    question: "What happens if my parcel is delayed?",
    answer:
      "If your parcel is delayed, you will receive a notification with the updated delivery time. You can also contact support for further assistance.",
  },
  {
    id: "faq-3",
    question: "Can I change the delivery address after booking?",
    answer:
      "Yes, you can request an address change before the parcel is out for delivery. Simply go to your booking details and update the address.",
  },
  {
    id: "faq-4",
    question: "What items are restricted from shipping?",
    answer:
      "We do not allow shipping of hazardous materials, perishable goods, or items restricted by law. Please check our shipping policy for a full list.",
  },
  {
    id: "faq-5",
    question: "How long does delivery usually take?",
    answer:
      "Standard deliveries usually take 1–3 business days, depending on the destination. Express options are also available for urgent shipments.",
  },
  {
    id: "faq-6",
    question: "What should I do if my parcel is lost?",
    answer:
      "In the rare case of a lost parcel, please contact our support team immediately. We will investigate and initiate compensation if applicable.",
  },
  {
    id: "faq-7",
    question: "How do I contact customer support?",
    answer:
      "You can reach our support team 24/7 through live chat in the app, email, or our customer care hotline.",
  },
];


const Faq = ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about booking, tracking, and delivering parcels. Can't find what you're looking for? Contact our support team anytime.",
  items = faqItems,
}: Faq3Props) => {
  return (
    <section id="faq" className="py-32">
      <div className="container space-y-16">
        <div className="mx-auto flex max-w-3xl flex-col text-left md:text-center">
          <h2 className="mb-3 text-3xl font-semibold md:mb-4 lg:mb-6 lg:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p>
        </div>
        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full lg:max-w-3xl"
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="transition-opacity duration-200 hover:no-underline hover:opacity-60">
                <div className="font-medium sm:py-1 lg:py-2 lg:text-lg">
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="sm:mb-1 lg:mb-2">
                <div className="text-muted-foreground lg:text-lg">
                  {item.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export { Faq };
