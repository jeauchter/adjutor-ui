import { Title } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useState, useMemo } from "react";
import { AdjutorTable } from "../../../components/AdjutorTable";
import { DateTime } from "../../../components/Date";
import { useGetVariantsQuery, useUpdateVariantMutation } from "./variantSlice";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import { enqueueSnackbar } from "notistack";

interface IVariantDataTableProps {
  tableName?: string;
}

type HiddenColumns = {
  [key: string]: boolean;
};

export const VariantDataTable: React.FC<IVariantDataTableProps> = (props) => {
  const {
    data: variantResults,
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError
  } = useGetVariantsQuery();
  let content;
  const [rowId, setRowId] = useState(null);
  const [variants, setVariants] = useState(variantResults);

  {
    isSuccess && setVariants(Array.from(variantResults).reverse());
  }
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
      //   {
      //     field: "actions",
      //     headerName: "Actions",
      //     type: "actions",
      //     renderCell: (params) => (
      //       <VariantActions
      //         {...{ params, rowId, setRowId }}
      //       />
      //     ),
      //   },
    ],
    [rowId]
  );

  return (
    <AdjutorTable
      tableName={props.tableName}
      rows={variants as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      onCellEdit={setRowId}
      loading={isLoading || isFetching}
    />
  );
};
