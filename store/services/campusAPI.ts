import { baseAPI } from "./baseAPI";

export const campusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchCampuses: builder.query<any[], void>({
      query: () => ({
        url: "/v1/publicSafety/campus",
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    fetchCampusById: builder.query<any, string>({
      query: (id) => ({
        url: `/v1/publicSafety/campus/${id}`,
        method: "GET",
      }),
    }),
    createCampus: builder.mutation<any, Partial<any>>({
      query: (campus) => ({
        url: "/v1/publicSafety/campus",
        method: "POST",
        body: campus,
      }),
    }),
    updateCampus: builder.mutation<any, { id: string; campus: Partial<any> }>({
      query: ({ id, campus }) => ({
        url: `/v1/publicSafety/campus/${id}`,
        method: "PUT",
        body: campus,
      }),
    }),
    deleteCampus: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/campus/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchCampusesQuery,
  useFetchCampusByIdQuery,
  useCreateCampusMutation,
  useUpdateCampusMutation,
  useDeleteCampusMutation,
} = campusAPI;
