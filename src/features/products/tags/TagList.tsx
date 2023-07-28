import { Title } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useState, useMemo, useEffect } from "react";
import { AdjutorTable } from "../../../components/AdjutorTable";
import { DateTime } from "../../../components/Date";
import { useGetTagsQuery, useUpdateTagMutation } from "./tagSlice";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import { enqueueSnackbar } from "notistack";
import TagActions from "./TagActions";

interface ITagDataTableProps {
  tableName?: string;
}

type HiddenColumns = {
  [key: string]: boolean;
};

export function TagDataTable(props:ITagDataTableProps)  {
  const {
    data: productTypeResults = [],
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError
  } = useGetTagsQuery();
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
            <TagActions
              {...{ params, rowId, setRowId }}
            />
          ),
        },
    ],
    [rowId]
  );

 
    return (<AdjutorTable
      tableName={props.tableName}
      rows={Array.from(productTypeResults).reverse() as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      onCellEdit={setRowId}
      loading={isLoading || isFetching}
    />)
  
};
