import api from "..";
import create from "./create";
import _delete from "./delete";
import getAll from "./getAll";
import update from "./update";

export const usersClient = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: getAll(build),
    createUser: create(build),
    updateUser: update(build),
    deleteUser: _delete(build),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersClient;
