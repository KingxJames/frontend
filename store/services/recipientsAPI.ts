import { baseAPI } from "./baseAPI";
import { IRecipient } from "../features/recipientSlice";

export const recipientsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchRecipients: builder.query<IRecipient[], void>({
      query: () => ({
        url: "/publicSafety/recipients",
        method: "GET",
      }),
      transformResponse: (response: { data: IRecipient[] }) => response.data,
    }),
    fetchRecipientById: builder.query<IRecipient, string>({
      query: (id) => ({
        url: `/publicSafety/recipients/${id}`,
        method: "GET",
      }),
    }),
    createRecipient: builder.mutation<IRecipient, Partial<IRecipient>>({
      query: (recipient) => ({
        url: "/publicSafety/recipients",
        method: "POST",
        body: recipient,
      }),
    }),
    updateRecipient: builder.mutation<
      IRecipient,
      { id: number; userId: number; messageId: number }
    >({
      query: ({ id, userId, messageId }) => ({
        url: `/publicSafety/recipients/${id}`,
        method: "PUT",
        body: { userId, messageId },
      }),
    }),
    deleteRecipient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/recipients/${id}`,
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
