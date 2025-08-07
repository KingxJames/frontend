import { baseAPI } from "./baseAPI";
import { setAuthData } from "../features/authSlice";

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
  }),
});

// Export hooks for components to use the endpoints
export const { useLoginMutation } = authAPI;
