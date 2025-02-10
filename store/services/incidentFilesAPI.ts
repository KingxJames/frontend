import { baseAPI } from "./baseAPI";
import { IIncidentFile } from "../features/incidentFileSlice";

export const incidentFilesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchIncidentFiles: builder.query<IIncidentFile[], void>({
      query: () => ({
        url: "/v1/publicSafety/incidentFiles",
        method: "GET",
      }),
      transformResponse: (response: { data: IIncidentFile[] }) => {
        console.log("API Response:", response); // Log full response
        console.log("Transformed Data:", response.data); // Log extracted data
        return response.data;
      },
    }),
    fetchIncidentFileById: builder.query<IIncidentFile, string>({
      query: (id) => ({
        url: `/v1/publicSafety/incidentFiles/${id}`,
        method: "GET",
      }),
    }),
    createIncidentFile: builder.mutation<IIncidentFile, Partial<IIncidentFile>>(
      {
        query: (incidentFile) => ({
          url: "/v1/publicSafety/incidentFiles",
          method: "POST",
          body: incidentFile,
        }),
      }
    ),
    updateIncidentFile: builder.mutation<
      IIncidentFile,
      { id: number; path: string; comment: string; messageId: number }
    >({
      query: ({ id, path, messageId, comment }) => ({
        url: `/v1/publicSafety/incidentFiles/${id}`,
        method: "PUT",
        body: { path, messageId, comment },
      }),
    }),
    deleteIncidentFile: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/incidentFiles/${id}`,
        method: "DELETE",
      }),
    }),
    incidentFileTotal: builder.query<IIncidentFile, void>({
      query: () => ({
        url: "/v1/publicSafety/incidentFilesTotal",
        method: "GET",
      }),
      transformResponse: (response: { data: IIncidentFile }) => response.data,
    }),
  }),
});

export const {
  useFetchIncidentFilesQuery,
  useFetchIncidentFileByIdQuery,
  useCreateIncidentFileMutation,
  useUpdateIncidentFileMutation,
  useDeleteIncidentFileMutation,
  useIncidentFileTotalQuery,
} = incidentFilesAPI;
