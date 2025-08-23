import { baseApi } from "@/redux/baseApi";


export const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create Parcel
    createParcel: builder.mutation({
      query: (parcelData) => ({
        url: "/parcels",
        method: "POST",
        body: parcelData,
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Update Parcel Status (Admin only)
    updateParcelStatus: builder.mutation({
      query: ({ trackingId, status }) => ({
        url: `/parcels/${trackingId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Cancel Parcel (Sender only)
    cancelParcel: builder.mutation({
      query: (trackingId) => ({
        url: `/parcels/${trackingId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // View My Parcels (Sender only)
    getMyParcels: builder.query({
      query: () =>({
        url:"/parcels/my-parcels",
        method:"GET"
      }),
      providesTags: ["PARCEL"],
    }),

    // Incoming Parcels (Receiver only)
    getIncomingParcels: builder.query({
      query: () =>({
         url:"/parcels/incoming-parcels",
         method:"GET"
      }) ,
      providesTags: ["PARCEL"],
    }),

    // Confirm Delivery (Receiver only)
    confirmDelivery: builder.mutation({
      query: (trackingId) => ({
        url: `/parcels/${trackingId}/confirm`,
        method: "PATCH",
    
      }),
      invalidatesTags: ["PARCEL"],
    }),

    // Delivery History (Receiver only)
    getDeliveryHistory: builder.query({
      query: () =>({
        url:"/parcels/delivery-history",
        method:"GET"
      }),
      providesTags: ["PARCEL"],
    }),

    // Get All Parcels (Admin only)
    getAllParcels: builder.query({
      query: () =>({
        url:"/parcels",
        method:"GET"
      }) ,
      providesTags: ["PARCEL"],
    }),

    // Get Single Parcel
    getSingleParcel: builder.query({
      query: (trackingId) =>({
        url:`/parcels/${trackingId}`,
        method:"GET"
      }),
      providesTags:["PARCEL"],
    }),

    // Block Parcel (Admin only)
    blockParcel: builder.mutation({
      query: (trackingId) => ({
        url: `/parcels/${trackingId}/block`,
        method: "PATCH",
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
} = parcelApi;
