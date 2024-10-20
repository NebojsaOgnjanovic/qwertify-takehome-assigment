import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api",
  }),
  endpoints: () => ({}),
  tagTypes: ["users"],
});

export default api;
