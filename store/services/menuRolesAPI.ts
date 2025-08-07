import { baseAPI } from "./baseAPI";
import { IMenuRole } from "../features/menuRoleSlice";

export const menuRolesAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchMenuRoles: builder.query<IMenuRole[], void>({
      query: () => ({
        url: "/publicSafety/menuRoles",
        method: "GET",
      }),
      transformResponse: (response: { data: IMenuRole[] }) => response.data,
    }),
    fetchMenuRoleById: builder.query<IMenuRole, string>({
      query: (id) => ({
        url: `/publicSafety/menuRoles/${id}`,
        method: "GET",
      }),
    }),
    createMenuRole: builder.mutation<IMenuRole, Partial<IMenuRole>>({
      query: (menuRole) => ({
        url: "/publicSafety/menuRoles",
        method: "POST",
        body: menuRole,
      }),
    }),
    updateMenuRole: builder.mutation<
      IMenuRole,
      { id: number; menuId: number; roleId: number }
    >({
      query: ({ id, menuId, roleId }) => ({
        url: `/publicSafety/menuRoles/${id}`,
        method: "PUT",
        body: { menuId, roleId },
      }),
    }),
    deleteMenuRole: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/menuRoles/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchMenuRolesQuery,
  useFetchMenuRoleByIdQuery,
  useCreateMenuRoleMutation,
  useUpdateMenuRoleMutation,
  useDeleteMenuRoleMutation,
} = menuRolesAPI;
