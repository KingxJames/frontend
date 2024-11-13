import { baseAPI } from "./baseAPI";
import { setAuthData } from "../features/authSlice";

export const authAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        loginWithGoogle: builder.query<void, void>({
            query: () => ({
                url: "auth/google",
                method: "GET",
            }),
        }),
        handleGoogleCallback: builder.mutation({
            query: (code: string) => ({
                url: "/auth/google/callback",
                method: "GET",
                params: { code },
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.data?.token) {
                        dispatch(setAuthData(data.data));
                    }
                } catch (error) {
                    console.error("Google login failed", error);
                }
            },
        }),
        getUser: builder.query({
            query: () => ({
                url: "/getUsername", // Assuming 'user' endpoint as defined in your Laravel API
                method: "GET",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data) {
                        if (data?.name && data?.email) {
                            console.log(data);
                            dispatch(setAuthData(data));
                        }
                        console.log(data);
                    }
                } catch (error) {
                    console.error("Failed to fetch user data", error);
                }
            },
        }),
    }),
});

export const {
    useLoginWithGoogleQuery,
    useHandleGoogleCallbackMutation,
    useGetUserQuery,
} = authAPI;
