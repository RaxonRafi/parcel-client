import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { role } from "@/constants/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import Password from "@/components/ui/Passsword";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { error: "Name is too short" })
      .max(50, { message: "Name is too long" }),
    email: z.email(),
    role: z.enum([role.sender, role.receiver, role.admin]),
    password: z
      .string({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
      }),
    cpassword: z.string({ message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Password do not match",
    path: ["cpassword"],
  });

export function AddUsersForm() {
  const [open, setOpen] = useState(false);
  const [register] = useRegisterMutation();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      role: role.sender,
      password: "",
      cpassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      role: data.role,
      password: data.password,
    };

    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("Registered Successfully!");
      form.reset();
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed!");
    }

  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Users</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">

        <Card className="w-full shadow-none border-0">
          <CardContent>
            <Form {...form}>
              <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Add Users!</h1>
                  </div>

                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Role */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6"
                          >
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <RadioGroupItem value={role.sender} />
                              </FormControl>
                              <FormLabel className="font-normal">Sender</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <RadioGroupItem value={role.receiver} />
                              </FormControl>
                              <FormLabel className="font-normal">Receiver</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center gap-2">
                              <FormControl>
                                <RadioGroupItem value={role.admin} />
                              </FormControl>
                              <FormLabel className="font-normal">Admin</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Password */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password */}
                  <FormField
                    control={form.control}
                    name="cpassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
      
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
