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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useCreateParcelMutation } from "@/redux/features/parcel/parcel.api";
import {
  useReceiverListQuery,
} from "@/redux/features/users/user.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

// Zod validation schema
const parcelSchema = z.object({
  type: z.enum(["DOCUMENT", "PACKAGE", "FRAGILE", "PERISHABLE"], {
    message: "Type is required",
  }),
  weight: z.number({ message: "Weight is required" }).positive(),
  weightUnit: z.enum(["KG", "LB", "G"]),
  sender: z.string({ message: "Sender ID is required" }),
  receiver: z.string({ message: "Receiver ID is required" }),
  fromAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  toAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]),
  estimatedDelivery: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  fee: z.number().nonnegative(),
});

const addressFields = [
  "street",
  "city",
  "state",
  "zipCode",
  "country",
] as const;

export function SenderParcelForm() {
  const [open, setOpen] = useState(false);
  const { data: user } = useUserInfoQuery(undefined);
  const [createParcel] = useCreateParcelMutation();
  const { data: receiverList } = useReceiverListQuery(undefined);
  const userId = user?.data?.data?._id
  const form = useForm<z.infer<typeof parcelSchema>>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      type: "DOCUMENT",
      weight: 0,
      weightUnit: "KG",
      sender: userId,
      receiver: "",
      fromAddress: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      toAddress: { street: "", city: "", state: "", zipCode: "", country: "" },
      priority: "NORMAL",
      estimatedDelivery: "",
      fee: 0,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof parcelSchema>) => {
    console.log("Payload:", data);
    try {
      const result = await createParcel(data).unwrap();
      toast.success("Parcel added successfully!");
      console.log(result);
      form.reset();
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add parcel!");
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Parcel</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <Card className="w-full shadow-none border-0">
          <CardContent>
            <Form {...form} >
              <form
                className="p-6 md:p-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Add Parcel</h1>
                  </div>

                  {/* Type */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6 flex-wrap"
                          >
                            {["DOCUMENT", "PACKAGE", "FRAGILE", "PERISHABLE"].map((t) => (
                              <FormItem
                                key={t}
                                className="flex items-center gap-2"
                              >
                                <FormControl>
                                  <RadioGroupItem value={t} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {t}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Weight & Weight Unit */}
                  <div className="flex gap-4 flex-wrap">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem className="flex-1 min-w-[120px]">
                          <FormLabel>Weight</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter weight"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weightUnit"
                      render={({ field }) => (
                        <FormItem className="flex-1 min-w-[120px]">
                          <FormLabel>Weight Unit</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4"
                            >
                              {["KG", "LB", "G"].map((u) => (
                                <FormItem
                                  key={u}
                                  className="flex items-center gap-2"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={u} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {u}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Sender & Receiver */}
            
                    <FormField
                      control={form.control}
                      name="receiver"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Receiver</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Receiver" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Receivers</SelectLabel>
                                  {receiverList?.data?.map((receiver: any) => (
                                    <SelectItem
                                      key={receiver._id}
                                      value={receiver._id}
                                    >
                                      {receiver.name} ({receiver.email})
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  {/* From Address */}
                  <h3 className="font-semibold">From Address</h3>
                  <div className="flex flex-wrap gap-4">
                    {addressFields.map((key) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={`fromAddress.${key}` as const}
                        render={({ field }) => (
                          <FormItem className="flex-1 min-w-[120px]">
                            <FormLabel>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder={`Enter ${key}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  {/* To Address */}
                  <h3 className="font-semibold">To Address</h3>
                  <div className="flex flex-wrap gap-4">
                    {addressFields.map((key) => (
                      <FormField
                        key={key}
                        control={form.control}
                        name={`toAddress.${key}` as const}
                        render={({ field }) => (
                          <FormItem className="flex-1 min-w-[120px]">
                            <FormLabel>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </FormLabel>
                            <FormControl>
                              <Input placeholder={`Enter ${key}`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  {/* Priority */}
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6"
                          >
                            {["LOW", "NORMAL", "HIGH", "URGENT"].map((p) => (
                              <FormItem
                                key={p}
                                className="flex items-center gap-2"
                              >
                                <FormControl>
                                  <RadioGroupItem value={p} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {p}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Estimated Delivery */}
                  <FormField
                    control={form.control}
                    name="estimatedDelivery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Delivery</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Fee */}
                  <FormField
                    control={form.control}
                    name="fee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter fee"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
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
