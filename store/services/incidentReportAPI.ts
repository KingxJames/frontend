import { baseAPI } from "./baseAPI";
import {
  IIncidentReport,
  setIncidentReport,
  IncidentReportInitialState,
  IIncidentFile,
} from "../features/incidentReportSlice";

export const incidentReportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchIncidentReport: builder.query<IIncidentReport[], void>({
      query: () => "/publicSafety/incidentReports",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("---->", data);
          dispatch(setIncidentReport(data));
        } catch (error) {
          console.error("Failed to fetch incident reports:", error);
        }
      },
    }),
    fetchIncidentReportById: builder.query<IIncidentReport, string>({
      query: (id) => ({
        url: `/publicSafety/incidentReports/${id}`,
        method: "GET",
      }),
    }),

    createIncidentReport: builder.mutation({
      query: (body: Partial<IncidentReportInitialState>) => ({
        url: "/publicSafety/incidentReports",
        method: "POST",
        body,
      }),
    }),

    updateIncidentReport: builder.mutation<
      IIncidentReport,
      {
        id: string;
        action: string;
        caseNumber: string;
        disposition: string;
        incidentStatus: string;
        incidentType: string;
        incidentFiles: IIncidentFile[];
        buildingId: number;
        buildingLocation: string;
        report: string;
        uploadedBy: string;
      }
    >({
      query: ({
        id,
        action,
        caseNumber,
        disposition,
        incidentStatus,
        incidentType,
        incidentFiles,
        buildingId,
        buildingLocation,
        report,
        uploadedBy,
      }) => ({
        url: `/publicSafety/incidentReports/${id}`,
        method: "PUT",
        body: {
          action,
          caseNumber,
          disposition,
          incidentStatus,
          incidentType,
          incidentFiles,
          buildingId,
          buildingLocation,
          report,
          uploadedBy,
        },
      }),
    }),
    uploadIncidentFile: builder.mutation<{ path: string }, FormData>({
      query: (formData) => ({
        url: "/publicSafety/uploadIncidentFile", // Adjust according to your API
        method: "POST",
        body: formData,
      }),
    }),
    deleteIncidentReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/incidentReports/${id}`,
        method: "DELETE",
      }),
    }),
    incidnetReportTotal: builder.query<IIncidentReport, void>({
      query: () => ({
        url: "/publicSafety/incidentReportTotal",
        method: "GET",
      }),
      transformResponse: (response: { data: IIncidentReport }) => response.data,
    }),
  }),
});

export const {
  useFetchIncidentReportQuery,
  useFetchIncidentReportByIdQuery,
  useCreateIncidentReportMutation,
  useUpdateIncidentReportMutation,
  useDeleteIncidentReportMutation,
  useIncidnetReportTotalQuery,
  useUploadIncidentFileMutation,
} = incidentReportAPI;
