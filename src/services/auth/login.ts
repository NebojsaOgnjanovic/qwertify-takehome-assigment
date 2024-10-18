import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/dist/query";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export default (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<LoginResponse, LoginRequest>({
    query: (credentials) => ({
      url: "/login",
      method: "POST",
      body: credentials,
    }),
  });
