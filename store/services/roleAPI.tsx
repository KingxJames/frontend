import { baseAPI } from "./baseAPI";
import { IRole } from "../features/roleSlice";

export const roleAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchRoles: builder.query<IRole[], void>({
      query: () => ({
        url: "/v1/publicSafety/roles",
        method: "GET",
      }),
      transformResponse: (response: { data: IRole[] }) => {
        console.log("API Response:", response); // Log full response
        console.log("Transformed Data:", response.data); // Log extracted data
        return response.data;
      },
    }),
    fetchRoleById: builder.query<IRole, string>({
      query: (id) => ({
        url: `/v1/publicSafety/roles/${id}`,
        method: "GET",
      }),
    }),
    createRole: builder.mutation<IRole, Partial<IRole>>({
      query: (roles) => ({
        url: "/v1/publicSafety/roles",
        method: "POST",
        body: roles,
      }),
    }),
    updateRole: builder.mutation<IRole, { id: string; roles: Partial<IRole> }>({
      query: ({ id, roles }) => ({
        url: `/v1/publicSafety/roles/${id}`,
        method: "PUT",
        body: roles,
      }),
    }),
    deleteRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/roles/${id}`,
        method: "DELETE",
      }),
    }),
    assignRole: builder.mutation<IRole, { userId: string; roleId: string }>({
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
  useAssignRoleMutation,
} = roleAPI;
