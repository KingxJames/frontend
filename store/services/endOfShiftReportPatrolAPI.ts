import { baseAPI } from "./baseAPI";
import {
  EndOfShiftReportPatrolInitialState,
  setEndOfShiftReportPatrol,
} from "../features/endOfShiftReportPatrolSlice";

export const endOfShiftReportPatrolAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initializeEndOfShiftReportPatrol: builder.mutation({
      query: (body: Partial<EndOfShiftReportPatrolInitialState>) => ({
        url: "/publicSafety/initialize/endOfShiftReportPatrols",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setEndOfShiftReportPatrol(data));
        } catch (error) {
          console.error("Failed to fetch end of shift report patrol:", error);
        }
      },
    }),

    fetchEndOfShiftReportPatrol: builder.query({
      query: () => ({
        url: "/publicSafety/endOfShiftReportPatrols",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          dispatch(setEndOfShiftReportPatrol(data));
        } catch (error) {
          console.error("Failed to fetch end of shift report patrol:", error);
        }
      },
    }),

    createEndOfShiftReportPatrol: builder.mutation({
      query: (body: Partial<EndOfShiftReportPatrolInitialState>) => ({
        url: "/publicSafety/endOfShiftReportPatrols",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          if (data?.data?.id) {
            dispatch(setEndOfShiftReportPatrol(data.data));
          }
        } catch (error) {
          console.error("Failed to fetch end of shift report patrol:", error);
        }
      },
    }),

    updateEndOfShiftReportPatrol: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/publicSafety/endOfShiftReportPatrols/${id}`,
        method: "PUT",
        body: patch, // send the rest of the data to Laravel
      }),
    }),

    deleteEndOfShiftReportPatrol: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/endOfShiftReportPatrols/${id}`,
        method: "DELETE",
      }),
    }),
    generateEndOfShiftReportPatrolPdf: builder.mutation({
      query: (id: string) => ({
        url: `/publicSafety/generateEndOfShiftReportPatrolPdf/${id}`,
        method: "GET",
        responseHandler: (response: Response) => response.blob(),
        headers: {
          Accept: "application/pdf",
        },
      }),
    }),
    getUnsubmittedEndOfShiftReportPatrol: builder.query({
      query: (): { url: string; method: string } => ({
        url: "/publicSafety/unsubmittedEndOfShiftReportPatrols",
        method: "GET",
      }),
    }),
    endOfShiftReportPatrolTotal: builder.query<{ total: number }, void>({
      query: () => ({
        url: "/publicSafety/endOfShiftReportPatrolTotal",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useInitializeEndOfShiftReportPatrolMutation,
  useFetchEndOfShiftReportPatrolQuery,
  useCreateEndOfShiftReportPatrolMutation,
  useUpdateEndOfShiftReportPatrolMutation,
  useDeleteEndOfShiftReportPatrolMutation,
  useGenerateEndOfShiftReportPatrolPdfMutation,
  useGetUnsubmittedEndOfShiftReportPatrolQuery,
  useEndOfShiftReportPatrolTotalQuery,
} = endOfShiftReportPatrolAPI;
