import { baseAPI } from "./baseAPI";
import { IIncidentStatus, setIncidentStatus } from "../features/incidentStatusSlice";

export const incidentStatusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchIncidentStatuses: builder.query<IIncidentStatus[], void>({ 
      query: () => "/publicSafety/incidentStatus",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setIncidentStatus(data));
        } catch (error) {
          console.error("Failed to fetch incident statuses:", error);
        }
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
        url: "/publicSafety/incidentStatus",
        method: "POST",
        body: incidentStatus,
      }),
    }),
    updateIncidentStatus: builder.mutation<
      IIncidentStatus,
      { id: number; statuses: string }
    >({
      query: ({ id, statuses }) => ({
        url: `/publicSafety/incidentStatus/${id}`,
        method: "PUT",
        body: { statuses },
      }),
    }),
    deleteIncidentStatus: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/incidentStatus/${id}`,
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
