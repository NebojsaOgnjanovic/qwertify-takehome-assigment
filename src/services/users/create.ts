import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/dist/query";

// Define the request type for creating a user
export type CreateUserRequest = {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

// Define the response type for creating a user
export type CreateUserResponse = {
  id: string;
  name: string;
  job: string;
  createdAt: string;
};

// Define the mutation for creating a user
export default (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<CreateUserResponse, CreateUserRequest>({
    query: (user) => ({
      url: "/users",
      method: "POST",
      body: user,
    }),
    invalidatesTags: ["users"],
  });
