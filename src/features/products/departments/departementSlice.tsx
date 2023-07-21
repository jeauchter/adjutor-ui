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
  }),
});

export const { useGetDepartmentsQuery, useAddDepartmentMutation } =
  extendedApiSlice;
