// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Classes {
  id: number;
  name: string;
  DepartmentID: number;
  Department: Department;
  createdAt: string;
}

interface Department {
  id: number;
  name: string;
}

type ClassesReponse = Classes[];
type DepartmentResponse = Department[];

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [
    "Class",
    "Department",
    "Variant",
    "ProductType",
    "Tag",
    "Audience",
    "Vendor",
    "Style",
    "Product"
  ],
  endpoints: (builder) => ({}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
