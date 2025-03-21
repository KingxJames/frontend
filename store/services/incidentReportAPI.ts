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
    fetchIncidentReport: builder.query<IIncidentReport[], void>({
      query: () => ({
        url: "/v1/publicSafety/incidentReports",
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
        url: `/v1/publicSafety/incidentReports/${id}`,
        method: "GET",
      }),
    }),
    createIncidentReport: builder.mutation<
      IIncidentReport,
      Partial<IIncidentReport>
    >({
      query: (incidentFile) => ({
        url: "/v1/publicSafety/incidentReports",
        method: "POST",
        body: incidentFile,
      }),
    }),
    updateIncidentReport: builder.mutation<
      IIncidentReport,
      UpdateIncidentReportPayload
    >({
      query: (payload) => ({
        url: `/v1/publicSafety/incidentReports/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    uploadIncidentFile: builder.mutation<{ path: string }, FormData>({
      query: (formData) => ({
        url: "/uploadIncidentFile", // Adjust according to your API
        method: "POST",
        body: formData,
      }),
    }),
    deleteIncidentReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/incidentReports/${id}`,
        method: "DELETE",
      }),
    }),
    incidnetReportTotal: builder.query<IIncidentReport, void>({
      query: () => ({
        url: "/v1/publicSafety/incidentReportTotal",
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
