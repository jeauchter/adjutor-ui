import { CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { FC, useMemo, useState } from "react";
import { AdjutorTable } from "../../../components/AdjutorTable";
import { DateTime } from "../../../components/Date";
import { useGetClassesQuery } from "./classSlice";
import { Class } from "../../../models/class.model";

interface ClassListProps {
  tableName?: string;
  classes: Class[];
  isLoading: boolean
}

type HiddenColumns = {
  [key: string]: boolean;
};

export const ClassList: FC<ClassListProps> = ({ tableName, classes, isLoading }) => {
  
  // const { data: departments, error, isLoading:departmentLoading, isFetching, isSuccess } = useGetDepartmentsQuery();
  const hiddenColumns: HiddenColumns = {};
  const [rowId, setRowId] = useState(null);
  const columns: GridColDef[] =  useMemo(() => [
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
  ],
  [rowId]
  );

  return (
    <AdjutorTable
      tableName={tableName}
      rows={Array.from(classes).reverse() as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      loading={isLoading}
    />
  );
};
