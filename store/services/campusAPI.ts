import { baseAPI } from "./baseAPI";
import { ICampus } from "../features/campusSlice";

export const campusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchCampuses: builder.query<ICampus[], void>({
      query: () => ({
        url: "/publicSafety/campuses",
        method: "GET",
      }),
      transformResponse: (response: { data: ICampus[] }) => {
        console.log("API Response:", response); // Log full response
        console.log("Transformed Data:", response.data); // Log extracted data
        return response.data;
      },
    }),
    fetchCampusById: builder.query<ICampus, string>({
      query: (id) => ({
        url: `/publicSafety/campuses/${id}`,
        method: "GET",
      }),
    }),
    createCampuses: builder.mutation<ICampus, Partial<ICampus>>({
      query: (campus) => ({
        url: "/publicSafety/campuses",
        method: "POST",
        body: campus,
      }),
    }),
    updateCampuses: builder.mutation<ICampus, { id: number; campus: string }>({
      query: ({ id, campus }) => ({
        url: `/publicSafety/campuses/${id}`,
        method: "PUT",
        body: {id, campus},
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
