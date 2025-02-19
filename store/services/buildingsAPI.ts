import { baseAPI } from "./baseAPI";
import { IBuilding } from "../features/buildingSlice";

export const buildingsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchBuildings: builder.query<IBuilding[], void>({
      query: () => ({
        url: "/v1/publicSafety/buildings",
        method: "GET",
      }),
      transformResponse: (response: { data: IBuilding[] }) => {
        console.log("API Response:", response); // Log full response
        console.log("Transformed Data:", response.data); // Log extracted data
        return response.data;
      },
    }),
    fetchBuildingById: builder.query<IBuilding, number>({
      query: (id) => ({
        url: `/v1/publicSafety/buildings/${id}`,
        method: "GET",
      }),
    }),
    createBuildings: builder.mutation<IBuilding, Partial<IBuilding>>({
      query: (name) => ({
        url: "/v1/publicSafety/buildings",
        method: "POST",
        body: name,
      }),
    }),
    updateBuildings: builder.mutation<IBuilding, Partial<IBuilding>>({
      query: ({ id, name, location, campusId }) => ({
        url: `/v1/publicSafety/buildings/${id}`,
        method: "PUT",
        body: { name, location, campusId },
      }),
    }),
    deleteBuildings: builder.mutation<void, string>({
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
  useCreateBuildingsMutation,
  useUpdateBuildingsMutation,
  useDeleteBuildingsMutation,
} = buildingsAPI;
