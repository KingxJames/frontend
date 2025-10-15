import { baseAPI } from "./baseAPI";
import {
  IncidentReportInitialState,
  setIncidentReportState,
} from "../features/incidentReportSlice";

export const incidentReportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initializeIncidentReport: builder.mutation({
      query: (body: Partial<IncidentReportInitialState>) => ({
        url: "/publicSafety/initialize/incidentReports",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setIncidentReportState(data));
        } catch (error) {
          console.error("Failed to fetch incident reports:", error);
        }
      },
    }),

    fetchIncidentReport: builder.query({
      query: () => ({
        url: "/publicSafety/incidentReports",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          dispatch(setIncidentReportState(data));
        } catch (error) {
          console.error("Failed to fetch incident reports:", error);
        }
      },
    }),

    fetchIncidentReportByID: builder.query({
      query: (id: string) => ({
        url: `/publicSafety/incidentReports/${id}`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          dispatch(setIncidentReportState(data));
        } catch (error) {
          console.error("Failed to fetch incident reports:", error);
        }
      },
    }),

    createIncidentReport: builder.mutation({
      query: (body: Partial<IncidentReportInitialState>) => ({
        url: "/publicSafety/incidentReports",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          if (data?.data?.id) {
            dispatch(setIncidentReportState(data.data));
          }
        } catch (error) {
          console.error("Failed to fetch incident reports:", error);
        }
      },
    }),

    updateIncidentReport: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/publicSafety/incidentReports/${id}`,
        method: "PUT",
        body: patch, // send the rest of the data to Laravel
      }),
    }),

    deleteIncidentReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/incidentReports/${id}`,
        method: "DELETE",
      }),
    }),
    generateIncidentReportPdf: builder.mutation({
      query: (id: string) => ({
        url: `/publicSafety/generateIncidentReportPdf/${id}`,
        method: "GET",
        responseHandler: (response: Response) => response.blob(),
        headers: {
          Accept: "application/pdf",
        },
      }),
    }),
    getUnsubmittedIncidentReport: builder.query({
      query: (): { url: string; method: string } => ({
        url: "/publicSafety/unsubmittedIncidentReports",
        method: "GET",
      }),
    }),
    incidentReportTotal: builder.query<{ total: number }, void>({
      query: () => ({
        url: "/publicSafety/incidentReportTotal",
        method: "GET",
      }),
    }),
    // uploadIncidentFile: builder.mutation({
  }),
});

export const {
  useInitializeIncidentReportMutation,
  useFetchIncidentReportQuery,
  // useFetchIncidentReportByIdQuery,
  useCreateIncidentReportMutation,
  useUpdateIncidentReportMutation,
  useDeleteIncidentReportMutation,
  useGenerateIncidentReportPdfMutation,
  useGetUnsubmittedIncidentReportQuery,
  useIncidentReportTotalQuery,
  // useUploadIncidentFileMutation,
} = incidentReportAPI;
