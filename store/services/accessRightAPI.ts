import { baseAPI } from "./baseAPI";
import { IAccessRight } from "../features/accessRightSlice";

export const accessRightAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        fetchAccessRights: builder.query<IAccessRight[], void>({
        query: () => ({
            url: "/v1/publicSafety/accessRights",
            method: "GET",
        }),
        transformResponse: (response: { data: IAccessRight[] }) => response.data,
        }),
        fetchAccessRightById: builder.query<IAccessRight, string>({
        query: (id) => ({
            url: `/v1/publicSafety/accessRights/${id}`,
            method: "GET",
        }),
        }),
        createAccessRight: builder.mutation<IAccessRight, Partial<IAccessRight>>({
        query: (accessRight) => ({
            url: "/v1/publicSafety/accessRights",
            method: "POST",
            body: accessRight,
        }),
        }),
        updateAccessRight: builder.mutation<IAccessRight,Partial<IAccessRight>>({
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