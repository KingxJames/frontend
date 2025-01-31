import { baseAPI } from "./baseAPI";

export const departmentMembersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchDepartmentMembers: builder.query<any[], void>({
      query: () => ({
        url: "/v1/publicSafety/departmentMembers",
        method: "GET",
      }),
      transformResponse: (response: { data: any[] }) => response.data,
    }),
    fetchDepartmentMemberById: builder.query<any, string>({
      query: (id) => ({
        url: `/v1/publicSafety/departmentMembers/${id}`,
        method: "GET",
      }),
    }),
    createDepartmentMember: builder.mutation<any, Partial<any>>({
      query: (departmentMember) => ({
        url: "/v1/publicSafety/departmentMembers",
        method: "POST",
        body: departmentMember,
      }),
    }),
    updateDepartmentMember: builder.mutation<
      any,
      { id: string; departmentMember: Partial<any> }
    >({
      query: ({ id, departmentMember }) => ({
        url: `/v1/publicSafety/departmentMembers/${id}`,
        method: "PUT",
        body: departmentMember,
      }),
    }),
    deleteDepartmentMember: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/departmentMembers/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchDepartmentMembersQuery,
  useFetchDepartmentMemberByIdQuery,
  useCreateDepartmentMemberMutation,
  useUpdateDepartmentMemberMutation,
  useDeleteDepartmentMemberMutation,
} = departmentMembersAPI;
