import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/dist/query";
import api from "..";
import { UserResponseDto } from "./getAll";
import { PaginatedResponse } from "../../types/paginated-response";

// Define the request type for deleting a user
export type DeleteUserRequest = {
  id: number;
};

// Define the mutation for deleting a user
export default (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.mutation<null, DeleteUserRequest>({
    query: ({ id }) => ({
      url: `/users/${id}`,
      method: "DELETE",
    }),
    async onQueryStarted(deletedUser, { dispatch, queryFulfilled }) {
      // Optimistically update the cache by removing the user
      const patchResult = dispatch(
        api.util.updateQueryData(
          // @ts-expect-error
          "getUsers",
          undefined,
          (draft: PaginatedResponse<UserResponseDto>) => {
            const userIndex = draft.data.findIndex(
              (user: UserResponseDto) => user.id === deletedUser.id
            );

            if (userIndex >= 0) {
              draft.data.splice(userIndex, 1); // Remove the user from the array
            }
          }
        )
      );

      try {
        await queryFulfilled;
      } catch {
        patchResult.undo(); // Revert if the mutation fails
      }
    },
    invalidatesTags: [{ type: "users", id: "LIST" }], // Invalidate cache after mutation
  });
