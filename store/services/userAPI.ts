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
        email: string;
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
          email,
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
    uploadProfilePicture: builder.mutation<{ picture: string }, FormData>({
      query: (formData) => ({
        url: "/v1/publicSafety/uploadProfilePicture",
        method: "POST",
        body: formData,
      }),
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
  useUploadProfilePictureMutation,
} = userAPI;
