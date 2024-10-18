import api from "..";
import create from "./create";
import getAll from "./getAll";
import update from "./update";

export const usersClient = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: getAll(build),
    createUser: create(build),
    updateUser: update(build),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = usersClient;
