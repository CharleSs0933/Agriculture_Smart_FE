import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./custombaseQuery";

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: "api",
  tagTypes: [
    "Products",
    "Reviews",
    "Cart",
    "CartCount",
    "Tickets",
    "News",
    "NewsCategories",
    "Blogs",
    "BlogsCategories",
    "Farmers",
    "Orders",
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

    getCartCount: build.query<number, void>({
      query: () => "/Cart/count",
      providesTags: ["CartCount"],
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
      invalidatesTags: ["Cart", "CartCount"],
    }),

    clearCart: build.mutation<void, void>({
      query: () => ({
        url: "/Cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", "CartCount"],
    }),

    updateQuantity: build.mutation<CartItem, { id: number; quantity: number }>({
      query: ({ id, quantity }) => ({
        url: `/Cart/items/${id}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Cart", "CartCount"],
    }),

    deleteItem: build.mutation<void, number>({
      query: (id) => ({
        url: `/Cart/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart", "CartCount"],
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

    //#region Blogs
    getAllBlogs: build.query<ApiResponse<BlogPost>, BlogsQueryParams>({
      query: (queryParams) => {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
        return `/Blog/search?${params.toString()}`;
      },
      providesTags: ["Blogs"],
    }),

    getMyBlogs: build.query<ApiResponse<BlogPost>, BlogsQueryParams>({
      query: (queryParams) => {
        const params = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined) {
            params.append(key, value.toString());
          }
        });
        return `/Blog/my-blogs?${params.toString()}`;
      },
      providesTags: ["Blogs"],
    }),

    getBlogBySlug: build.query<BlogPostDetail, string>({
      query: (slug) => `/Blog/slug/${slug}`,
      providesTags: ["Blogs"],
    }),

    getBlogById: build.query<BlogPostDetail, number>({
      query: (id) => `/Blog/${id}`,
      providesTags: ["Blogs"],
    }),

    getBlogsCategory: build.query<BlogCategory[], void>({
      query: () => "/BlogCategory",
      providesTags: ["BlogsCategories"],
    }),

    createBlog: build.mutation<BlogPost, BlogFormParams>({
      query: (blog) => ({
        url: "/Blog",
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["Blogs"],
    }),

    updateBlog: build.mutation<
      BlogPost,
      { id: number; formData: BlogFormParams }
    >({
      query: ({ id, formData }) => ({
        url: `/Blog/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Blogs"],
    }),

    //#endregion

    // #region Orders
    createOrder: build.mutation<
      Order,
      {
        shippingAddress: string;
        paymentMethod: "cod" | "bank_transfer" | "wallet";
      }
    >({
      query: ({ shippingAddress, paymentMethod }) => ({
        url: "/Order",
        method: "POST",
        body: { shippingAddress, paymentMethod },
      }),
      invalidatesTags: ["Cart", "Orders"],
    }),

    createPayment: build.mutation<
      { paymentUrl: string },
      { orderId: number; fullName: string }
    >({
      query: ({ orderId, fullName }) => ({
        url: "/Payment/create-payment",
        method: "POST",
        body: { orderId, fullName },
      }),
    }),

    getOrders: build.query<Order[], void>({
      query: () => "/Order",
      providesTags: ["Orders"],
    }),

    cancelOrder: build.mutation<void, number>({
      query: (orderId) => ({
        url: `/Order/${orderId}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: ["Orders"],
    }),
    //#endregion

    //#region Farmer
    getFarmer: build.query<Farmer, number>({
      query: (id) => `/Farmers/${id}`,
      providesTags: ["Farmers"],
      transformResponse: (response: {
        succes: boolean;
        message: string;
        data: Farmer;
      }) => response.data,
    }),

    updateFarmer: build.mutation<
      Farmer,
      {
        id: number;
        farmLocation: string;
        farmSize: number;
        cropTypes: string;
        farmingExperienceYears: number;
      }
    >({
      query: (body) => ({
        url: `/Farmers/${body.id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Farmers"],
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
  useGetAllBlogsQuery,
  useGetBlogsCategoryQuery,
  useGetBlogBySlugQuery,
  useGetBlogByIdQuery,
  useCreateOrderMutation,
  useCreatePaymentMutation,
  useGetCartCountQuery,
  useGetMyBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useGetFarmerQuery,
  useUpdateFarmerMutation,
  useGetOrdersQuery,
  useCancelOrderMutation,
} = api;
