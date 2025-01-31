import { baseAPI } from "./baseAPI";

export const userStatusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserStatuses: builder.query<any[], void>({
      query: () => ({
        url: "/v1/publicSafety/userStatuses",
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    fetchUserStatusById: builder.query<any, string>({
      query: (id) => ({
        url: `/v1/publicSafety/userStatuses/${id}`,
        method: "GET",
      }),
    }),
    createUserStatus: builder.mutation<any, Partial<any>>({
      query: (userStatus) => ({
        url: "/v1/publicSafety/userStatuses",
        method: "POST",
        body: userStatus,
      }),
    }),
    updateUserStatus: builder.mutation<
      any,
      { id: string; userStatus: Partial<any> }
    >({
      query: ({ id, userStatus }) => ({
        url: `/v1/publicSafety/userStatuses/${id}`,
        method: "PUT",
        body: userStatus,
      }),
    }),
    deleteUserStatus: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/userStatuses/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchUserStatusesQuery,
  useFetchUserStatusByIdQuery,
  useCreateUserStatusMutation,
  useUpdateUserStatusMutation,
  useDeleteUserStatusMutation,
} = userStatusAPI;
