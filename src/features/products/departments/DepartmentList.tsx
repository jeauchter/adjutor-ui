import { Title } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useState, useMemo } from "react";
import { AdjutorEditTable } from "../../../components/AdjutorEditTable";
import { DateTime } from "../../../components/Date";
import {
  useGetDepartmentsQuery,
  useUpdateDepartmentMutation,
} from "./departementSlice";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import DepartmentActions from "./DepartmentActions";

interface IDepartmentDataTableProps {
  tableName?: string;
}

type HiddenColumns = {
  [key: string]: boolean;
};

export const DepartmentDataTable: React.FC<IDepartmentDataTableProps> = (
  props
) => {
  const {
    data: departments = [],
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetDepartmentsQuery();
  const [rowId, setRowId] = useState(null);



  const hiddenColumns: HiddenColumns = {
    id: false,
  };
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        flex: 1,
        minWidth: 100,
        hideable: true,
        editable: false,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 100,
        editable: true,
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
        field: "updatedAt",
        headerName: "Updated At",
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
          <DepartmentActions
            {...{ params, rowId, setRowId }}
          />
        ),
      },
    ],
    [rowId]
  );
  

  return (
    <AdjutorEditTable
      tableName={props.tableName}
      rows={Array.from(departments).reverse() as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      onCellEdit={setRowId}
      loading={isLoading}
    />
  );
};
