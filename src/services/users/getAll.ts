import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/dist/query";
import { User } from "../../types/user";
import { makeQueryParams } from "../../utils/query-param-helper";
import { mapUsersResponseToClient } from "../../utils/user-object-mapper";
import { PaginatedResposne } from "../../types/paginated-response";

export type UserResponseDto = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type GetAllUsersResponse = UserResponseDto[];

export type GetAllUsersParams = {
  page: number;
};

export default (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<PaginatedResposne<User>, GetAllUsersParams>({
    query: (params) => ({
      url: makeQueryParams(params, "/users"),
      method: "GET",
    }),
    merge: (currentCache, newItems) => {
      if (newItems.page === 1) {
        return newItems;
      } else currentCache.data.push(...newItems.data);
    },
    serializeQueryArgs: ({ endpointName }) => {
      return endpointName;
    },
    transformResponse: mapUsersResponseToClient,
    keepUnusedDataFor: 0,
    providesTags: ["users"],
    forceRefetch({ currentArg, previousArg }) {
      return currentArg !== previousArg;
    },
  });
