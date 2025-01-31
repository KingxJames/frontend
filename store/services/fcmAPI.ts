import { baseAPI } from "./baseAPI";

export const fcmAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    createFCM: builder.mutation<any, Partial<any>>({
      query: (fcm) => ({
        url: "/v1/publicSafety/send-notification",
        method: "POST",
        body: fcm,
      }),
    }),
  }),
});
