import { apiSlice } from "../../../app/apiSlice";

export interface ProductType {
  id: number;
  name: string;
  createdAt: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductTypes: builder.query<ProductType[], void>({
      query: () => "product-types",
      providesTags: (result) =>
        result
          ? [
              { type: "ProductType", id: "LIST" },
              ...result.map(({ id }) => ({ type: "ProductType" as const, id })),
            ]
          : [{ type: "ProductType", id: "LIST" }],
    }),
    getProductType: builder.query<ProductType, number>({
      query: (id) => `product-types/${id}`,
      providesTags: (result, error, id) => [{ type: "ProductType", id }],
    }),
    addProductType: builder.mutation<ProductType, Partial<ProductType>>({
      query(body) {
        return {
          url: "product-types",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "ProductType", id: "LIST" }],
    }),
    updateProductType: builder.mutation<ProductType, Partial<ProductType>>({
      query(data) {
        const { id, ...put } = data;
        return {
          url: `product-types/${id}`,
          method: "PUT",
          body: put,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "ProductType", id: arg.id },
      ],
    }),
    deleteProductType: builder.mutation<{ success: boolean; id: number },number>({
      query(id) {
        return {
          url: `product-types/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "ProductType", id }],
    }),
  }),
});

export const {
  useGetProductTypesQuery,
  useAddProductTypeMutation,
  useUpdateProductTypeMutation,
  useGetProductTypeQuery,
  useDeleteProductTypeMutation,
} = extendedApiSlice;
