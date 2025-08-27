import { baseApi } from "@/redux/baseApi";


export const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        dashboardData:builder.query({
            query:()=>({
                url: "/dashboard",
                method: "GET",
            }),
        }),

    })
})

export const {
    useDashboardDataQuery
} = dashboardApi