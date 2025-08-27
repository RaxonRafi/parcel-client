import { ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import rightSideImage from "@/assets/images/delivery-man.jpg"

interface Hero3Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
}

const Hero = ({
  heading = "Reliable Parcel Delivery",
  description = "Easily send, track, and manage your parcels from one simple platform. Get real-time updates and ensure every delivery reaches its destination on time.",
  buttons = {
    primary: {
      text: "Send a Parcel",
      url: "/login",
    },
    secondary: {
      text: "Track Parcel",
      url: "/track-parcel",
    },
  },
}: Hero3Props) => {
  return (
    <section>
      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-3xl lg:items-start lg:text-left">
          <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl xl:text-7xl">
            {heading}
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
            {description}
          </p>
          <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
            {buttons.primary && (
              <Button asChild className="w-full sm:w-auto">
                <a href={buttons.primary.url}>{buttons.primary.text}</a>
              </Button>
            )}
            {buttons.secondary && (
              <Button asChild variant="outline">
                <a href={buttons.secondary.url}>
                  {buttons.secondary.text}
                  <ArrowDownRight className="size-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="flex">
          <img
            src={rightSideImage}
            alt="Delivery person"
            className="max-h-[600px] w-full rounded-md object-cover lg:max-h-[800px]"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
