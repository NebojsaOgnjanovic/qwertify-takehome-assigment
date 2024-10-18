import { transform } from "@babel/core";
import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/dist/query";
import { makeQueryParams } from "../../utils/query-param-helper";

export type PaginatedResposneDto<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
};

export type PaginatedResposne<T> = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: T[];
};

export type UserResponseDto = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

export type GetAllUsersResponse = UserResponseDto[];

export type GetAllUsersParams = {
  page: number;
};

export default (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<PaginatedResposne<UserResponseDto>, GetAllUsersParams>({
    query: (params) => ({
      url: makeQueryParams(params, "/users"),
      method: "GET",

      transformResponse: (response: PaginatedResposne<UserResponseDto>) => {
        return {
          page: response.page,
          perPage: response.perPage,
          total: response.total,
          totalPages: response.totalPages,
          data: response.data.map((user) => ({
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            avatar: user.avatar,
          })),
        };
      },
    }),
    providesTags: ["users"],
  });
