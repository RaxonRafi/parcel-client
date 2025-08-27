import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  trackingId: string;
  currentStatus: string;
  action: "block" | "unblock" | "update" | "cancel" | "confirm";
  onConfirm: (data: {
    trackingId: string;
    status?: string;
    location?: string;
    note?: string;
  }) => void;
}

export function ParcelStatusConfirmation({
  children,
  trackingId,
  currentStatus,
  action,
  onConfirm,
}: IProps) {
  const [note, setNote] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState(currentStatus);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setNote("");
      setLocation("");
      setStatus(currentStatus);
    }
  }, [open, currentStatus]);

  const validTransitions: Record<string, string[]> = {
    REQUESTED: ["APPROVED", "CANCELED"],
    APPROVED: ["DISPATCHED", "CANCELED"],
    DISPATCHED: ["IN_TRANSIT"],
    IN_TRANSIT: ["DELIVERED"],
    DELIVERED: [],
    CANCELED: [],
    BLOCKED: [],
  };

  const handleConfirm = () => {
    const confirmData: {
      trackingId: string;
      status?: string;
      location?: string;
      note?: string;
    } = { trackingId };

    if (action === "update") {
      confirmData.status = status;
    } else if (action === "block") {
      confirmData.status = "BLOCKED";
    } else if (action === "unblock") {
      confirmData.status = "REQUESTED";
    }
    if(action === "cancel"){
       confirmData.status = "CANCELED";
    }

    if (note.trim()) confirmData.note = note.trim();
    if (location.trim()) confirmData.location = location.trim();

    onConfirm(confirmData);
    setOpen(false);
  };

  const isConfirmDisabled = () => {
    if (action === "update") {
      return !status || status === currentStatus || !validTransitions[currentStatus]?.includes(status);
    }
    return false;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {action === "update"
              ? "Update Parcel Status"
              : action === "block"
              ? "Block this Parcel?"
              : "Unblock this Parcel?"}
          </DialogTitle>
          <DialogDescription>
            {action === "update"
              ? "Select a new status and optionally provide a note and location."
              : action === "block"
              ? "This will block the parcel. Provide a reason and location."
              : "This will unblock the parcel. Provide a reason and location."
              
              }
          </DialogDescription>
        </DialogHeader>

        {/* Status Dropdown */}
        {action === "update" && (
          <div className="space-y-2 my-4">
            <Label htmlFor="status">New Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                {validTransitions[currentStatus]?.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s.replace("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {status === currentStatus && (
              <p className="text-sm text-muted-foreground">
                Please select a different status to update.
              </p>
            )}
          </div>
        )}

        {/* Note Input */}
        <div className="space-y-2 my-4">
          <Label htmlFor="note">
            {action === "block" || action === "unblock" || action === "cancel" ? "Reason *" : "Note"}
          </Label>
          <Input
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={
              action === "block"
                ? "Reason for blocking (required)"
                : action === "unblock"
                ? "Reason for unblocking (required)"
                : "Extra note (optional)"
            }
            required={action === "block" || action === "unblock"}
          />
        </div>

        {/* Location Input */}
        <div className="space-y-2 my-4">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter current location"
          />
        </div>

        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isConfirmDisabled() || ((action === "block" || action === "unblock") && !note.trim())}
          >
        {
          action === "update"
            ? "Update Status"
            : action === "block"
            ? "Block Parcel"
            : action === "unblock"
            ? "Unblock Parcel"
            : action === "cancel"
            ? "Cancel Parcel"
            : action === "confirm"
            ? "Confirm Parcel"
            : "Confirm"
        }

          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
