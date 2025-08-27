import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import Homepage from "@/pages/Homepage";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { senderSidebarItems } from "./senderSidebarItems";
import { receiverSidebarItems } from "./receiverSidebarItems";
import TrackParcel from "@/pages/TrackParcel";

export const router = createBrowserRouter([
    {
        path:"/",
        Component: App,
        children:[
            {
                Component: Homepage,
                index: true
            },
            {
                path:"/track-parcel",
                Component: TrackParcel

            },
        ]
    },
 
    {
        path:"/login",
        Component: LoginPage

    },
    {
        path:"/register",
        Component: RegisterPage

    },
    {
        Component: withAuth(DashboardLayout,role.admin as TRole),
        path: "/admin",
        children:[
            {
                index: true,
                element: <Navigate to="/admin/analytics"/>
            },
            ...generateRoutes(adminSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout,role.sender as TRole),
        path: "/sender",
        children:[
            {
                index: true,
                element: <Navigate to="/sender/parcel"/>
            },
            ...generateRoutes(senderSidebarItems)
        ]
    },
    {
        Component: withAuth(DashboardLayout,role.receiver as TRole),
        path: "/receiver",
        children:[
            {
                index: true,
                element: <Navigate to="/receiver/parcel"/>
            },
            ...generateRoutes(receiverSidebarItems)
        ]
    },
])