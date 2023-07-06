// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Classes {
  id: number,
  name: string,
  DepartmentID: number,
  Department: Department,
  createdAt: string
}

interface Department {
  id: number,
  name: string
}

type ClassesReponse = Classes[]

// Define a service using a base URL and expected endpoints
export const classesAPI = createApi({
  reducerPath: 'classesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['classes'],
  endpoints: (build) => ({
    getClasses: build.query<ClassesReponse, void>({
      query: () => 'classes',
      providesTags: ['classes']
    })  
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetClassesQuery } = classesAPI