import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetDeliveryHistoryQuery } from "@/redux/features/parcel/parcel.api";

export default function DeliveryHistory() {
  const { data, isLoading, isError } = useGetDeliveryHistoryQuery(undefined);

  if (isLoading) return <Button disabled>Loading...</Button>;
  if (isError) return <Button disabled>Error fetching parcel</Button>;

  const parcel = data?.data?.[0] || {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Delivery History</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <Card className="w-full shadow-none border-0">
          <CardHeader>
            <CardTitle>Parcel Received Logs</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="border p-3 rounded-md bg-gray-800">
              <p><span className="font-semibold">Tracking ID:</span> {parcel.trackingId}</p>
              <p><span className="font-semibold">From:</span> {parcel.fromAddress?.street}, {parcel.fromAddress?.city}</p>
              <p><span className="font-semibold">To:</span> {parcel.toAddress?.street}, {parcel.toAddress?.city}</p>
              <p><span className="font-semibold">Weight:</span> {parcel.weight} {parcel.weightUnit}</p>
              <p><span className="font-semibold">Fee:</span> {parcel.fee} BDT</p>
              <p><span className="font-semibold">Estimated Delivery:</span> {new Date(parcel.estimatedDelivery).toLocaleString()}</p>
              {parcel.actualDelivery && (
                <p><span className="font-semibold">Actual Delivery:</span> {new Date(parcel.actualDelivery).toLocaleString()}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
