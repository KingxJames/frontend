import { baseAPI } from "./baseAPI";
import {
  lostProperty,
  setLostPropertyState,
} from "../features/lostPropertySlice";

export const lostPropertyAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initializeLostProperty: builder.mutation({
      query: (body: Partial<lostProperty>) => ({
        url: "/publicSafety/initialize/lostProperty",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLostPropertyState(data));
        } catch (error) {
          console.error("Failed to fetch lostProperty:", error);
        }
      },
    }),

    fetchLostProperty: builder.query({
      query: () => ({
        url: "/publicSafety/lostProperty",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          dispatch(setLostPropertyState(data));
        } catch (error) {
          console.error("Failed to fetch lostProperty:", error);
        }
      },
    }),

    fetchLostPropertyByID: builder.query({
      query: (id: string) => ({
        url: `/publicSafety/lostProperty/${id}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          dispatch(setLostPropertyState(data));
        } catch (error) {
          console.error("Failed to fetch lostProperty:", error);
        }
      },
    }),

    createLostProperty: builder.mutation({
      query: (body: Partial<lostProperty>) => ({
        url: "/publicSafety/lostProperty",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          if (data?.data?.id) {
            dispatch(setLostPropertyState(data.data));
          }
        } catch (error) {
          console.error("Failed to fetch lostProperty:", error);
        }
      },
    }),

    updateLostProperty: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/publicSafety/lostProperty/${id}`,
        method: "PUT",
        body: patch, // send the rest of the data to Laravel
      }),
    }),

    deleteLostProperty: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/lostProperty/${id}`,
        method: "DELETE",
      }),
    }),
    generateLostPropertyPdf: builder.mutation<Blob, string>({
      query: (id: string) => ({
        url: `/publicSafety/generateLostPropertyPdf/${id}`,
        method: "GET",
        responseHandler: (response: Response) => response.blob(),
        headers: {
          Accept: "application/pdf",
        },
      }),
    }),

    getUnsubmittedLostProperty: builder.query({
      query: (): { url: string; method: string } => ({
        url: "/publicSafety/unsubmittedLostProperty",
        method: "GET",
      }),
    }),
    lostPropertyTotal: builder.query<{ total: number }, void>({
      query: () => ({
        url: "/publicSafety/lostPropertyTotal",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useInitializeLostPropertyMutation,
  useFetchLostPropertyQuery,
  useCreateLostPropertyMutation,
  useUpdateLostPropertyMutation,
  useDeleteLostPropertyMutation,
  useGenerateLostPropertyPdfMutation,
  useFetchLostPropertyByIDQuery,
  useGetUnsubmittedLostPropertyQuery,
  useLostPropertyTotalQuery,
} = lostPropertyAPI;