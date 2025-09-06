import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApiSlice = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Cart"],

  endpoints: (builder) => ({
    //--------------------------Add to Cart -----------------------
    AddToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    //-------------------------Update Cart------------------------
    UpdateCart: builder.mutation({
      query: (data) => ({
        url: "/cart/update-cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    //----------------------Remove Item from Cart-------------------

    RemoveItemFromCart: builder.mutation({
      query: (data) => ({
        url: "/cart/remove-item",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    //--------------------------Get Cart------------------------
    GetCartDetails: builder.query({
      query: () => "/cart/get-cart-items",
      providesTags: ["Cart"],
    }),

    //--------------------------Clear Cart ------------------------
    ClearCart: builder.query({
      query: () => "/cart/clear-cart",
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveItemFromCartMutation,
  useGetCartDetailsQuery,
  useLazyClearCartQuery
} = cartApiSlice;
