import { baseAPI } from "./baseAPI";
import { IMessage } from "../../store/features/UBChat/chatSlice";

export const chatAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchMessages: builder.query<IMessage[], void>({
      query: () => ({
        url: "/v1/publicSafety/messages",
        method: "GET",
      }),
      transformResponse: (response: { data: IMessage[] }) => response.data,
    }),
    fetchMessageById: builder.query<IMessage, string>({
      query: (id) => ({
        url: `/v1/publicSafety/messages/${id}`,
        method: "GET",
      }),
    }),
    createMessage: builder.mutation<IMessage, Partial<IMessage>>({
      query: (message) => ({
        url: "/v1/publicSafety/messages",
        method: "POST",
        body: message,
      }),
    }),
    updateMessage: builder.mutation<
      IMessage,
      { id: string; message: Partial<IMessage> }
    >({
      query: ({ id, message }) => ({
        url: `/v1/publicSafety/messages/${id}`,
        method: "PUT",
        body: message,
      }),
    }),
    deleteMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/messages/${id}`,
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
  } = chatAPI;