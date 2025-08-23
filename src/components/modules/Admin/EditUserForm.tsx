import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useUpdateUserMutation } from "@/redux/features/users/user.api"; 
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const editUserSchema = z.object({
  name: z.string().min(3).max(50),
  role: z.enum([role.sender, role.receiver, role.admin]),
});

interface EditUserFormProps {
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export function EditUserForm({ user }: EditUserFormProps) {
  const [open, setOpen] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      role: user.role,
    },
  });

  const onSubmit = async (data: z.infer<typeof editUserSchema>) => {
    try {
      await updateUser({ id: user._id, data }).unwrap();
      toast.success("User updated successfully!");
      setOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update user!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <Card className="w-full shadow-none border-0">
          <CardContent>
            <Form {...form}>
              <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <h1 className="text-2xl font-bold text-center">Edit User</h1>

                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email (read-only) */}
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input value={user.email} readOnly />
                    </FormControl>
                  </FormItem>

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

                  <Button type="submit" className="w-full">
                    Update
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
