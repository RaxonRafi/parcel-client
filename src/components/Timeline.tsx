import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

interface ParcelLog {
  status: string
  note: string
  location?: string
  timestamp: string
}

interface TimeLineProps {
  logs: ParcelLog[]
  currentStatus: string
}

export default function TimeLine({ logs, currentStatus }: TimeLineProps) {
  return (
    <Timeline defaultValue={logs.findIndex(log => log.status === currentStatus) + 1}>
      {logs.map((log, index) => {
        const isCompleted =
          index <= logs.findIndex((l) => l.status === currentStatus)
        return (
          <TimelineItem
            key={index}
            step={index + 1}
            className="group-data-[orientation=vertical]/timeline:sm:ms-32"
          >
            <TimelineHeader>
              <TimelineSeparator>
              </TimelineSeparator>
                <TimelineIndicator className={isCompleted ? "bg-blue-500" : ""} />
              <TimelineDate className="group-data-[orientation=vertical]/timeline:sm:absolute group-data-[orientation=vertical]/timeline:sm:-left-32 group-data-[orientation=vertical]/timeline:sm:w-20 group-data-[orientation=vertical]/timeline:sm:text-right">
                {new Date(log.timestamp).toLocaleString()}
              </TimelineDate>
              <TimelineTitle className="sm:-mt-0.5">{log.status}</TimelineTitle>
              <TimelineIndicator />
            </TimelineHeader>
            <TimelineContent>
              {log.note} {log.location ? `at ${log.location}` : ""}
            </TimelineContent>
          </TimelineItem>
        )
      })}
    </Timeline>
  )
}
