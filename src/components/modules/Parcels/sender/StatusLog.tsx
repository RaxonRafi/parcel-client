/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useGetSingleParcelQuery } from "@/redux/features/parcel/parcel.api";

export function StatusLog({ trackingId }: { trackingId: string }) {
  const { data, isError, isLoading } = useGetSingleParcelQuery(trackingId);

  if (isLoading) return <Button disabled>Loading...</Button>;
  if (isError) return <Button disabled>Error fetching parcel</Button>;

  const logs = data?.data?.statusLogs || [];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Track Parcel</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <Card className="w-full shadow-none border-0">
          <CardHeader>
            <CardTitle>Parcel Status Logs</CardTitle>
            <CardDescription>
              Showing history for parcel: {trackingId}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {logs.length === 0 && <p>No status updates yet.</p>}
            {logs.map((log: any, index: number) => (
              <div
                key={index}
                className="border p-3 rounded-md hover:bg-gray-800 transition"
              >
                <p>
                  <span className="font-semibold">Status:</span> {log.status}
                </p>
                <p>
                  <span className="font-semibold">Note:</span> {log.note || "-"}
                </p>
                <p>
                  <span className="font-semibold">Updated By:</span>{" "}
                  {typeof log.updatedBy === "string" ? log.updatedBy : log.updatedBy?.name || "-"}
                </p>
                <p>
                  <span className="font-semibold">Timestamp:</span>{" "}
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
