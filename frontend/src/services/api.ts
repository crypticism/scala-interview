import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Hiker, Bridge } from "../app/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    mode: "cors",
    credentials: "include",
    prepareHeaders(headers, api) {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBridges: builder.query<Bridge[], null>({
      query: () => "bridge",
    }),
    getHikers: builder.query<Hiker[], null>({
      query: () => "hiker",
    }),
  }),
});

export const { useGetBridgesQuery, useGetHikersQuery } = api;
