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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  trackingId: string;
  action: "block" | "unblock" | "update";
  onConfirm: (data: {
    trackingId: string;
    status?: string;
    location: string;
    note: string;
  }) => void;
}

export function StatusUpdate({
  children,
  trackingId,
  action,
  onConfirm,
}: IProps) {
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<string>("");

  const handleConfirm = () => {
    onConfirm({ trackingId, status, note, location });
    setNote("");
    setLocation("");
    setStatus("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action === "update"
              ? "Update Parcel Status"
              : action === "block"
              ? "Block this Parcel?"
              : "Unblock this Parcel?"}
          </AlertDialogTitle>
        </AlertDialogHeader>

        {/* Status Dropdown (only for update) */}
        {action === "update" && (
          <div className="space-y-2 my-4">
            <Label htmlFor="status">New Status</Label>
            <Select onValueChange={(value) => setStatus(value)} value={status}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DISPATCHED">Dispatched</SelectItem>
                <SelectItem value="IN_TRANSIT">In Transit</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELED">Canceled</SelectItem>
                <SelectItem value="BLOCKED">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Note Input */}
        <div className="space-y-2 my-4">
          <Label htmlFor="note">Note</Label>
          <Input
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={
              action === "block"
                ? "Reason for blocking"
                : action === "unblock"
                ? "Reason for unblocking"
                : "Extra note (optional)"
            }
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
            {action === "update"
              ? "Update"
              : action === "block"
              ? "Block"
              : "Unblock"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
