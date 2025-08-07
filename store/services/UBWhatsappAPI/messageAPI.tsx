import { baseAPI } from "../baseAPI";
import { IMessage } from "../../features/UBWhatsappSlice/messageSlice";

export const messageApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchMessages: builder.query<IMessage[], void>({
      query: () => ({
        url: "/publicSafety/messages",
        method: "GET",
      }),
      transformResponse: (response: { data: IMessage[] }) => response.data,
    }),
    fetchMessageById: builder.query<IMessage, string>({
      query: (id) => ({
        url: `/publicSafety/messages/${id}`,
        method: "GET",
      }),
    }),
    createMessage: builder.mutation<IMessage, Partial<IMessage>>({
      query: (message) => ({
        url: "/publicSafety/messages",
        method: "POST",
        body: message,
      }),
    }),
    updateMessage: builder.mutation<IMessage, Partial<IMessage>>({
      query: ({ id, ...rest }: { id: string } & Partial<IMessage>) => ({
        url: `/publicSafety/messages/${id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    deleteMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/messages/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchMessagesQuery,
  useFetchMessageByIdQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
