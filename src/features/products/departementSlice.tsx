import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice";
import { ResetTvOutlined } from "@mui/icons-material";


const departmentAdapter = createEntityAdapter()

const initialState = departmentAdapter.getInitialState()
export interface Department {
    id: number,
    name: string,
    createdAt: string
}

type DepartmentsReponse = Department[]

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDepartments: builder.query<DepartmentsReponse, void>({
            query: () => 'departments',
            providesTags: (result) => 
            result
            ?[
                {type: 'Department', id: "LIST"},
                ...result.map(({id}) => ({type: "Department" as const, id}))
            ]
            :[{type: 'Department', id: "LIST"}]
        })
    })
})

export const {useGetDepartmentsQuery} = extendedApiSlice