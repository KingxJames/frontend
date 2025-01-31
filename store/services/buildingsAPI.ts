import { baseAPI } from "./baseAPI";

export const buildingsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchBuildings: builder.query<any[], void>({
      query: () => ({
        url: "/v1/publicSafety/buildings",
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    fetchBuildingById: builder.query<any, string>({
      query: (id) => ({
        url: `/v1/publicSafety/buildings/${id}`,
        method: "GET",
      }),
    }),
    createBuilding: builder.mutation<any, Partial<any>>({
      query: (building) => ({
        url: "/v1/publicSafety/buildings",
        method: "POST",
        body: building,
      }),
    }),
    updateBuilding: builder.mutation<
      any,
      { id: string; building: Partial<any> }
    >({
      query: ({ id, building }) => ({
        url: `/v1/publicSafety/buildings/${id}`,
        method: "PUT",
        body: building,
      }),
    }),
    deleteBuilding: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/buildings/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchBuildingsQuery,
  useFetchBuildingByIdQuery,
  useCreateBuildingMutation,
  useUpdateBuildingMutation,
  useDeleteBuildingMutation,
} = buildingsAPI;