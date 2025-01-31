import { baseAPI } from "./baseAPI";

export const messageCategoriesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchMessageCategories: builder.query<any[], void>({
      query: () => ({
        url: "/v1/publicSafety/messageCategories",
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    fetchMessageCategoryById: builder.query<any, string>({
      query: (id) => ({
        url: `/v1/publicSafety/messageCategories/${id}`,
        method: "GET",
      }),
    }),
    createMessageCategory: builder.mutation<any, Partial<any>>({
      query: (messageCategory) => ({
        url: "/v1/publicSafety/messageCategories",
        method: "POST",
        body: messageCategory,
      }),
    }),
    updateMessageCategory: builder.mutation<
      any,
      { id: string; messageCategory: Partial<any> }
    >({
      query: ({ id, messageCategory }) => ({
        url: `/v1/publicSafety/messageCategories/${id}`,
        method: "PUT",
        body: messageCategory,
      }),
    }),
    deleteMessageCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/messageCategories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchMessageCategoriesQuery,
  useFetchMessageCategoryByIdQuery,
  useCreateMessageCategoryMutation,
  useUpdateMessageCategoryMutation,
  useDeleteMessageCategoryMutation,
} = messageCategoriesAPI;
