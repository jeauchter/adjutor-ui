import { apiSlice } from "../../../app/apiSlice";

export interface Vendor {
  id: number;
  name: string;
  createdAt: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVendors: builder.query<Vendor[], void>({
      query: () => "vendors",
      providesTags: (result) =>
        result
          ? [
              { type: "Vendor", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Vendor" as const, id })),
            ]
          : [{ type: "Vendor", id: "LIST" }],
    }),
    getVendor: builder.query<Vendor, number>({
      query: (id) => `vendors/${id}`,
      providesTags: (result, error, id) => [{ type: "Vendor", id }],
    }),
    addVendor: builder.mutation<Vendor, Partial<Vendor>>({
      query(body) {
        return {
          url: "vendors",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Vendor", id: "LIST" }],
    }),
    updateVendor: builder.mutation<Vendor, Partial<Vendor>>({
      query(data) {
        const { id, ...put } = data;
        return {
          url: `vendors/${id}`,
          method: "PUT",
          body: put,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Vendor", id: arg.id },
      ],
    }),
    deleteVendor: builder.mutation<{ success: boolean; id: number },number>({
      query(id) {
        return {
          url: `vendors/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Vendor", id }],
    }),
  }),
});

export const {
  useGetVendorsQuery,
  useAddVendorMutation,
  useUpdateVendorMutation,
  useGetVendorQuery,
  useDeleteVendorMutation,
} = extendedApiSlice;
