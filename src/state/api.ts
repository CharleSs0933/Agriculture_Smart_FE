import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombaseQuery";

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: [
    "Products",
    "Reviews",
    "Cart",
    "Tickets",
    "News",
    "NewsCategories",
  ],
  endpoints: (build) => ({
    //#region Product
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
    //#endregion

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
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: build.mutation<void, void>({
      query: () => ({
        url: "/Cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    updateQuantity: build.mutation<CartItem, { id: number; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `/Cart/items/${id}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteItem: build.mutation<void, number>({
      query: (id) => ({
        url: `/Cart/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    //#endregion

    //#region Ticket
    sendTicket: build.mutation<void, CreateTicketRequest>({
      query: (ticket) => ({
        url: "/Ticket/farmer",
        method: "POST",
        body: ticket,
      }),
      invalidatesTags: ["Tickets"],
    }),

    getTickets: build.query<Ticket[], void>({
      query: () => "/Ticket/user",
      providesTags: ["Tickets"],
    }),
    //#endregion

    //#region News
    getAllNews: build.query<ApiResponse<News>, NewsQueryParams>({
      query: (queryParams) => {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
        return `/News/search?${params.toString()}`;
      },
      providesTags: ["News"],
    }),

    getNews: build.query<{ message: string; data: News }, number>({
      query: (id) => `/News/${id}`,
      providesTags: ["News"],
    }),

    getNewsCategories: build.query<
      { message: string; data: NewsCategory[] },
      void
    >({
      query: () => "/NewsCategory",
      providesTags: ["NewsCategories"],
    }),
    //#endregion
  }),
});

export const {
  useGetProductsQuery,
  useGetReviewsQuery,
  useAddToCartMutation,
  useGetCartQuery,
  useClearCartMutation,
  useUpdateQuantityMutation,
  useDeleteItemMutation,
  useSendTicketMutation,
  useGetTicketsQuery,
  useGetNewsQuery,
  useGetNewsCategoriesQuery,
  useGetAllNewsQuery,
} = api;
