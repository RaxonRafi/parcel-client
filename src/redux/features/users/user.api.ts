import { baseApi } from "@/redux/baseApi";


export const userApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        allUsers:builder.query({
            query:({ page, limit })=>({
                url: "/user/all-users",
                method: "GET",
                params: { page, limit },
            }),
            providesTags: ["USER"],
        }),
        updateUser:builder.mutation({
            query:(userInfo)=>({
                url: "/user/update-profile",
                method: "PATCH",
                data: userInfo
            }),
        }),
        deleteUser:builder.mutation({
            query:(userId)=>({
                url: `/user/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["USER"],
        }),
        blockUser:builder.mutation({
            query:(userId)=>({
                url: `user/${userId}/block`,
                method: "PATCH",
            }),
            invalidatesTags: ["USER"],
        }),
        unblockUser:builder.mutation({
            query:(userId)=>({
                url: `user/${userId}/unblock`,
                method: "PATCH",
            }),
            invalidatesTags: ["USER"],
        }),
    })
})

export const {
 useAllUsersQuery,
 useUpdateUserMutation,
 useDeleteUserMutation,
 useBlockUserMutation,
 useUnblockUserMutation,
} = userApi