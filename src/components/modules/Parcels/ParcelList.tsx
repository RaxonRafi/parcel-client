/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
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
import { AddParcelForm } from "./AddParcelForm";


export function ParcelList() {
  const [currentPage, setCurrentPage] = useState(1);

  const [limit] = useState(5);
  const { data, isLoading, isError } = useGetAllParcelsQuery({
    page: currentPage,
    limit,
  });
  const totalPage = data?.meta?.totalPage || 1;
  const parcels = data?.data || [];
  const [blockParcel] = useBlockParcelMutation();
  const [unblockParcel] = useUnblockParcelMutation();
  const [updateParcelStatus] = useUpdateParcelStatusMutation();

const handleParcelStatusUpdate = async (statusData: {
  trackingId: string;
  status?: string;
  location?: string;
  note?: string;
}) => {
  console.log(statusData);
  try {
    if (!statusData.status) {
      toast.error("Status is required for update");
      return;
    }

    await updateParcelStatus(statusData).unwrap();
    toast.success("Parcel updated successfully!");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to update parcel");
    console.log("Update parcel error:", error);
  }
};

  const handleBlockParcel = async (
    trackingId: string,
    note?: string,
    location?: string
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
    note?: string,
    location?: string
  ) => {
    try {
      await unblockParcel({ trackingId, note, location }).unwrap();
      toast.success("Parcel unblocked successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to block parcel");
    }
  };
 
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Parcel List</CardTitle>
        <CardAction>
            <AddParcelForm/>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
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
            {parcels.map((parcel: any) => {
              return (
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
                      <div className="font-semibold">
                        {parcel.receiver?.name}
                      </div>
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
                        action="unblock"
                        trackingId={parcel.trackingId}
                        currentStatus={parcel.currentStatus}
                        onConfirm={({ trackingId, note, location }) =>
                          handleUnBlockParcel(trackingId, note, location)
                        }
                      >
                        <Button size="sm" variant="destructive">
                          Unblock
                        </Button>
                      </ParcelStatusConfirmation>
                    ) : (
                      <ParcelStatusConfirmation
                        action="block"
                        currentStatus={parcel.currentStatus}
                        trackingId={parcel.trackingId}
                        onConfirm={({ trackingId, note, location }) =>
                          handleBlockParcel(trackingId, note, location)
                        }
                      >
                        <Button size="sm" variant="destructive">
                          Block
                        </Button>
                      </ParcelStatusConfirmation>
                    )}
                    <ParcelStatusConfirmation
                      action="update"
                      trackingId={parcel.trackingId}
                      currentStatus={parcel.currentStatus}
                      onConfirm={handleParcelStatusUpdate}
                    >
                      <Button size="sm" variant="outline">Update</Button>
                    </ParcelStatusConfirmation>

                  </TableCell>
                </TableRow>
              );
            })}
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
