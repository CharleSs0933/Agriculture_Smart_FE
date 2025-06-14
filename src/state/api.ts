import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombaseQuery";
import { Product } from "@/types";

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Products"],
  endpoints: (build) => ({
    getProducts: build.query<ApiResponse<Product>, ProductsQueryParams>({
      query: (queryParams) => {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
        return `/Product/public?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = api;
