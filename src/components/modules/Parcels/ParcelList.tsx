/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { toast } from "sonner";
import {
  useBlockParcelMutation,
  useGetAllParcelsQuery,
  useUnblockParcelMutation,
  useUpdateParcelStatusMutation,
} from "@/redux/features/parcel/parcel.api";
import { ParcelStatusConfirmation } from "@/components/ParcelStatusConfirmation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ParcelList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const { data, isLoading, isError } = useGetAllParcelsQuery({
    page: currentPage,
    limit,
  });
  const totalPage = data?.meta?.totalPage || 1;
  const parcels = data?.data || [];
  const [blockParcel] = useBlockParcelMutation();
  const [unblockParcel] = useUnblockParcelMutation();
  const [updateParcelStatus] = useUpdateParcelStatusMutation();
  const handleBlockParcel = async (
    trackingId: string,
    note: string,
    location: string
  ) => {
    try {
      await blockParcel({ trackingId, note, location }).unwrap();
      console.log("Attempting to block parcel with ID:", trackingId);
      toast.success("Parcel blocked successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to block parcel");
    }
  };
  const handleUnBlockParcel = async (
    trackingId: string,
    note: string,
    location: string
  ) => {
    try {
      await unblockParcel({ trackingId, note, location }).unwrap();
      toast.success("Parcel unblocked successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to block parcel");
    }
  };
type Status =
  | "REQUESTED"
  | "APPROVED"
  | "DISPATCHED"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "CANCELED"
  | "BLOCKED";

const statusTransitions: Record<Status, Status[]> = {
  REQUESTED: ["APPROVED", "CANCELED", "BLOCKED"],
  APPROVED: ["DISPATCHED", "CANCELED", "BLOCKED"],
  DISPATCHED: ["IN_TRANSIT", "BLOCKED"],
  IN_TRANSIT: ["DELIVERED", "BLOCKED"],
  DELIVERED: [],
  CANCELED: [],
  BLOCKED: [],
};

const currentStatus: Status = parcels.status as Status;
const nextStatuses = statusTransitions[currentStatus] || [];
  const handleUpdateParcelStatus = async (
    trackingId: string,
    status:string,
    note?: string,
    location?: string
  ) => {
    try {
      await updateParcelStatus({ trackingId,status,note,location }).unwrap();
      toast.success("Parcel Status Updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Updated parcel");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Parcel List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of parcels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.map((parcel: any) => (
              <TableRow key={parcel._id}>
                <TableCell className="font-medium">
                  {parcel.trackingId}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-semibold">{parcel.sender?.name}</div>
                    <div className="text-sm text-gray-500">
                      {parcel.sender?.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-semibold">{parcel.receiver?.name}</div>
                    <div className="text-sm text-gray-500">
                      {parcel.receiver?.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{parcel.type}</TableCell>
                <TableCell>
                  {parcel.weight} {parcel.weightUnit}
                </TableCell>
                <TableCell>${parcel.fee}</TableCell>
                <TableCell>{parcel.currentStatus}</TableCell>
                <TableCell>
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex gap-x-3">
                  {parcel.isBlocked ? (
                    <ParcelStatusConfirmation
                      status="unblock"
                      trackingId={parcel.trackingId}
                      onConfirm={({ trackingId, note, location }) => {
                        handleUnBlockParcel(trackingId, note, location);
                      }}
                    >
                      <Button size="sm" variant="destructive">
                        Unblock
                      </Button>
                    </ParcelStatusConfirmation>
                  ) : (
                    <ParcelStatusConfirmation
                      status="block"
                      trackingId={parcel.trackingId}
                      onConfirm={({ trackingId, note, location }) => {
                      handleBlockParcel(trackingId, note, location);
                      }}
                    >
                      <Button size="sm" variant="destructive">
                        Block
                      </Button>
                    </ParcelStatusConfirmation>
                  )}


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {currentStatus}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {nextStatuses.length > 0 ? (
                  nextStatuses.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => handleUpdateParcelStatus(parcel.trackingId, status )}
                    >
                      {status}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No further status</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>


                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {totalPage && (
        <div className="flex justify-end mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </Card>
  );
}
