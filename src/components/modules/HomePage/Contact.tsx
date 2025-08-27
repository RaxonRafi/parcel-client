/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSendMailMutation } from "@/redux/features/contact/contact.api";
import { toast } from "sonner";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

interface FormValues {
  firstname: string;
  lastname: string;
  email: string;
  subject: string;
  message: string;
}

export const Contact = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "+8801867118351",
  email = "dev.muhammad.rafi@gmail.com",
  web = { label: "devmuhammadrafi.netlify.app", url: "https://devmuhammadrafi.netlify.app" },
}: Contact2Props) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const [sendMail, { isLoading }] = useSendMailMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await sendMail(data).unwrap();
      toast.success(res.message || "Message sent successfully!")
      reset();
    } catch (err: any) {
      console.error(err);
      toast.error(err.data?.message || "Failed to send message.")
    }
  };

  return (
    <section id="contact" className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">Contact Details</h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">{email}</a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a href={web.url} target="_blank" className="underline">{web.label}</a>
                </li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  placeholder="First Name"
                  {...register("firstname", { required: "First name is required" })}
                />
                {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  placeholder="Last Name"
                  {...register("lastname", { required: "Last name is required" })}
                />
                {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
              </div>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email address" },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Subject"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
            </div>

            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here."
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
