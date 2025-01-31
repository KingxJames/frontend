import { baseAPI } from "./baseAPI";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<any[], void>({
      query: () => ({
        url: "/v1/publicSafety/users",
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    fetchUserById: builder.query<any, string>({
      query: (id) => ({
        url: `/v1/publicSafety/users/${id}`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation<any, Partial<any>>({
      query: (user) => ({
        url: "/v1/publicSafety/users",
        method: "POST",
        body: user,
      }),
    }),
    updateUser: builder.mutation<any, { id: string; user: Partial<any> }>({
      query: ({ id, user }) => ({
        url: `/v1/publicSafety/users/${id}`,
        method: "PUT",
        body: user,
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/users/${id}`,
        method: "DELETE",
      }),
    }),
    usersTotal: builder.query<any, void>({
      query: () => ({
        url: "/v1/publicSafety/usersTotal",
        method: "GET",
      }),
      transformResponse: (response: { data: any }) => response.data,
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUsersTotalQuery,
} = userAPI;
