import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombaseQuery";

export const apiAdmin = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "apiAdmin",
  tagTypes: ["Products", "Farmers"],
  endpoints: (build) => ({
    getAdminProducts: build.query<ApiResponse<Product>, ProductsQueryParams>({
      query: (queryParams) => {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
        return {
          url: `Product/admin?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Products"],
    }),

    getProductById: build.query<Product, number>({
      query: (id) => `Product/admin/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    createProduct: build.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: "Product/admin",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: build.mutation<
      Product,
      { id: number | string; data: Partial<Product> }
    >({
      query: ({ id, data }) => ({
        url: `Product/admin/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),

    deleteProduct: build.mutation<void, number>({
      query: (id) => ({
        url: `Product/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    getFarmer: build.query<ApiResponse<Farmer>, FarmerQueryParams>({
      query: (queryParams) => {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
        return {
          url: `Farmers?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Farmers"],
    }),
  }),
});

export const {
  // Products
  useGetAdminProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,

  //Farmer
  useGetFarmerQuery,
} = apiAdmin;
