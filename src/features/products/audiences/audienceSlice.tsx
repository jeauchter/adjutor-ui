import { apiSlice } from "../../../app/apiSlice";

export interface Audience {
  id: number;
  name: string;
  createdAt: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAudiences: builder.query<Audience[], void>({
      query: () => "audiences",
      providesTags: (result) =>
        result
          ? [
              { type: "Audience", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Audience" as const, id })),
            ]
          : [{ type: "Audience", id: "LIST" }],
    }),
    getAudience: builder.query<Audience, number>({
      query: (id) => `audiences/${id}`,
      providesTags: (result, error, id) => [{ type: "Audience", id }],
    }),
    addAudience: builder.mutation<Audience, Partial<Audience>>({
      query(body) {
        return {
          url: "audiences",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Audience", id: "LIST" }],
    }),
    updateAudience: builder.mutation<Audience, Partial<Audience>>({
      query(data) {
        const { id, ...put } = data;
        return {
          url: `audiences/${id}`,
          method: "PUT",
          body: put,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Audience", id: arg.id },
      ],
    }),
    deleteAudience: builder.mutation<{ success: boolean; id: number },number>({
      query(id) {
        return {
          url: `audiences/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Audience", id }],
    }),
  }),
});

export const {
  useGetAudiencesQuery,
  useAddAudienceMutation,
  useUpdateAudienceMutation,
  useGetAudienceQuery,
  useDeleteAudienceMutation,
} = extendedApiSlice;
