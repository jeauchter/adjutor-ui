import { apiSlice } from "../../../app/apiSlice";

export interface Variant {
  id: number;
  name: string;
  createdAt: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVariants: builder.query<Variant[], void>({
      query: () => "variants",
      providesTags: (result) =>
        result
          ? [
              { type: "Variant", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Variant" as const, id })),
            ]
          : [{ type: "Variant", id: "LIST" }],
    }),
    getVariant: builder.query<Variant, number>({
      query: (id) => `variants/${id}`,
      providesTags: (result, error, id) => [{ type: "Variant", id }],
    }),
    addVariant: builder.mutation<Variant, Partial<Variant>>({
      query(body) {
        return {
          url: "variants",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Variant", id: "LIST" }],
    }),
    updateVariant: builder.mutation<Variant, Partial<Variant>>({
      query(data) {
        const { id, ...put } = data;
        return {
          url: `variants/${id}`,
          method: "PUT",
          body: put,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Variant", id: arg.id },
      ],
    }),
    deleteVariant: builder.mutation<{ success: boolean; id: number },number>({
      query(id) {
        return {
          url: `variants/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Variant", id }],
    }),
  }),
});

export const {
  useGetVariantsQuery,
  useAddVariantMutation,
  useUpdateVariantMutation,
  useGetVariantQuery,
  useDeleteVariantMutation,
} = extendedApiSlice;
