import { baseAPI } from "./baseAPI";

export const subMenusAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        fetchSubMenus: builder.query<any[], void>({
        query: () => ({
            url: "/v1/publicSafety/subMenus",
            method: "GET",
        }),
        transformResponse: (response: { data: any[] }) => response.data,
        }),
        fetchSubMenuById: builder.query<any, string>({
        query: (id) => ({
            url: `/v1/publicSafety/subMenus/${id}`,
            method: "GET",
        }),
        }),
        createSubMenu: builder.mutation<any, Partial<any>>({
        query: (subMenu) => ({
            url: "/v1/publicSafety/subMenus",
            method: "POST",
            body: subMenu,
        }),
        }),
        updateSubMenu: builder.mutation<
        any,
        { id: string; subMenu: Partial<any> }
        >({
        query: ({ id, subMenu }) => ({
            url: `/v1/publicSafety/subMenus/${id}`,
            method: "PUT",
            body: subMenu,
        }),
        }),
        deleteSubMenu: builder.mutation<void, string>({
        query: (id) => ({
            url: `/v1/publicSafety/subMenus/${id}`,
            method: "DELETE",
        }),
        }),
    }),
});

export const {
    useFetchSubMenusQuery,
    useFetchSubMenuByIdQuery,
    useCreateSubMenuMutation,
    useUpdateSubMenuMutation,
    useDeleteSubMenuMutation,
} = subMenusAPI;