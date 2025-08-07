import { baseAPI } from "./baseAPI";
import {
  DashboardInitialState,
  setDashboardState,
  setTotalState,
} from "../features/dashboardSlice";

export const dashboardAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    fetchDashboard: builder.query({
      query: () => ({
        url: "/users", //will change this in the future
        method: "GET",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.reportData._id) {
            dispatch(setDashboardState(data?.data?.reportData));
          }
        } catch (e) {
          console.error(e);
        }
      },
    }),

    fetchUsersTotal: builder.query<{ total: number }, void>({
      query: () => ({
        url: "/publicSafety/usersTotal",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("Fetched Total Users:", JSON.stringify(data)); // Log for debugging
          dispatch(setTotalState({ usersTotal: data.total })); // Update state
        } catch (e) {
          console.error(e);
        }
      },
    }),

    fetchReportTotal: builder.query<{ total: number }, void>({
      query: () => ({
        url: "/publicSafety/incidentReportTotal",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("Fetched Incident Reports:", JSON.stringify(data)); // Log for debugging
          dispatch(setTotalState({ reportTotal: data.total }));
        } catch (e) {
          console.error(e);
        }
      },
    }),

    fetchIncidentFilesTotal: builder.query<{ total: number }, void>({
      query: () => ({
        url: "/publicSafety/incidentFileTotal",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("Fetched Incident Files:", JSON.stringify(data)); // Log for debugging
          dispatch(setTotalState({ incidentFilesTotal: data.total }));
        } catch (e) {
          console.error(e);
        }
      },
    }),

    fetchMessageTotal: builder.query<{ total: number }, void>({
      query: () => ({
        url: "/publicSafety/totalMessages",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("Fetched messsage:", JSON.stringify(data)); // Log for debugging
          dispatch(setTotalState({ messageTotal: data.total }));
        } catch (e) {
          console.error(e);
        }
      },
    }),

    updateDashboard: builder.mutation({
      query: (body: Partial<DashboardInitialState>) => ({
        url: "/users", //this will change
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useFetchDashboardQuery,
  useFetchUsersTotalQuery,
  useFetchReportTotalQuery,
  useFetchIncidentFilesTotalQuery,
  useFetchMessageTotalQuery,
  useUpdateDashboardMutation,
} = dashboardAPI;
