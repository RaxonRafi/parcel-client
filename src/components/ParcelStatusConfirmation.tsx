import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  trackingId: string; 
  status: string
  onConfirm: (data: { trackingId: string; note: string; location: string }) => void;
}

export function ParcelStatusConfirmation({ children,trackingId,status, onConfirm }: IProps) {
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");


  const handleConfirm = () => {
    onConfirm({ trackingId, note, location });
    setNote("");
    setLocation("");
     
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{status} this Parcel?</AlertDialogTitle>
        </AlertDialogHeader>

        {/* Note Input */}
        <div className="space-y-2 my-4">
          <Label htmlFor="note">Note</Label>
          <Input
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reason for blocking"
          />
        </div>

        {/* Location Input */}
        <div className="space-y-2 my-4">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {status}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
