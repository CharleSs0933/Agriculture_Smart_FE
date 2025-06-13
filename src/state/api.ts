import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombaseQuery";

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: ["Products", "Reviews", "Cart"],
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

    //#region  Review
    getReviews: build.query<
      { message: string; data: Review[] },
      { productId: number }
    >({
      query: ({ productId }) => `/Review/product/${productId}`,
      providesTags: ["Reviews"],
    }),
    //#endregion

    //#region Cart
    getCart: build.query<Cart, void>({
      query: () => "/Cart",
      providesTags: ["Cart"],
    }),

    addToCart: build.mutation<
      CartItem,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: "/Cart",
        method: "POST",
        body: { productId, quantity },
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),

    //#endregion
  }),
});

export const { useGetProductsQuery, useGetReviewsQuery, useAddToCartMutation } =
  api;
