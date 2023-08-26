import { apiSlice } from "../../app/apiSlice";
import { Product } from "../../models/products.model";


export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      providesTags: (result) =>
        result
          ? [
              { type: "Product", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Product" as const, id })),
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query(body) {
        return {
          url: "products",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query(data) {
        const { id, ...put } = data;
        return {
          url: `products/${id}`,
          method: "PUT",
          body: put,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Product", id: arg.id },
      ],
    }),
    deleteProduct: builder.mutation<{ success: boolean; id: number },number>({
      query(id) {
        return {
          url: `products/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductQuery,
  useDeleteProductMutation,
} = extendedApiSlice;
