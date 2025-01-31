import { baseAPI } from "./baseAPI";

export const roleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchRoles: builder.query<any[], void>({
      query: () => ({
        url: "/v1/publicSafety/roles",
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    fetchRoleById: builder.query<any, string>({
      query: (id) => ({
        url: `/v1/publicSafety/roles/${id}`,
        method: "GET",
      }),
    }),
    createRole: builder.mutation<any, Partial<any>>({
      query: (role) => ({
        url: "/v1/publicSafety/roles",
        method: "POST",
        body: role,
      }),
    }),
    updateRole: builder.mutation<any, { id: string; role: Partial<any> }>({
      query: ({ id, role }) => ({
        url: `/v1/publicSafety/roles/${id}`,
        method: "PUT",
        body: role,
      }),
    }),
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/roles/${id}`,
        method: "DELETE",
      }),
    }),
    assignRole: builder.mutation<any, { userId: string; roleId: string }>({
      query: ({ userId, roleId }) => ({
        url: `/v1/publicSafety/assignRole`,
        method: "POST",
        body: { userId, roleId },
      }),
    }),
  }),
});

export const {
  useFetchRolesQuery,
  useFetchRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAssignRoleMutation
} = roleAPI;
