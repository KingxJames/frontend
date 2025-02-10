import { IDepartmentMembers } from "../features/departmentMemberSlice";
import { baseAPI } from "./baseAPI";

export const departmentMembersAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchDepartmentMembers: builder.query<IDepartmentMembers[], void>({
      query: () => ({
        url: "/v1/publicSafety/departmentMembers",
        method: "GET",
      }),
      transformResponse: (response: { data: IDepartmentMembers[] }) => {
        console.log("API Response:", response); // Log full response
        console.log("Transformed Data:", response.data); // Log extracted data
        return response.data;
      },
    }),
    fetchDepartmentMemberById: builder.query<IDepartmentMembers, string>({
      query: (id) => ({
        url: `/v1/publicSafety/departmentMembers/${id}`,
        method: "GET",
      }),
    }),
    createDepartmentMember: builder.mutation<
      IDepartmentMembers,
      Partial<IDepartmentMembers>
    >({
      query: (departmentId) => ({
        url: "/v1/publicSafety/departmentMembers",
        method: "POST",
        body: departmentId,
      }),
    }),
    updateDepartmentMember: builder.mutation<
      any,
      { id: number; departmentId: number; userId: number }
    >({
      query: ({ id, departmentId, userId }) => ({
        url: `/v1/publicSafety/departmentMembers/${id}`,
        method: "PUT",
        body: { departmentId, userId },
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
