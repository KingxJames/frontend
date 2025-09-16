import { baseAPI } from "./baseAPI";
import { IIncidentType, setIncidentTypes } from "../features/incidentTypeSlice";

export const incidentTypesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchIncidentTypes: builder.query<IIncidentType[], void>({
      query: () => "/publicSafety/incidentTypes",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setIncidentTypes(data));
        } catch (error) {
          console.error("Failed to fetch incident types:", error);
        }
      },
    }),
    fetchIncidentTypeById: builder.query<IIncidentType, string>({
      query: (id) => ({
        url: `/publicSafety/incidentTypes/${id}`,
        method: "GET",
      }),
    }),
    createIncidentType: builder.mutation<IIncidentType, Partial<IIncidentType>>(
      {
        query: (incidentType) => ({
          url: "/publicSafety/incidentTypes",
          method: "POST",
          body: incidentType,
        }),
      }
    ),
    updateIncidentType: builder.mutation<
      IIncidentType,
      { id: number; type: string; icon: string; message: string }
    >({
      query: ({ id, type, icon, message }) => ({
        url: `/publicSafety/incidentTypes/${id}`,
        method: "PUT",
        body: { type, icon, message },
      }),
    }),
    deleteIncidentType: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/incidentTypes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchIncidentTypesQuery,
  useFetchIncidentTypeByIdQuery,
  useCreateIncidentTypeMutation,
  useUpdateIncidentTypeMutation,
  useDeleteIncidentTypeMutation,
} = incidentTypesAPI;
