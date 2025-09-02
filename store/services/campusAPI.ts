import { baseAPI } from "./baseAPI";
import {
  CampusInitialState,
  ICampus,
  setCampus,
} from "../features/campusSlice";

export const campusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchCampuses: builder.query<ICampus[], void>({
      query: () => "/publicSafety/campuses",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCampus(data as ICampus[]));
        } catch (error) {
          console.error("Failed to fetch campuses:", error);
        }
      },
    }),
    fetchCampusById: builder.query<ICampus, string>({
      query: (id) => ({
        url: `/publicSafety/campuses/${id}`,
        method: "GET",
      }),
    }),
    createCampuses: builder.mutation({
      query: (body: Partial<CampusInitialState>) => ({
        url: "/publicSafety/campuses",
        method: "POST",
        body,
      }),
    }),
    updateCampuses: builder.mutation<ICampus, { id: number; campus: string }>({
      query: ({ id, campus }) => ({
        url: `/publicSafety/campuses/${id}`,
        method: "PUT",
        body: { id, campus },
      }),
    }),
    deleteCampuses: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/campuses/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchCampusesQuery,
  useFetchCampusByIdQuery,
  useCreateCampusesMutation,
  useUpdateCampusesMutation,
  useDeleteCampusesMutation,
} = campusAPI;
