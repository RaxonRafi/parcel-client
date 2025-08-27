import  { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetSingleParcelQuery } from "@/redux/features/parcel/parcel.api";
import TimeLine from "@/components/Timeline";
import { useSearchParams } from "react-router";

const TrackParcelForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const trackingIdFromQuery = searchParams.get("trackingId") || "";
  const [trackId, setTrackId] = useState(trackingIdFromQuery);


  const { data: parcelData, isFetching, isError } = useGetSingleParcelQuery(trackId, {
    skip: !trackId,
  });

  useEffect(() => {
    if (trackingIdFromQuery && trackingIdFromQuery !== trackId) {
      setTrackId(trackingIdFromQuery);
    }
  }, [trackingIdFromQuery,trackId]);

  const handleTrack = () => {
    if (!trackId.trim()) return;

    // Update query params in URL
    setSearchParams({ trackingId: trackId });
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Search box */}
      <div className="flex gap-2 mb-8">
        <Input
          placeholder="Enter tracking ID"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleTrack()}
          disabled={isFetching}
        />
        <Button onClick={handleTrack} disabled={isFetching}>
          {isFetching ? "Loading..." : "Track"}
        </Button>
      </div>

      {isError && (
        <p className="text-center text-red-500">
          Failed to fetch parcel. Please try again.
        </p>
      )}

      {parcelData?.data?.statusLogs?.length ? (
        <TimeLine
          logs={[...parcelData.data.statusLogs].sort(
            (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          )}
          currentStatus={parcelData.currentStatus}
        />
      ) : parcelData ? (
        <p className="text-center text-red-500">No tracking history found.</p>
      ) : null}
    </div>
  );
};

export default TrackParcelForm;
