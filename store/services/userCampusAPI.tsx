import { baseAPI } from "./baseAPI";
import { IUserCampus } from "../features/userCampusSlice";

export const userCampusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserCampuses: builder.query<IUserCampus[], void>({
      query: () => ({
        url: "/publicSafety/userCampuses",
        method: "GET",
      }),
      transformResponse: (response: { data: IUserCampus[] }) => response.data,
    }),
    fetchUserCampusById: builder.query<IUserCampus, string>({
      query: (id) => ({
        url: `/publicSafety/userCampuses/${id}`,
        method: "GET",
      }),
    }),
    createUserCampus: builder.mutation<IUserCampus, Partial<IUserCampus>>({
      query: (userCampus) => ({
        url: "/publicSafety/userCampuses",
        method: "POST",
        body: userCampus,
      }),
    }),
    updateUserCampus: builder.mutation<
      IUserCampus,
      { id: number; userId: number; campusId: number; primaryCampus: boolean }
    >({
      query: ({ id, userId, campusId, primaryCampus }) => ({
        url: `/publicSafety/userCampuses/${id}`,
        method: "PUT",
        body: { userId, campusId, primaryCampus },
      }),
    }),
    deleteUserCampus: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/userCampuses/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchUserCampusesQuery,
  useFetchUserCampusByIdQuery,
  useCreateUserCampusMutation,
  useUpdateUserCampusMutation,
  useDeleteUserCampusMutation,
} = userCampusAPI;
