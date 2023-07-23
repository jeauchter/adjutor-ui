import { apiSlice } from "../../../app/apiSlice";

export interface Department {
  id: number;
  name: string;
  createdAt: string;
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => "departments",
      providesTags: (result) =>
        result
          ? [
              { type: "Department", id: "LIST" },
              ...result.map(({ id }) => ({ type: "Department" as const, id })),
            ]
          : [{ type: "Department", id: "LIST" }],
    }),
    getDepartment: builder.query<Department, number>({
      query: (id) => `departments/${id}`,
      providesTags: (result, error, id) => [{ type: "Department", id }],
    }),
    addDepartment: builder.mutation<Department, Partial<Department>>({
      query(body) {
        return {
          url: "departments",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Department", id: "LIST" }],
    }),
    updateDepartment: builder.mutation<Department, Partial<Department>>({
      query(data) {
        const { id, ...put } = data;
        return {
          url: `departments/${id}`,
          method: "PUT",
          body: put,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Department", id: arg.id },
      ],
    }),
    deleteDepartment: builder.mutation<{ success: boolean; id: number },number>({
      query(id) {
        return {
          url: `departments/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Department", id }],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetDepartmentQuery,
  useDeleteDepartmentMutation,
} = extendedApiSlice;
