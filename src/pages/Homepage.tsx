import { About } from "@/components/modules/HomePage/About"
import { Contact } from "@/components/modules/HomePage/Contact"
import { Faq } from "@/components/modules/HomePage/FAQ"
import { Hero } from "@/components/modules/HomePage/hero"

const Homepage = () => {
  return (
    <div className="p-10">
      <Hero/>
      <About/>
      <Faq
        heading="FAQs about Parcel Delivery"
        description="Find answers to common questions."
        supportHeading="Still need help?"
        supportDescription="Contact our support team for assistance."
        supportButtonText="Contact Support"
        supportButtonUrl="/support"
      />
      <Contact/>
    </div>
  )
}

export default Homepage