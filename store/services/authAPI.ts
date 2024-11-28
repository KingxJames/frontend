import { baseAPI } from "./baseAPI";
import { setAuthData } from '../features/authSlice'

interface IUser {
    id: number;
    name: string;
    email: string;
    picture: string;
    token: string;
    // Add other user properties here based on your API response.
}

export const authAPI = baseAPI.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials: { username: string; password: string }) => ({
                url: '/authenticate',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(input, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data?.data?.token) {
                        dispatch(setAuthData({ ...data.data, username: input.username }));
                    }
                } catch (e) {
                    console.error(e);
                }
            },
        }),
        fetchUsers: builder.query<IUser[], string>({
            query: (token) => ({
                url: '/v1/publicSafety/users',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            transformResponse: (response: { data: IUser[] }) => response.data,
        }),        
    }),
});

// Export hooks for components to use the endpoints
export const {
    useLoginMutation,
    useFetchUsersQuery,
} = authAPI;
