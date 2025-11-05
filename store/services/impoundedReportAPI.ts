import { baseAPI } from "./baseAPI";
import {
  impoundedReport,
  setImpoundedReportState,
} from "../features/impoundedReportSlice";

export const impoundedReportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initializeImpoundedReport: builder.mutation({
      query: (body: Partial<impoundedReport>) => ({
        url: "/publicSafety/initialize/impoundedReport",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setImpoundedReportState(data));
        } catch (error) {
          console.error("Failed to fetch impoundedReport:", error);
        }
      },
    }),

    fetchImpoundedReport: builder.query({
      query: () => ({
        url: "/publicSafety/impoundedReport",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          dispatch(setImpoundedReportState(data));
        } catch (error) {
          console.error("Failed to fetch impoundedReport:", error);
        }
      },
    }),

    fetchImpoundedReportByID: builder.query({
      query: (id: string) => ({
        url: `/publicSafety/impoundedReport/${id}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          dispatch(setImpoundedReportState(data));
        } catch (error) {
          console.error("Failed to fetch impoundedReport:", error);
        }
      },
    }),

    createImpoundedReport: builder.mutation({
      query: (body: Partial<impoundedReport>) => ({
        url: "/publicSafety/impoundedReport",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          if (data?.data?.id) {
            dispatch(setImpoundedReportState(data.data));
          }
        } catch (error) {
          console.error("Failed to fetch impoundedReport:", error);
        }
      },
    }),

    updateImpoundedReport: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/publicSafety/impoundedReport/${id}`,
        method: "PUT",
        body: patch, // send the rest of the data to Laravel
      }),
    }),

    deleteImpoundedReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/impoundedReport/${id}`,
        method: "DELETE",
      }),
    }),
    generateImpoundedReportPdf: builder.mutation<Blob, string>({
      query: (id: string) => ({
        url: `/publicSafety/generateImpoundedReportPdf/${id}`,
        method: "GET",
        responseHandler: (response: Response) => response.blob(),
        headers: {
          Accept: "application/pdf",
        },
      }),
    }),

    getUnsubmittedImpoundedReport: builder.query({
      query: (): { url: string; method: string } => ({
        url: "/publicSafety/unsubmittedImpoundedReport",
        method: "GET",
      }),
    }),
    impoundedReportTotal: builder.query<{ total: number }, void>({
      query: () => ({
        url: "/publicSafety/impoundedReportTotal",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useInitializeImpoundedReportMutation,
  useFetchImpoundedReportQuery,
  useCreateImpoundedReportMutation,
  useUpdateImpoundedReportMutation,
  useDeleteImpoundedReportMutation,
  useGenerateImpoundedReportPdfMutation,
  useFetchImpoundedReportByIDQuery,
  useGetUnsubmittedImpoundedReportQuery,
  useImpoundedReportTotalQuery,
} = impoundedReportAPI;