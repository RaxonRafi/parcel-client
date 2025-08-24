import { baseApi } from "@/redux/baseApi";


export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Parcel
    createParcel: builder.mutation({
      query: (parcelData) => ({
        url: "/parcel",
        method: "POST",
        body: parcelData,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Update Parcel Status (Admin only)
    updateParcelStatus: builder.mutation({
      query: ({ trackingId,status,note,location }) => ({
        url: `/parcel/${trackingId}/status`,
        method: "PATCH",
        body: { status,note,location },
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Cancel Parcel (Sender only)
    cancelParcel: builder.mutation({
      query: (trackingId) => ({
        url: `/parcel/${trackingId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // View My Parcels (Sender only)
    getMyParcels: builder.query({
      query: () =>({
        url:"/parcel/my-parcels",
        method:"GET"
      }),
      providesTags: ["PARCEL"],
    }),

    // Incoming Parcels (Receiver only)
    getIncomingParcels: builder.query({
      query: () =>({
         url:"/parcel/incoming-parcels",
         method:"GET"
      }) ,
      providesTags: ["PARCEL"],
    }),

    // Confirm Delivery (Receiver only)
    confirmDelivery: builder.mutation({
      query: (trackingId) => ({
        url: `/parcel/${trackingId}/confirm`,
        method: "PATCH",
    
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Delivery History (Receiver only)
    getDeliveryHistory: builder.query({
      query: () =>({
        url:"/parcel/delivery-history",
        method:"GET"
      }),
      providesTags: ["PARCEL"],
    }),

    // Get All Parcels (Admin only)
    getAllParcels: builder.query({
      query: () =>({
        url:"/parcel",
        method:"GET"
      }) ,
      providesTags: ["PARCEL"],
    }),

    // Get Single Parcel
    getSingleParcel: builder.query({
      query: (trackingId) =>({
        url:`/parcel/${trackingId}`,
        method:"GET"
      }),
      providesTags:["PARCEL"],
    }),

    // Block Parcel (Admin only)
    blockParcel: builder.mutation({
      query: ({trackingId,note,location}) => ({
        url: `/parcel/${trackingId}/block`,
        method: "PATCH",
        body:{ note, location },
      }),
      invalidatesTags: ["PARCEL"],
    }),
    unblockParcel: builder.mutation({
      query: ({trackingId,note,location}) => ({
        url: `/parcel/${trackingId}/unblock`,
        method: "PATCH",
        body:{ note, location },
      }),
      invalidatesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useCreateParcelMutation,
  useUpdateParcelStatusMutation,
  useCancelParcelMutation,
  useGetMyParcelsQuery,
  useGetIncomingParcelsQuery,
  useConfirmDeliveryMutation,
  useGetDeliveryHistoryQuery,
  useGetAllParcelsQuery,
  useGetSingleParcelQuery,
  useBlockParcelMutation,
  useUnblockParcelMutation
} = parcelApi;
