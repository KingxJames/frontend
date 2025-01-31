import { baseAPI } from "./baseAPI";

export const incidentTypesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchIncidentTypes: builder.query<any[], void>({
      query: () => ({
        url: "/v1/publicSafety/incidentTypes",
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    fetchIncidentTypeById: builder.query<any, string>({
      query: (id) => ({
        url: `/v1/publicSafety/incidentTypes/${id}`,
        method: "GET",
      }),
    }),
    createIncidentType: builder.mutation<any, Partial<any>>({
      query: (incidentType) => ({
        url: "/v1/publicSafety/incidentTypes",
        method: "POST",
        body: incidentType,
      }),
    }),
    updateIncidentType: builder.mutation<
      any,
      { id: string; incidentType: Partial<any> }
    >({
      query: ({ id, incidentType }) => ({
        url: `/v1/publicSafety/incidentTypes/${id}`,
        method: "PUT",
        body: incidentType,
      }),
    }),
    deleteIncidentType: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/incidentTypes/${id}`,
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
