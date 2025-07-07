import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombaseQuery";

export const apiAdmin = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "apiAdmin",
  tagTypes: ["Products", "Farmers", "Engineers"],
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
        url: "Product",
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
        url: `Product/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Products", id }],
    }),

    deleteProduct: build.mutation<void, number>({
      query: (id) => ({
        url: `Product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    //region API Farmer

    getFarmer: build.query<ApiResponse<Farmer>, FarmerQueryParams>({
      query: (queryParams) => {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
        return {
          url: `Farmers/search?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Farmers"],
    }),

    addFarmer: build.mutation<FarmerFormData, Partial<FarmerFormData>>({
      query: (farmer) => ({
        url: "/Farmers",
        method: "POST",
        body: farmer,
      }),
      invalidatesTags: ["Farmers"],
    }),

    updateFarmer: build.mutation<
      FarmerFormData,
      { id: number; data: Partial<FarmerFormData> }
    >({
      query: ({ id, data }) => ({
        url: `Farmers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Farmers", id }],
    }),

    deleteFarmer: build.mutation<void, number>({
      query: (id) => ({
        url: `Farmers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Farmers"],
    }),
    //endregion

    //region API Engineer
    getEngineer: build.query<ApiResponse<Engineer>, EngineerQueryParams>({
      query: (queryParams) => {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
        return {
          url: `Engineers/search?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Engineers"],
    }),

    addEngineer: build.mutation<EngineerFormdata, Partial<EngineerFormdata>>({
      query: (engineer) => ({
        url: "/Engineers",
        method: "POST",
        body: engineer,
      }),
      invalidatesTags: ["Engineers"],
    }),

    updateEngineer: build.mutation<
      EngineerFormdata,
      { id: number; data: Partial<EngineerFormdata> }
    >({
      query: ({ id, data }) => ({
        url: `Engineers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Engineers", id }],
    }),

    deleteEngineer: build.mutation<void, number>({
      query: (id) => ({
        url: `Engineers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Engineers"],
    }),
    //endregion
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
  useAddFarmerMutation,
  useUpdateFarmerMutation,
  useDeleteFarmerMutation,

  //Engineer
  useGetEngineerQuery,
  useAddEngineerMutation,
  useUpdateEngineerMutation,
  useDeleteEngineerMutation,
} = apiAdmin;
