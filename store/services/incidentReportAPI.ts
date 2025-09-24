import { baseAPI } from "./baseAPI";
import {
  IncidentReportInitialState,
  setIncidentReportState,
} from "../features/incidentReportSlice";

export const incidentReportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initializeIncidentReport: builder.mutation({
      query: (body: Partial<IncidentReportInitialState>) => ({
        url: "/publicSafety/initialize/incidentReport",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("---->", data);
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
          console.log("---->", data);
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
          console.log("---->", data);
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
          console.log("---->", data);
          dispatch(setIncidentReportState(data));
        } catch (error) {
          console.error("Failed to fetch incident reports:", error);
        }
      },
    }),

    updateIncidentReport: builder.mutation({
      query: (body: Partial<IncidentReportInitialState> & { id: string }) => ({
        url: `/publicSafety/incidentReports/${body.id}`,
        method: "PUT",
    }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("---->", data);
          dispatch(setIncidentReportState(data));
        } catch (error) {
          console.error("Failed to fetch incident reports:", error);
        }
      },
    }),

   
    deleteIncidentReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/incidentReports/${id}`,
        method: "DELETE",
      }),
    }),
    // incidnetReportTotal: builder.query<IIncidentReport, void>({
    //   query: () => ({
    //     url: "/publicSafety/incidentReportTotal",
    //     method: "GET",
    //   }),
    //   transformResponse: (response: { data: IIncidentReport }) => response.data,
    // }),
  }),
});

export const {
  useInitializeIncidentReportMutation,
  useFetchIncidentReportQuery,
  // useFetchIncidentReportByIdQuery,
  useCreateIncidentReportMutation,
  useUpdateIncidentReportMutation,
  useDeleteIncidentReportMutation,
  // useIncidnetReportTotalQuery,
  // useUploadIncidentFileMutation,
} = incidentReportAPI;
