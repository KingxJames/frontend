import { baseAPI } from "./baseAPI";
import { IIncidentStatus } from "../features/incidentStatusSlice";

export const incidentStatusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchIncidentStatuses: builder.query<IIncidentStatus[], void>({
      query: () => ({
        url: "/publicSafety/incidentStatuses",
        method: "GET",
      }),
      transformResponse: (response: { data: IIncidentStatus[] }) => {
        console.log("API Response:", response); // Log full response
        console.log("Transformed Data:", response.data); // Log extracted data
        return response.data;
      },
    }),
    fetchIncidentStatusById: builder.query<IIncidentStatus, string>({
      query: (id) => ({
        url: `/publicSafety/incidentStatuses/${id}`,
        method: "GET",
      }),
    }),
    createIncidentStatus: builder.mutation<
      IIncidentStatus,
      Partial<IIncidentStatus>
    >({
      query: (incidentStatus) => ({
        url: "/publicSafety/incidentStatuses",
        method: "POST",
        body: incidentStatus,
      }),
    }),
    updateIncidentStatus: builder.mutation<
      IIncidentStatus,
      { id: number; statuses: string }
    >({
      query: ({ id, statuses }) => ({
        url: `/publicSafety/incidentStatuses/${id}`,
        method: "PUT",
        body: { statuses },
      }),
    }),
    deleteIncidentStatus: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/incidentStatuses/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchIncidentStatusesQuery,
  useFetchIncidentStatusByIdQuery,
  useCreateIncidentStatusMutation,
  useUpdateIncidentStatusMutation,
  useDeleteIncidentStatusMutation,
} = incidentStatusAPI;
