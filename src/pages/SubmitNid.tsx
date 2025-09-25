/* eslint-disable @typescript-eslint/no-explicit-any */
import MultipleImageUploader from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FileMetadata } from "@/hooks/use-file-upload";
import { useSubmitNidMutation } from "@/redux/features/users/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const nidSchema = z.object({
  nidNumber: z.string().min(1).max(10),
});
const SubmitNid = () => {
  const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);
  const [uploaderKey, setUploaderKey] = useState(0);
  const form = useForm<z.infer<typeof nidSchema>>({
    resolver: zodResolver(nidSchema),
    defaultValues: {
      nidNumber: "",
    },
    mode: "onSubmit",
  });
  const [submitNid, { isLoading }] = useSubmitNidMutation();
  const onSubmit = async (data: z.infer<typeof nidSchema>) => {
    const formData = new FormData();

    // add nidNumber JSON
    formData.append("data", JSON.stringify({ nidNumber: data.nidNumber }));

    // only append actual File objects
    images.forEach((file) => {
      if (file instanceof File) {
        formData.append("files", file);
      }
    });

    try {
      const result = await submitNid(formData).unwrap();
      console.log(result);
      toast.success("NID submitted successfully!");
      // reset form and uploader after success
      form.reset({ nidNumber: "" });
      setImages([]);
      setUploaderKey((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit NID");
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Upload NID</CardTitle>
          <CardDescription>
            Upload your NID front and back to verify your identity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-5 items-stretch">
                <FormField
                  control={form.control}
                  name="nidNumber"
                  render={({ field }: { field: any }) => (
                    <FormItem className="flex-1">
                      <Label>NID Number</Label>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4">
                <MultipleImageUploader key={uploaderKey} onChange={setImages} />
              </div>
              <div className="mt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit NID"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitNid;
