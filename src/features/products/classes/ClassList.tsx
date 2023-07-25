import { CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { FC } from "react";
import { AdjutorTable } from "../../../components/AdjutorTable";
import { DateTime } from "../../../components/Date";
import { useGetClassesQuery } from "./classSlice";

interface ClassListProps {
  tableName?: string;
}

type HiddenColumns = {
  [key: string]: boolean;
};

export const ClassList: FC<ClassListProps> = ({ tableName }) => {
  const { data: classes, isLoading, isSuccess } = useGetClassesQuery();
  // const { data: departments, error, isLoading:departmentLoading, isFetching, isSuccess } = useGetDepartmentsQuery();
  const hiddenColumns: HiddenColumns = {};
  console.log(classes);
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      editable: true,
    },
    {
      field: "departmentName",
      headerName: "Department Name",
      flex: 1,
      minWidth: 100,
      editable: true,
      valueGetter: (params) => params.row.Department.name,
    },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      minWidth: 100,
      editable: false,
      renderCell: (params) => <DateTime passedDate={params.value} />,
    },
  ];
  let content;
  {
    isSuccess &&
      (content = (
        <AdjutorTable
          tableName={tableName}
          rows={Array.from(classes).reverse() as []}
          columns={columns}
          hiddenColumns={hiddenColumns}
          loading={isLoading}
        />
      ));
  }
  return <div>{content}</div>;
};
