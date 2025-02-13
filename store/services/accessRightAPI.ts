import { baseAPI } from "./baseAPI";

export const accessRightAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        fetchAccessRights: builder.query<any[], void>({
        query: () => ({
            url: "/v1/publicSafety/accessRights",
            method: "GET",
        }),
        transformResponse: (response: { data: any[] }) => response.data,
        }),
        fetchAccessRightById: builder.query<any, string>({
        query: (id) => ({
            url: `/v1/publicSafety/accessRights/${id}`,
            method: "GET",
        }),
        }),
        createAccessRight: builder.mutation<any, Partial<any>>({
        query: (accessRight) => ({
            url: "/v1/publicSafety/accessRights",
            method: "POST",
            body: accessRight,
        }),
        }),
        updateAccessRight: builder.mutation<
        any,
        { id: number; description: string; roleId: number; }
        >({
        query: ({ id, description, roleId}) => ({
            url: `/v1/publicSafety/accessRights/${id}`,
            method: "PUT",
            body: { description, roleId },
        }),
        }),
        deleteAccessRight: builder.mutation<void, string>({
        query: (id) => ({
            url: `/v1/publicSafety/accessRights/${id}`,
            method: "DELETE",
        }),
        }),
    }),
});

export const {
    useFetchAccessRightsQuery,
    useFetchAccessRightByIdQuery,
    useCreateAccessRightMutation,
    useUpdateAccessRightMutation,
    useDeleteAccessRightMutation,
} = accessRightAPI;