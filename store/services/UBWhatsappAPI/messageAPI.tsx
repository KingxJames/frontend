import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseAPI } from "../baseAPI";
import type {
  FilePreview,
  Message,
  MessagesState,
} from "../../features/UBWhatsappSlice/messageSlice"; // Import your types

// Define the API service
export const messageApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    // Get messages for a specific chat
    getMessages: builder.query<Message[], string>({
      query: (chatId) => `${chatId}`,
      // Transform the response to match your Message type
      transformResponse: (response: any[]) => {
        return response.map((msg) => ({
          ...msg,
          files: msg.files
            ? msg.files.map((file: any) => ({
                id: file.id,
                url: file.url,
                name: file.name,
                type: file.type,
              }))
            : null,
        }));
      },
    }),

    // Send a new message
    sendMessage: builder.mutation<
      Message,
      {
        chatId: string;
        sender: string;
        text: string;
        files?: FormData; // This matches what you're sending
      }
    >({
      query: ({ chatId, ...message }) => ({
        url: chatId,
        method: "POST",
        body: message,
      }),
    }),

    // Search messages within a chat
    searchMessages: builder.query<Message[], { chatId: string; query: string }>(
      {
        query: ({ chatId, query }) => `${chatId}/search?q=${query}`,
      }
    ),
    // Upload files (images) for a message
    uploadFiles: builder.mutation<
      FilePreview[],
      { chatId: string; files: FormData }
    >({
      query: ({ chatId, files }) => ({
        url: `${chatId}/upload`,
        method: "POST",
        body: files,
      }),
    }),

    // Get shared images for a chat
    getSharedImages: builder.query<Array<{ src: string; alt: string }>, string>(
      {
        query: (chatId) => `${chatId}/images`,
        transformResponse: (response: any[]) => {
          return response.map((img) => ({
            src: img.url,
            alt: img.description || `Shared image`,
          }));
        },
      }
    ),

    // Delete a message
    deleteMessage: builder.mutation<
      void,
      { chatId: string; messageId: string }
    >({
      query: ({ chatId, messageId }) => ({
        url: `${chatId}/${messageId}`,
        method: "DELETE",
      }),
    }),

    // Clear all messages in a chat
    clearChatMessages: builder.mutation<void, string>({
      query: (chatId) => ({
        url: `${chatId}/clear`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useSearchMessagesQuery,
  useUploadFilesMutation,
  useGetSharedImagesQuery,
  useDeleteMessageMutation,
  useClearChatMessagesMutation,
  useLazyGetMessagesQuery,
  useLazySearchMessagesQuery,
  useLazyGetSharedImagesQuery,
} = messageApi;
