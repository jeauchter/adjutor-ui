import { GridColDef } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import { AdjutorTable } from "../../../components/AdjutorTable";
import { DateTime } from "../../../components/Date";
import StyleActions from "./StyleActions";
import { useGetStylesQuery } from "./styleSlice";

interface IStyleDataTableProps {
  tableName?: string;
}

type HiddenColumns = {
  [key: string]: boolean;
};

export function StyleDataTable(props: IStyleDataTableProps) {
  const {
    data: styleResults = [],
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetStylesQuery();
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
        field: "departmentName",
        headerName: "Department Name",
        flex: 1,
        minWidth: 100,
        editable: true,
        valueGetter: (params) => params.row.Department.name,
      },
      {
        field: "audienceName",
        headerName: "Audience Name",
        flex: 1,
        minWidth: 100,
        editable: true,
        valueGetter: (params) => params.row.Audience.name,
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
          <StyleActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <AdjutorTable
      tableName={props.tableName}
      rows={Array.from(styleResults).reverse() as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      onCellEdit={setRowId}
      loading={isLoading || isFetching}
    />
  );
}
