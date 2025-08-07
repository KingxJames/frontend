import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../config/api";

const baseUrl = API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: undefined,
  prepareHeaders: async (headers, { getState }: any) => {
    // console.dir(getState())
    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
});

const basequeryWithReauth = async (args: any, api: any, extraOptions: any) => {
  return await baseQuery(args, api, extraOptions);
};

export const baseAPI = createApi({
  baseQuery: basequeryWithReauth,
  reducerPath: "baseAPI",
  endpoints: (_) => ({}),
});
