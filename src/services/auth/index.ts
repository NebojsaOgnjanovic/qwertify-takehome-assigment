import api from "..";
import login from "./login";

export const authClient = api.injectEndpoints({
  endpoints: (build) => ({
    login: login(build),
  }),
});

export const { useLoginMutation } = authClient;
