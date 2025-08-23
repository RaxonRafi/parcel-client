import AddUsers from "@/pages/Admin/AddUsers";
import Parcel from "@/pages/Parcel/Parcel";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(()=>import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
    {
      title: "Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          Component:Analytics
        },
        {
          title: "Users",
          url: "/admin/users",
          Component:AddUsers
        },
        {
          title: "Parcels",
          url: "/admin/parcels",
          Component:Parcel
        },
      ],
    },

]