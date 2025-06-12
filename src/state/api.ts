import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombaseQuery";

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query<ApiResponse<Product>, ProductsQueryParams>({
      query: (queryParams) => `/products?${queryParams}`,
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = api;
