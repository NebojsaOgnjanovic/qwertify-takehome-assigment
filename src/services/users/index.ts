import api from "..";
import getAll from "./getAll";

export const usersClient = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: getAll(build),
  }),
});

export const { useGetUsersQuery } = usersClient;
