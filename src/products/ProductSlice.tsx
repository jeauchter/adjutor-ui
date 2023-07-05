// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Classes {
    id: number,
    name: string,
    DepartmentID: number,
    department: Department
}

interface Department {
    id:number,
    name:string
}

type ClassesReponse = Classes[]

// Define a service using a base URL and expected endpoints
export const classesAPI = createApi({
  reducerPath: 'classesAPI',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/classes' }),
  tagTypes: ['Classes'],
  endpoints: (build) => ({
    getClasses: build.query<ClassesReponse, void>({
        query: () => ''
      })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetClassesQuery } = classesAPI