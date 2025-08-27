"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Package, PieChart } from "lucide-react"

// Define types for your stats
type Stats = {
  users: {
    totalUsers: number
    totalSenders: number
    totalReceivers: number
  }
  parcels: {
    totalParcels: number
    blockedParcels: number
    canceledParcels: number
    statusBreakdown: Record<string, number>
  }
}

const statusColors: Record<string, string> = {
  APPROVED: "text-blue-600",
  DELIVERED: "text-green-600",
  DISPATCHED: "text-yellow-600",
  BLOCKED: "text-red-600",
  CANCELED: "text-gray-600",
}

export default function DashboardStats({ stats }: { stats: Stats }) {
  const breakdown: Record<string, number> = stats?.parcels?.statusBreakdown || {}

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Users */}
      <Card className="rounded-2xl shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Total Users</CardTitle>
          <Users className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {stats?.users?.totalUsers ?? 0}
          <p className="text-sm text-muted-foreground mt-1">
            Senders: {stats?.users?.totalSenders ?? 0} | Receivers:{" "}
            {stats?.users?.totalReceivers ?? 0}
          </p>
        </CardContent>
      </Card>

      {/* Total Parcels */}
      <Card className="rounded-2xl shadow">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Total Parcels</CardTitle>
          <Package className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent className="text-3xl font-bold">
          {stats?.parcels?.totalParcels ?? 0}
          <p className="text-sm text-muted-foreground mt-1">
            Blocked: {stats?.parcels?.blockedParcels ?? 0} | Canceled:{" "}
            {stats?.parcels?.canceledParcels ?? 0}
          </p>
        </CardContent>
      </Card>

      {/* Parcel Status Breakdown */}
      <Card className="rounded-2xl shadow col-span-1 md:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Parcel Status</CardTitle>
          <PieChart className="h-6 w-6 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {Object.entries(breakdown).map(([status, count]) => (
              <li
                key={status}
                className="flex justify-between border-b pb-1 last:border-none"
              >
                <span className={`font-medium ${statusColors[status] || ""}`}>
                  {status}
                </span>
                <span className="font-semibold">{count}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
