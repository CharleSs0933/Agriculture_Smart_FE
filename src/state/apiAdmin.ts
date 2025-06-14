import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombaseQuery";
import { Product } from "@/types";

export const apiAdmin = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "apiAdmin",
  tagTypes: ["Products"],
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

    updateProduct: build.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: `Product/admin/${product.id}`,
        method: "PUT",
        body: product,
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

    bulkDeleteProducts: build.mutation<void, number[]>({
      query: (ids) => ({
        url: "Product/admin/bulk-delete",
        method: "DELETE",
        body: { ids },
      }),
      invalidatesTags: ["Products"],
    }),

    bulkUpdateProductStatus: build.mutation<
      void,
      { ids: number[]; isActive: boolean }
    >({
      query: ({ ids, isActive }) => ({
        url: "Product/admin/bulk-status",
        method: "PUT",
        body: { ids, isActive },
      }),
      invalidatesTags: ["Products"],
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
  useBulkDeleteProductsMutation,
  useBulkUpdateProductStatusMutation,
} = apiAdmin;
