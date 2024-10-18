import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/dist/query";

// Define the request type for updating a user
export type UpdateUserRequest = {
  id: number; // The user ID that you are updating
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

// Define the response type for updating a user
export type UpdateUserResponse = {
  name: string;
  job: string;
  updatedAt: string; // The time the user was updated
};

// Define the mutation for updating a user
export default (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<UpdateUserResponse, UpdateUserRequest>({
    query: ({ id, ...user }) => ({
      url: `/users/${id}`,
      method: "PATCH",
      body: user,
    }),
    invalidatesTags: ["users"],
  });
