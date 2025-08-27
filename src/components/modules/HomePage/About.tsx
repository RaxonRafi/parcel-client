import { Button } from "@/components/ui/button";
import aboutImg1 from "@/assets/images/about-1.jpeg"
import aboutImg2 from "@/assets/images/about-2.jpg"
import Logo from "@/assets/icons/Logo";
import type { ComponentType } from "react";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: ComponentType;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}


const defaultAchievements = [
  { label: "Parcels Delivered", value: "50K+" },
  { label: "Active Users", value: "10K+" },
  { label: "Delivery Accuracy", value: "98%" },
  { label: "Cities Covered", value: "25+" },
];

const About = ({
  title = "About Smart Parcel",
  description = "Smart Parcel is a modern delivery platform designed to simplify how people send, track, and receive parcels. Our mission is to make logistics seamless, reliable, and accessible for businesses and individuals alike.",
  mainImage = {
    src: aboutImg1,
    alt: "Parcel delivery in action",
  },
  secondaryImage = {
    src: aboutImg2,
    alt: "Delivery team at work",
  },
  breakout = {
    src: Logo,
    alt: "logo",
    title: "Trusted by thousands of senders & receivers",
    description:
      "We’re building smarter ways to connect parcels with people. From real-time tracking to doorstep delivery, Smart Parcel is redefining convenience.",
    buttonText: "Explore Services",
    buttonUrl: "#",
  },
  achievementsTitle = "Our Achievements at a Glance",
  achievementsDescription = "We take pride in delivering trust, speed, and satisfaction to our customers every day.",
  achievements = defaultAchievements,
}: About3Props = {}) => {
  return (
    <section id="about" className="py-32" >
      <div className="container">
        {/* Title + Description */}
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* Main + Secondary Images with Breakout */}
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              <Logo/>
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl} target="_blank">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>

        {/* Achievements */}
        <div className="relative overflow-hidden rounded-xl bg-muted p-10 md:p-16 mt-10">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold">{achievementsTitle}</h2>
            <p className="max-w-xl text-muted-foreground">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p>{item.label}</p>
                <span className="text-4xl font-semibold md:text-5xl">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] bg-[size:80px_80px] opacity-15 md:block"></div>
        </div>
      </div>
    </section>
  );
};

export { About };
