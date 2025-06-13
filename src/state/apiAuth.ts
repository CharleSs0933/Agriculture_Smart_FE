import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombaseQuery";

export const apiAuth = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "apiAuth",
  tagTypes: [""],
  endpoints: (build) => ({
    login: build.mutation<
      LoginResponse,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          username,
          password,
        },
        credentials: "include",
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
    register: build.mutation<
      void,
      {
        username: string;
        email: string;
        password: string;
        address: string;
        phoneNumber: string;
      }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          ...body,
          roleId: 3,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  apiAuth;
