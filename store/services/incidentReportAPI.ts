import { baseAPI } from "./baseAPI";

export const incidentFilesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchIncidentFiles: builder.query<any[], void>({
      query: () => ({
        url: "/v1/publicSafety/incidentFiles",
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    fetchIncidentFileById: builder.query<any, string>({
      query: (id) => ({
        url: `/v1/publicSafety/incidentFiles/${id}`,
        method: "GET",
      }),
    }),
    createIncidentFile: builder.mutation<any, Partial<any>>({
      query: (incidentFile) => ({
        url: "/v1/publicSafety/incidentFiles",
        method: "POST",
        body: incidentFile,
      }),
    }),
    updateIncidentFile: builder.mutation<
      any,
      { id: string; incidentFile: Partial<any> }
    >({
      query: ({ id, incidentFile }) => ({
        url: `/v1/publicSafety/incidentFiles/${id}`,
        method: "PUT",
        body: incidentFile,
      }),
    }),
    deleteIncidentFile: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/incidentFiles/${id}`,
        method: "DELETE",
      }),
    }),
      incidnetReportTotal: builder.query<any, void>({
        query: () => ({
          url: "/v1/publicSafety/incidentFilesTotal",
          method: "GET",
        }),
        transformResponse: (response: { data: any }) => response.data,
    }),
  }),
});

export const {
  useFetchIncidentFilesQuery,
  useFetchIncidentFileByIdQuery,
  useCreateIncidentFileMutation,
  useUpdateIncidentFileMutation,
  useDeleteIncidentFileMutation,
  useIncidnetReportTotalQuery
} = incidentFilesAPI;
