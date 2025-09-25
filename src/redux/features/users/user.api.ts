import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.query({
      query: ({ page, limit }) => ({
        url: "/user/all-users",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["USER"],
    }),
    getSingleUser: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
    }),
    senderList: builder.query({
      query: () => ({
        url: "/user/sender-list",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    receiverList: builder.query({
      query: () => ({
        url: "/user/receiver-list",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    updateUser: builder.mutation({
      query: (userInfo) => ({
        url: "/user/update-profile",
        method: "PATCH",
        data: userInfo,
      }),
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
    approveUser: builder.mutation({
      query: (userId) => ({
        url: `user/approve-delivery-personnel/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `user/${userId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    unblockUser: builder.mutation({
      query: (userId) => ({
        url: `user/${userId}/unblock`,
        method: "PATCH",
      }),
      invalidatesTags: ["USER"],
    }),
    submitNid: builder.mutation({
      query: (formData: FormData) => ({
        url: "user/submit-nid",
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["USER"],
    }),
    pendingDeliveryMan: builder.query({
      query: () => ({
        url: "user/pending-delivery-personnels",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    deliveryManList: builder.query({
      query: () => ({
        url: "user/delivery-personnels",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useApproveUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useSenderListQuery,
  useReceiverListQuery,
  useSubmitNidMutation,
  usePendingDeliveryManQuery,
  useGetSingleUserQuery,
  useDeliveryManListQuery
} = userApi;
