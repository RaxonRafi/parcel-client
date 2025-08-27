import { baseApi } from "@/redux/baseApi";


export const contactApi = baseApi.injectEndpoints({
    endpoints: (builder)=>({
        sendMail:builder.mutation({
            query:(formData)=>({
                url: "/contact",
                method: "POST",
                data: formData
            }),
        }),
    })
})

export const {
 useSendMailMutation,
} = contactApi