import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice";
import { ResetTvOutlined } from "@mui/icons-material";


const classAdapter = createEntityAdapter()

const initialState = classAdapter.getInitialState({
    name: "",
    departmentName: ""
})
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

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getClasses: builder.query<ClassesReponse, void>({
            query: () => 'classes',
            providesTags: (result) => 
            result
            ?[
                {type: 'Class', id: "LIST"},
                ...result.map(({id}) => ({type: "Class" as const, id}))
            ]
            :[{type: 'Class', id: "LIST"}]
        }),
        addClass: builder.mutation({
            query:initialState => ({
                url:"classes",
                method: 'POST',
                body: {
                    ...initialState
                }
            }),
            invalidatesTags: [
                {type: 'Class', id: "LIST"}
            ]
        })
    })
})

export const {useGetClassesQuery, useAddClassMutation} = extendedApiSlice