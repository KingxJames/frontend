import { baseAPI } from "./baseAPI";
import { IUser } from "../features/userSlice";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<IUser[], void>({
      query: () => ({
        url: "/v1/publicSafety/users",
        method: "GET",
      }),
      transformResponse: (response: { data: IUser[] }) => {
        console.log("API Response:", response); // Log full response
        console.log("Transformed Data:", response.data); // Log extracted data
        return response.data;
      },
    }),
    fetchUserById: builder.query<IUser, string>({
      query: (id) => ({
        url: `/v1/publicSafety/users/${id}`,
        method: "GET",
      }),
    }),
    createUser: builder.mutation<IUser, Partial<IUser>>({
      query: (user) => ({
        url: "/v1/publicSafety/users",
        method: "POST",
        body: user,
      }),
    }),
    updateUser: builder.mutation<
      IUser,
      {
        id: number;
        name: string;
        username: string;
        email: string;
        phoneNo: string;
        organization: string;
        domain: string;
        picture: string;
        password: string;
        roleId: number;
        campusId: number;
        campus: string;
        userStatusId: number;
        userStatuses: string;
        roles: string;
      }
    >({
      query: ({
        id,
        name,
        email,
        username,
        phoneNo,
        organization,
        domain,
        picture,
        password,
        roleId,
        campusId,
        campus,
        userStatusId,
        userStatuses,
        roles,
        
      }) => ({
        url: `/v1/publicSafety/users/${id}`,
        method: "PUT",
        body: {
          name,
          username,
          email,
          phoneNo,
          organization,
          domain,
          picture,
          password,
          roleId,
          campusId,
          campus,
          userStatusId,
          userStatuses,
          roles,

        },
      }),
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/v1/publicSafety/users/${id}`,
        method: "DELETE",
      }),
    }),
    usersTotal: builder.query<IUser, void>({
      query: () => ({
        url: "/v1/publicSafety/usersTotal",
        method: "GET",
      }),
      transformResponse: (response: { data: IUser }) => response.data,
    }),
  }),
});

export const {
  useFetchUserQuery,
  useFetchUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUsersTotalQuery,
} = userAPI;
