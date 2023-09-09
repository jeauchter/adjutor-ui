import { Title } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useState, useMemo, useEffect } from "react";
import { AdjutorEditTable } from "../../../components/AdjutorEditTable";
import { DateTime } from "../../../components/Date";
import { useGetProductTypesQuery, useUpdateProductTypeMutation } from "./productTypeSlice";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import { enqueueSnackbar } from "notistack";
import ProductTypeActions from "./ProductTypeActions";

interface IProductTypeDataTableProps {
  tableName?: string;
}

type HiddenColumns = {
  [key: string]: boolean;
};

export function ProductTypeDataTable(props:IProductTypeDataTableProps)  {
  const {
    data: productTypeResults = [],
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError
  } = useGetProductTypesQuery();
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
            <ProductTypeActions
              {...{ params, rowId, setRowId }}
            />
          ),
        },
    ],
    [rowId]
  );

 
    return (<AdjutorEditTable
      tableName={props.tableName}
      rows={Array.from(productTypeResults).reverse() as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      onCellEdit={setRowId}
      loading={isLoading || isFetching}
    />)
  
};
