import { baseAPI } from "./baseAPI";

export const menuAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        fetchMenus: builder.query<any[], void>({
        query: () => ({
            url: "/v1/publicSafety/menu",
            method: "GET",
        }),
        transformResponse: (response: { data: any[] }) => response.data,
        }),
        fetchMenuById: builder.query<any, string>({
        query: (id) => ({
            url: `/v1/publicSafety/menu/${id}`,
            method: "GET",
        }),
        }),
        createMenu: builder.mutation<any, Partial<any>>({
        query: (menu) => ({
            url: "/v1/publicSafety/menu",
            method: "POST",
            body: menu,
        }),
        }),
        updateMenu: builder.mutation<
        any,
        { id: string; menu: Partial<any> }
        >({
        query: ({ id, menu }) => ({
            url: `/v1/publicSafety/menu/${id}`,
            method: "PUT",
            body: menu,
        }),
        }),
        deleteMenu: builder.mutation<void, string>({
        query: (id) => ({
            url: `/v1/publicSafety/menu/${id}`,
            method: "DELETE",
        }),
        }),
    }),
});

export const {
    useFetchMenusQuery,
    useFetchMenuByIdQuery,
    useCreateMenuMutation,
    useUpdateMenuMutation,
    useDeleteMenuMutation,
} = menuAPI;