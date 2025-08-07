import { baseAPI } from "./baseAPI";
import { IMessageCategory } from "../features/messageCategoriesSlice";

export const messageCategoriesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchMessageCategories: builder.query<IMessageCategory[], void>({
      query: () => ({
        url: "/publicSafety/messageCategories",
        method: "GET",
      }),
      transformResponse: (response: { data: IMessageCategory[] }) =>
        response.data,
    }),
    fetchMessageCategoryById: builder.query<IMessageCategory, string>({
      query: (id) => ({
        url: `/publicSafety/messageCategories/${id}`,
        method: "GET",
      }),
    }),
    createMessageCategory: builder.mutation<
      IMessageCategory,
      Partial<IMessageCategory>
    >({
      query: (messageCategory) => ({
        url: "/publicSafety/messageCategories",
        method: "POST",
        body: messageCategory,
      }),
    }),
    updateMessageCategory: builder.mutation<
      IMessageCategory,
      { id: number; category: string }
    >({
      query: ({ id, category }) => ({
        url: `/publicSafety/messageCategories/${id}`,
        method: "PUT",
        body: { category },
      }),
    }),
    deleteMessageCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/messageCategories/${id}`,
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
