import { baseAPI } from "./baseAPI";
import { IIncidentReport } from "../features/incidentReportSlice";

interface UpdateIncidentReportPayload {
  id: number;
  report: string;
  disposition: string;
  caseNumber: string;
  action: string;
  location: string;
  uploadedBy: string;
  frequency: number;
  incidentReoccured: string;
  incidentFiles: string;
  incidentStatusId: number;
  userId: number;
  campusId: number;
  buildingId: number;
  incidentTypeId: number;
}

export const incidentReportAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initializeIncidentReport: builder.query<void, void>({
      query: () => ({
        url: "/publicSafety/incidentReports/initialize",
        method: "post",
      }),
    }),
    fetchIncidentReport: builder.query<IIncidentReport[], void>({
      query: () => ({
        url: "/publicSafety/incidentReports",
        method: "GET",
      }),
      transformResponse: (response: { data: IIncidentReport[] }) => {
        console.log("API Response:", response); // Log full response
        console.log("Transformed Data:", response.data); // Log extracted data
        return response.data;
      },
    }),
    fetchIncidentReportById: builder.query<IIncidentReport, string>({
      query: (id) => ({
        url: `/publicSafety/incidentReports/${id}`,
        method: "GET",
      }),
    }),
    createIncidentReport: builder.mutation<
      IIncidentReport,
      Partial<IIncidentReport>
    >({
      query: (incidentFile) => ({
        url: "/publicSafety/incidentReports",
        method: "POST",
        body: incidentFile,
      }),
    }),
    updateIncidentReport: builder.mutation<
      IIncidentReport,
      UpdateIncidentReportPayload
    >({
      query: (payload) => ({
        url: `/publicSafety/incidentReports/${payload.id}`,
        method: "PUT",
        body: payload,
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
  useInitializeIncidentReportQuery,
  useFetchIncidentReportQuery,
  useFetchIncidentReportByIdQuery,
  useCreateIncidentReportMutation,
  useUpdateIncidentReportMutation,
  useDeleteIncidentReportMutation,
  useIncidnetReportTotalQuery,
  useUploadIncidentFileMutation,
} = incidentReportAPI;
