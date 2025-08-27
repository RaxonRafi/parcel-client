import DashboardStats from "@/components/modules/Admin/DashboardStates"
import { useDashboardDataQuery } from "@/redux/features/dashboard/dashboard.api"


const Analytics = () => {
  const { data, isLoading, isError } = useDashboardDataQuery({})

  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Failed to load dashboard data</p>
  }

  return (
    <div>
      <DashboardStats stats={data?.data} />
    </div>
  )
}

export default Analytics
