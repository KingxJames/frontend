import { baseAPI } from "./baseAPI";

export const userCampusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserCampuses: builder.query<any[], void>({
      query: () => ({
        url: "/v1/publicSafety/userCampus",
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    fetchUserCampusById: builder.query<any, string>({
      query: (id) => ({
        url: `/v1/publicSafety/userCampus/${id}`,
        method: "GET",
      }),
    }),
    createUserCampus: builder.mutation<any, Partial<any>>({
      query: (userCampus) => ({
        url: "/v1/publicSafety/userCampus",
        method: "POST",
        body: userCampus,
      }),
    }),
    updateUserCampus: builder.mutation<
      any,
      { id: string; userCampus: Partial<any> }
    >({
      query: ({ id, userCampus }) => ({
        url: `/v1/publicSafety/userCampus/${id}`,
        method: "PUT",
        body: userCampus,
      }),
    }),
    deleteUserCampus: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/userCampus/${id}`,
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
