import { baseAPI } from "./baseAPI";
import { IUserStatus } from "../features/userStatusSlice";

export const userStatusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserStatuses: builder.query<IUserStatus[], void>({
      query: () => ({
        url: "/v1/publicSafety/userStatuses",
        method: "GET",
      }),
      transformResponse: (response: { data: IUserStatus[] }) => response.data,
    }),
    fetchUserStatusById: builder.query<IUserStatus, string>({
      query: (id) => ({
        url: `/v1/publicSafety/userStatuses/${id}`,
        method: "GET",
      }),
    }),
    createUserStatus: builder.mutation<IUserStatus, Partial<IUserStatus>>({
      query: (userStatus) => ({
        url: "/v1/publicSafety/userStatuses",
        method: "POST",
        body: userStatus,
      }),
    }),
    updateUserStatus: builder.mutation<
      IUserStatus,
      { id: number; userStatuses: string }
    >({
      query: ({ id, userStatuses }) => ({
        url: `/v1/publicSafety/userStatuses/${id}`,
        method: "PUT",
        body: { userStatuses },
      }),
    }),
    deleteUserStatus: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/userStatuses/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchUserStatusesQuery,
  useFetchUserStatusByIdQuery,
  useCreateUserStatusMutation,
  useUpdateUserStatusMutation,
  useDeleteUserStatusMutation,
} = userStatusAPI;
