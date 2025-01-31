import { baseAPI } from "./baseAPI";

export const menuRolesAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        fetchMenuRoles: builder.query<any[], void>({
        query: () => ({
            url: "/v1/publicSafety/menuRoles",
            method: "GET",
        }),
        transformResponse: (response: { data: any[] }) => response.data,
        }),
        fetchMenuRoleById: builder.query<any, string>({
        query: (id) => ({
            url: `/v1/publicSafety/menuRoles/${id}`,
            method: "GET",
        }),
        }),
        createMenuRole: builder.mutation<any, Partial<any>>({
        query: (menuRole) => ({
            url: "/v1/publicSafety/menuRoles",
            method: "POST",
            body: menuRole,
        }),
        }),
        updateMenuRole: builder.mutation<
        any,
        { id: string; menuRole: Partial<any> }
        >({
        query: ({ id, menuRole }) => ({
            url: `/v1/publicSafety/menuRoles/${id}`,
            method: "PUT",
            body: menuRole,
        }),
        }),
        deleteMenuRole: builder.mutation<void, string>({
        query: (id) => ({
            url: `/v1/publicSafety/menuRoles/${id}`,
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