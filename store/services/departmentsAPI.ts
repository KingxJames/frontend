import { baseAPI } from "./baseAPI";
import { IDepartment } from "../features/departmentSlice";

export const departmentsAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchDepartments: builder.query<IDepartment[], void>({
      query: () => ({
        url: "/v1/publicSafety/departments",
        method: "GET",
      }),
      transformResponse: (response: { data: IDepartment[] }) => {
        console.log("API Response:", response); // Log full response
        console.log("Transformed Data:", response.data); // Log extracted data
        return response.data;
      },
    }),
    fetchDepartmentById: builder.query<IDepartment, string>({
      query: (id) => ({
        url: `/v1/publicSafety/departments/${id}`,
        method: "GET",
      }),
    }),
    createDepartment: builder.mutation<IDepartment, Partial<IDepartment>>({
      query: (department) => ({
        url: "/v1/publicSafety/departments",
        method: "POST",
        body: department,
      }),
    }),
    updateDepartment: builder.mutation<
      IDepartment,
      { id: number; departments: string;}
    >({
      query: ({ id, departments}) => ({
        url: `/v1/publicSafety/departments/${id}`,
        method: "PUT",
        body: { departments},
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
