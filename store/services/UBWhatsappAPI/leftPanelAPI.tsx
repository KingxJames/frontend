import { baseAPI } from "../baseAPI";
import { ChatCardType } from "../../features/UBWhatsappSlice/leftPanelSlice";

export const leftPanelAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchLeftPanel: builder.query<ChatCardType, void>({
      query: () => ({
        url: "/v1/publicSafety/leftPanel",
        method: "GET",
      }),
      transformResponse: (response: { data: ChatCardType }) => response.data,
    }),

    fetchLeftPanelById: builder.query<ChatCardType, string>({
      query: (id) => ({
        url: `/v1/publicSafety/leftPanel/${id}`,
        method: "GET",
      }),
    }),
    createLeftPanel: builder.mutation<ChatCardType, Partial<ChatCardType>>({
      query: (leftPanel) => ({
        url: "/v1/publicSafety/leftPanel",
        method: "POST",
        body: leftPanel, // Assuming leftPanel is the correct type
      }),
    }),
    updateLeftPanel: builder.mutation<ChatCardType, Partial<ChatCardType>>({
      query: ({ id, ...leftPanel }) => ({
        url: `/v1/publicSafety/leftPanel/${id}`,
        method: "PUT",
        body: leftPanel,
      }),
    }),
    deleteLeftPanel: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/leftPanel/${id}`,
        method: "DELETE",
      }),
    }),
    searchLeftPanel: builder.query<ChatCardType, string>({
      query: (searchQuery) => ({
        url: `/v1/publicSafety/leftPanel/search?query=${searchQuery}`,
        method: "GET",
      }),
    }),
    fetchLeftPanelByCategory: builder.query<ChatCardType, string>({
      query: (category) => ({
        url: `/v1/publicSafety/leftPanel/category/${category}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useFetchLeftPanelQuery,
  useFetchLeftPanelByIdQuery,
  useCreateLeftPanelMutation,
  useUpdateLeftPanelMutation,
  useDeleteLeftPanelMutation,
  useSearchLeftPanelQuery,
  useFetchLeftPanelByCategoryQuery,
} = leftPanelAPI;
