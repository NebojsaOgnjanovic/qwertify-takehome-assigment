import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/dist/query";
import api from "..";
import { UserResponseDto } from "./getAll";
import { PaginatedResponse } from "../../types/paginated-response";
import { mapUserDtoToClinet } from "../../utils/user-object-mapper";
import { User } from "../../types/user";

// Define the request type for creating a user
export type CreateUserRequest = {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

// Define the response type for creating a user
export type CreateUserResponse = {
  id: number;
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
    async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
      // Optimistically update the cache
      const patchResult = dispatch(
        api.util.updateQueryData(
          // @ts-expect-error
          "getUsers",
          undefined,
          (draft: PaginatedResponse<User>) => {
            const newUserClinet = mapUserDtoToClinet({ ...newUser, id: 66666 });
            draft.data.push(newUserClinet); // Add user to cache
          }
        )
      );

      try {
        await queryFulfilled;
      } catch {
        patchResult.undo(); // Revert if the mutation fails
      }
    },
    invalidatesTags: [{ type: "users", id: "LIST" }], // Invalidate list after mutation
  });
