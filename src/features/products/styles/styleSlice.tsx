import { apiSlice } from "../../../app/apiSlice";
import { Style } from "../../../models/styles.model";


export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStyles: builder.query<Style[], void>({
      query: () => "styles",
      providesTags: (result) =>
        result
          ? [
              { type: "Style", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Style" as const, id })),
            ]
          : [{ type: "Style", id: "LIST" }],
    }),
    getStyle: builder.query<Style, number>({
      query: (id) => `styles/${id}`,
      providesTags: (result, error, id) => [{ type: "Style", id }],
    }),
    addStyle: builder.mutation<Style, Partial<Style>>({
      query(body) {
        return {
          url: "styles",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Style", id: "LIST" }],
    }),
    updateStyle: builder.mutation<Style, Partial<Style>>({
      query(data) {
        const { id, ...put } = data;
        return {
          url: `styles/${id}`,
          method: "PUT",
          body: put,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Style", id: arg.id },
      ],
    }),
    deleteStyle: builder.mutation<{ success: boolean; id: number },number>({
      query(id) {
        return {
          url: `styles/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Style", id }],
    }),
  }),
});

export const {
  useGetStylesQuery,
  useAddStyleMutation,
  useUpdateStyleMutation,
  useGetStyleQuery,
  useDeleteStyleMutation,
} = extendedApiSlice;
