import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import config from "@/config";
import {
  useApproveUserMutation,
  useGetSingleUserQuery,
} from "@/redux/features/users/user.api";
import type { ReactNode } from "react";
import { useState } from "react";

interface IProps {
  children: ReactNode;
  userId: string;
}

export function ViewUser({ children, userId }: IProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetSingleUserQuery(userId, { skip: !open });
  const [approveUser, { isLoading: isApproving }] = useApproveUserMutation();

  const handleApprove = async () => {
    try {
      await approveUser(userId).unwrap();
      setOpen(false);
    } catch {
      // swallow
    }
  };

  const user = data?.data;
  const normalizeImages = (input: unknown): string[] => {
    if (!input) return [];
    if (Array.isArray(input)) return input.filter(Boolean) as string[];
    if (typeof input === "string") {

      try {
        const parsed = JSON.parse(input);
        if (Array.isArray(parsed)) return parsed.filter(Boolean) as string[];
      } catch {
        // ignore parse errors; fallback to comma-separated parsing
      }
      return input
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (typeof input === "object") {
  
      return Object.values(input as Record<string, string>).filter(Boolean);
    }
    return [];
  };
  const images: string[] = normalizeImages(user?.nidImage);
  const toAbsolute = (url: string) =>
    url?.startsWith("http")
      ? url
      : `${config.baseUrl}/${url?.replace(/^\//, "")}`;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Pending User</DialogTitle>
          <DialogDescription>Review NID details and approve.</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm">Name: {user?.name}</p>
              <p className="text-sm">Email: {user?.email}</p>
              <p className="text-sm">NID: {user?.nidNumber}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-80 overflow-auto pr-1">
              {images.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No NID images uploaded
                </p>
              ) : (
                images.map((url, idx) => (
                  <img
                    key={`${url}-${idx}`}
                    src={toAbsolute(url)}
                    alt={`NID ${idx + 1}`}
                    className="rounded w-full h-40 object-cover"
                  />
                ))
              )}
            </div>
          </div>
        )}

        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={handleApprove} disabled={isApproving}>
            {isApproving ? "Approving..." : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
