import { CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { FC, useMemo, useState } from "react";
import { AdjutorEditTable } from "../../../components/AdjutorEditTable";
import { DateTime } from "../../../components/Date";
import { useGetClassesQuery } from "./classSlice";
import { Class } from "../../../models/class.model";
import ClassActions from "./ClassActions";
import { useGetDepartmentsQuery } from "../departments/departementSlice";

interface ClassListProps {
  tableName?: string;
  classes: Class[];
  isLoading: boolean
}

type HiddenColumns = {
  [key: string]: boolean;
};

export const ClassList: FC<ClassListProps> = ({ tableName, classes, isLoading }) => {
  const {
    data: departmentData,
    isLoading: areDepartmentsLoading,
    isFetching: areDepartmentsFetching,
  } = useGetDepartmentsQuery();
  const hiddenColumns: HiddenColumns = {};
  const [rowId, setRowId] = useState(null);
  const columns: GridColDef[] =  [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      editable: true,
    },
    {
      field: "DepartmentID",
      headerName: "Department Name",
      flex: 1,
      minWidth: 100,
      editable: true,
      type: "singleSelect",
      valueOptions: departmentData,
      getOptionLabel: (value:any) => value.name,
      getOptionValue: (value:any) => value.id,
    },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      minWidth: 100,
      editable: false,
      renderCell: (params) => <DateTime passedDate={params.value} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => (
        <ClassActions {...{ params, rowId, setRowId }} />
      ),
    },
  ]

  return (
    <AdjutorEditTable
      tableName={tableName}
      rows={Array.from(classes).reverse() as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      onCellEdit={setRowId}
      loading={isLoading || areDepartmentsLoading || areDepartmentsFetching}
    />
  );
};
