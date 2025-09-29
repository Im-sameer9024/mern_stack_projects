import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApiSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["product"],

  endpoints: (builder) => ({
    //--------------------------Create Product---------------------------
    CreateProduct: builder.mutation({
      query: (data) => ({
        url: "/create-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    //--------------------------Get All Products---------------------------
    GetAllProducts: builder.query({
      query: () => "/all-products",
      providesTags: ["product"],
    }),

    //--------------------------Get Single Product---------------------------
    GetProduct: builder.query({
      query: (productId) => `/product/${productId}`,
      providesTags: ["product"],
    }),

    //-------------------------Get Product By Category---------------------------
    GetProductsByCategory: builder.query({
      query: (categoryId) => `/category-products/${categoryId}`,
      providesTags: ["product"],
    }),

    //--------------------------Get All BestSeller Products---------------------------
    GetAllBestSellerProducts: builder.query({
      query: () => "best-seller-products",
      providesTags: ["product"],
    }),

    //--------------------------Search Products---------------------------
    SearchProducts: builder.query({
      query: (params = {}) => {
        const { q, category } = params;

        const queryParams = new URLSearchParams();

        if (q) queryParams.append("q", q);
        if (category) queryParams.append("category", category);

        return `/search?${queryParams.toString()}`;
      },
      providesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useGetAllBestSellerProductsQuery,
  useSearchProductsQuery,
} = productApiSlice;
