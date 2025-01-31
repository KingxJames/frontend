import { baseAPI } from "./baseAPI";


export const recipientsAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        fetchRecipients: builder.query<any[], void>({
        query: () => ({
            url: "/v1/publicSafety/recipients",
            method: "GET",
        }),
        transformResponse: (response: { data: any[] }) => response.data,
        }),
        fetchRecipientById: builder.query<any, string>({
        query: (id) => ({
            url: `/v1/publicSafety/recipients/${id}`,
            method: "GET",
        }),
        }),
        createRecipient: builder.mutation<any, Partial<any>>({
        query: (recipient) => ({
            url: "/v1/publicSafety/recipients",
            method: "POST",
            body: recipient,
        }),
        }),
        updateRecipient: builder.mutation<
        any,
        { id: string; recipient: Partial<any> }
        >({
        query: ({ id, recipient }) => ({
            url: `/v1/publicSafety/recipients/${id}`,
            method: "PUT",
            body: recipient,
        }),
        }),
        deleteRecipient: builder.mutation<void, string>({
        query: (id) => ({
            url: `/v1/publicSafety/recipients/${id}`,
            method: "DELETE",
        }),
        }),
    }),
});


export const {
    useFetchRecipientsQuery,
    useFetchRecipientByIdQuery,
    useCreateRecipientMutation,
    useUpdateRecipientMutation,
    useDeleteRecipientMutation,
} = recipientsAPI;