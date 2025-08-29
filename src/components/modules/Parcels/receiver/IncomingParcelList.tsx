/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { toast } from "sonner";
import {
  useConfirmDeliveryMutation,
  useGetIncomingParcelsQuery,

} from "@/redux/features/parcel/parcel.api";
import { ParcelStatusConfirmation } from "@/components/ParcelStatusConfirmation";
import DeliveryHistory from "./DeliveryHistory";


export function IncomingParcelList() {
  const { data, isLoading, isError } = useGetIncomingParcelsQuery(undefined);
  const parcels = data?.data || [];
  const [confirmDelivery] = useConfirmDeliveryMutation()

const handleParcelConfirmDelivery= async (statusData: {
  trackingId: string;
  status?: string;
  location?: string;
  note?: string;
}) => {
  try {
    await confirmDelivery(statusData).unwrap();
    toast.success("Parcel delivered successfully!");
  } catch (error: any) {
    toast.error(error?.data?.message || "Failed to update parcel");
    console.log("Update parcel error:", error);
  }
};
 
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Parcel List</CardTitle>
        <CardAction>
            <DeliveryHistory/>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Sender</TableHead>
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
                      <div className="font-semibold">
                        {parcel.sender?.name || "Muhammad Rafi"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {parcel.sender?.email}
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
                    <ParcelStatusConfirmation
                      action="confirm"
                      trackingId={parcel.trackingId}
                      currentStatus={parcel.currentStatus}
                      onConfirm={handleParcelConfirmDelivery}
                    >
                      <Button 
                      disabled={parcel.currentStatus?.toUpperCase() === "DELIVERED"}  
                      size="sm" variant="outline">Confirm Delivery</Button>
                    </ParcelStatusConfirmation>

                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
