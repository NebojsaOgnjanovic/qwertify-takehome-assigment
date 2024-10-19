import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/dist/query";
import api from "..";
import { mapUserDtoToClinet } from "../../utils/user-object-mapper";
import { UserResponseDto } from "./getAll";
import { PaginatedResponse } from "../../types/paginated-response";
import { User } from "../../types/user";

export type UpdateUserRequest = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

export type UpdateUserResponse = {
  name: string;
  job: string;
  updatedAt: string;
};

export default (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<UpdateUserResponse, UpdateUserRequest>({
    query: ({ id, ...user }) => ({
      url: `/users/${id}`,
      method: "PATCH",
      body: user,
    }),
    async onQueryStarted(updatedUser, { dispatch, queryFulfilled }) {
      const patchResult = dispatch(
        api.util.updateQueryData(
          // @ts-expect-error
          "getUsers",
          undefined,
          (draft: PaginatedResponse<User>) => {
            const userIndex = draft.data.findIndex(
              (user: User) => user.id === updatedUser.id
            );

            const updatedUserClinet = mapUserDtoToClinet(updatedUser);

            if (userIndex >= 0) {
              draft.data[userIndex] = {
                ...draft.data[userIndex],
                ...updatedUserClinet,
              };
            }
          }
        )
      );
      try {
        await queryFulfilled;
      } catch {
        patchResult.undo();
      }
    },
  });
