import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/dist/query";

export type DeleteUserRequest = {
  id: number;
};

export default (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<null, DeleteUserRequest>({
    query: ({ id }) => ({
      url: `/users/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ["users"],
  });
