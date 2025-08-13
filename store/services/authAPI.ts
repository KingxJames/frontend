import { baseAPI } from "./baseAPI";
import { setAuthData, logout } from "../features/authSlice";
import { API_HOST } from "../config/api";

interface ICredentials {
  username: string;
  password: string;
}

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: ICredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(input, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data?.data?.token) {
            console.log(data.data);
            dispatch(setAuthData({ ...data.data, username: input.username }));
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout(null));
        } catch (e) {
          console.error(e);
        }
      },
    }),
  }),
});

// Export hooks for components to use the endpoints
export const { useLoginMutation, useLogoutMutation } = authAPI;

export const validateToken = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;

  try {
    const res = await fetch(`${API_HOST}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!res.ok) throw new Error("Invalid token");
    const user = await res.json();

    return user;
  } catch (err) {
    localStorage.removeItem("access_token");
    return false;
  }
};
