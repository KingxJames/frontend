import { baseAPI } from "./baseAPI";
import {
  EndOfShiftReportSupervisorInitialState,
  setEndOfShiftReportSupervisor,
} from "../features/endOfShiftReportSupervisorSlice";

export const endOfShiftReportSupervisorAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    initializeEndOfShiftReportSupervisor: builder.mutation({
      query: (body: Partial<EndOfShiftReportSupervisorInitialState>) => ({
        url: "/publicSafety/initialize/endOfShiftReportSupervisor",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setEndOfShiftReportSupervisor(data));
        } catch (error) {
          console.error(
            "Failed to fetch end of shift report supervisor:",
            error
          );
        }
      },
    }),

    fetchEndOfShiftReportSupervisor: builder.query({
      query: () => ({
        url: "/publicSafety/endOfShiftReportSupervisor",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          dispatch(setEndOfShiftReportSupervisor(data));
        } catch (error) {
          console.error(
            "Failed to fetch end of shift report supervisor:",
            error
          );
        }
      },
    }),

    createEndOfShiftReportSupervisor: builder.mutation({
      query: (body: Partial<EndOfShiftReportSupervisorInitialState>) => ({
        url: "/publicSafety/endOfShiftReportSupervisor",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("---->", data);
          if (data?.data?.id) {
            dispatch(setEndOfShiftReportSupervisor(data.data));
          }
        } catch (error) {
          console.error(
            "Failed to fetch end of shift report supervisor:",
            error
          );
        }
      },
    }),

    updateEndOfShiftReportSupervisor: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/publicSafety/endOfShiftReportSupervisor/${id}`,
        method: "PUT",
        body: patch, // send the rest of the data to Laravel
      }),
    }),

    deleteEndOfShiftReportSupervisor: builder.mutation<void, string>({
      query: (id) => ({
        url: `/publicSafety/endOfShiftReportSupervisor/${id}`,
        method: "DELETE",
      }),
    }),
    generateEndOfShiftReportSupervisorPdf: builder.mutation({
      query: (id: string) => ({
        url: `/publicSafety/generateEndOfShiftReportSupervisorPdf/${id}`,
        method: "GET",
        responseHandler: (response: Response) => response.blob(),
        headers: {
          Accept: "application/pdf",
        },
      }),
    }),
    getUnsubmittedEndOfShiftReportSupervisor: builder.query({
      query: (): { url: string; method: string } => ({
        url: "/publicSafety/unsubmittedEndOfShiftReportSupervisor",
        method: "GET",
      }),
    }),
    endOfShiftReportSupervisorTotal: builder.query<{ total: number }, void>({
      query: () => ({
        url: "/publicSafety/endOfShiftReportSupervisorTotal",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useInitializeEndOfShiftReportSupervisorMutation,
  useFetchEndOfShiftReportSupervisorQuery,
  useCreateEndOfShiftReportSupervisorMutation,
  useUpdateEndOfShiftReportSupervisorMutation,
  useDeleteEndOfShiftReportSupervisorMutation,
  useGenerateEndOfShiftReportSupervisorPdfMutation,
  useGetUnsubmittedEndOfShiftReportSupervisorQuery,
  useEndOfShiftReportSupervisorTotalQuery,
} = endOfShiftReportSupervisorAPI;
