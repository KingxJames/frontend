import { baseAPI } from "./baseAPI";
import {
  IBuilding,
  setBuilding,
  BuildingInitialState,
} from "../features/buildingSlice";

export const buildingsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchBuildings: builder.query<IBuilding[], void>({
      query: () => "/publicSafety/buildings",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(setBuilding(data));
        } catch (error) {
          console.error("Failed to fetch buildings:", error);
        }
      },
    }),
    fetchBuildingById: builder.query<IBuilding, string>({
      query: (id) => ({
        url: `/publicSafety/buildings/${id}`,
        method: "GET",
      }),
    }),
    createBuildings: builder.mutation({
      query: (body: Partial<BuildingInitialState>) => ({
        url: "/publicSafety/buildings",
        method: "POST",
        body,
      }),
    }),
    updateBuildings: builder.mutation<
      IBuilding,
      {
        id: string;
        name: string;
        location: string;
        campus: string;
      }
    >({
      query: ({ id, name, location, campus }) => ({
        url: `/publicSafety/buildings/${id}`,
        method: "PUT",
        body: { name, location, campus },
      }),
    }),
    deleteBuildings: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/buildings/${id}`,
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
