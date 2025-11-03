import { baseAPI } from "./baseAPI";
import {
  lostAndFoundTracking,
  setLostAndFoundTrackingState,
} from "../features/lostAndFoundTrackingSlice";

export const lostAndFoundTrackingAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initializeLostAndFoundTracking: builder.mutation({
      query: (body: Partial<lostAndFoundTracking>) => ({
        url: "/publicSafety/initialize/lostAndFoundTracking",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setLostAndFoundTrackingState(data));
        } catch (error) {
          console.error("Failed to fetch lostAndFoundTracking:", error);
        }
      },
    }),

    fetchLostAndFoundTracking: builder.query({
      query: () => ({
        url: "/publicSafety/lostAndFoundTracking",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          dispatch(setLostAndFoundTrackingState(data));
        } catch (error) {
          console.error("Failed to fetch lostAndFoundTracking:", error);
        }
      },
    }),

    fetchLostAndFoundTrackingByID: builder.query({
      query: (id: string) => ({
        url: `/publicSafety/lostAndFoundTracking/${id}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          dispatch(setLostAndFoundTrackingState(data));
        } catch (error) {
          console.error("Failed to fetch lostAndFoundTracking:", error);
        }
      },
    }),

    createLostAndFoundTracking: builder.mutation({
      query: (body: Partial<lostAndFoundTracking>) => ({
        url: "/publicSafety/lostAndFoundTracking",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          if (data?.data?.id) {
            dispatch(setLostAndFoundTrackingState(data.data));
          }
        } catch (error) {
          console.error("Failed to fetch lostAndFoundTracking:", error);
        }
      },
    }),

    updateLostAndFoundTracking: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/publicSafety/lostAndFoundTracking/${id}`,
        method: "PUT",
        body: patch, // send the rest of the data to Laravel
      }),
    }),

    deleteLostAndFoundTracking: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/lostAndFoundTracking/${id}`,
        method: "DELETE",
      }),
    }),
    generateLostAndFoundTrackingPdf: builder.mutation<Blob, string>({
      query: (id: string) => ({
        url: `/publicSafety/generateLostAndFoundPdf/${id}`,
        method: "GET",
        responseHandler: (response: Response) => response.blob(),
        headers: {
          Accept: "application/pdf",
        },
      }),
    }),

    getUnsubmittedLostAndFoundTracking: builder.query({
      query: (): { url: string; method: string } => ({
        url: "/publicSafety/unsubmittedLostAndFoundTracking",
        method: "GET",
      }),
    }),
    lostAndFoundTrackingTotal: builder.query<{ total: number }, void>({
      query: () => ({
        url: "/publicSafety/lostAndFoundTrackingTotal",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useInitializeLostAndFoundTrackingMutation,
  useFetchLostAndFoundTrackingQuery,
  useCreateLostAndFoundTrackingMutation,
  useUpdateLostAndFoundTrackingMutation,
  useDeleteLostAndFoundTrackingMutation,
  useGenerateLostAndFoundTrackingPdfMutation,
  useFetchLostAndFoundTrackingByIDQuery,
  useGetUnsubmittedLostAndFoundTrackingQuery,
  useLostAndFoundTrackingTotalQuery,
} = lostAndFoundTrackingAPI;
