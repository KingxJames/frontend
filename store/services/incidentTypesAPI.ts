import { baseAPI } from "./baseAPI";
import { IIncidentType } from "../features/incidentTypeSlice";

export const incidentTypesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchIncidentTypes: builder.query<IIncidentType[], void>({
      query: () => ({
        url: "/publicSafety/incidentTypes",
        method: "GET",
      }),
      transformResponse: (response: { data: IIncidentType[] }) => {
        console.log("API Response:", response); // Log full response
        console.log("Transformed Data:", response.data); // Log extracted data
        return response.data;
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
