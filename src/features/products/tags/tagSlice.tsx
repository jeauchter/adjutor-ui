import { apiSlice } from "../../../app/apiSlice";

export interface Tag {
  id: number;
  name: string;
  createdAt: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], void>({
      query: () => "tags",
      providesTags: (result) =>
        result
          ? [
              { type: "Tag", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Tag" as const, id })),
            ]
          : [{ type: "Tag", id: "LIST" }],
    }),
    getTag: builder.query<Tag, number>({
      query: (id) => `tags/${id}`,
      providesTags: (result, error, id) => [{ type: "Tag", id }],
    }),
    addTag: builder.mutation<Tag, Partial<Tag>>({
      query(body) {
        return {
          url: "tags",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Tag", id: "LIST" }],
    }),
    updateTag: builder.mutation<Tag, Partial<Tag>>({
      query(data) {
        const { id, ...put } = data;
        return {
          url: `tags/${id}`,
          method: "PUT",
          body: put,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Tag", id: arg.id },
      ],
    }),
    deleteTag: builder.mutation<{ success: boolean; id: number },number>({
      query(id) {
        return {
          url: `tags/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Tag", id }],
    }),
  }),
});

export const {
  useGetTagsQuery,
  useAddTagMutation,
  useUpdateTagMutation,
  useGetTagQuery,
  useDeleteTagMutation,
} = extendedApiSlice;
