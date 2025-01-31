import { baseAPI } from "./baseAPI";


export const departmentsAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        fetchDepartments: builder.query<any[], void>({
        query: () => ({
            url: "/v1/publicSafety/departments",
            method: "GET",
        }),
        transformResponse: (response: { data: any[] }) => response.data,
        }),
        fetchDepartmentById: builder.query<any, string>({
        query: (id) => ({
            url: `/v1/publicSafety/departments/${id}`,
            method: "GET",
        }),
        }),
        createDepartment: builder.mutation<any, Partial<any>>({
        query: (department) => ({
            url: "/v1/publicSafety/departments",
            method: "POST",
            body: department,
        }),
        }),
        updateDepartment: builder.mutation<
        any,
        { id: string; department: Partial<any> }
        >({
        query: ({ id, department }) => ({
            url: `/v1/publicSafety/departments/${id}`,
            method: "PUT",
            body: department,
        }),
        }),
        deleteDepartment: builder.mutation<void, string>({
        query: (id) => ({
            url: `/v1/publicSafety/departments/${id}`,
            method: "DELETE",
        }),
        }),
    }),
});

export const {
    useFetchDepartmentsQuery,
    useFetchDepartmentByIdQuery,
    useCreateDepartmentMutation,
    useUpdateDepartmentMutation,
    useDeleteDepartmentMutation,
} = departmentsAPI;