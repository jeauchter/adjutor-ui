import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import React, { useState, useMemo, useEffect } from "react";
import { AdjutorEditTable, CustomNoRowsOverlay, StripedDataGrid } from "../../components/AdjutorEditTable";
import { DateTime } from "../../components/Date";
import { useGetVariantsQuery } from "./variants/variantSlice"
import { Box, LinearProgress, TableProps, alpha, gridClasses, styled } from "@mui/material";
import Title  from "../../components/Title";

interface IVariantDataTableProps {
  tableName?: string;
  handleSelection?: any;
  
}

type HiddenColumns = {
  [key: string]: boolean;
};

export function VariantDataTableSelect(props:IVariantDataTableProps)  {
  const {
    data: variantResults = [],
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError
  } = useGetVariantsQuery();
  const [rowId, setRowId] = useState(null);

  const hiddenColumns: HiddenColumns = {
    id: false,
  };
  const columns: GridColDef[] = 
   [
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
        editable: false,
      }
    ]

 
    return (<VariantSelectionTable
      tableName={props.tableName}
      rows={Array.from(variantResults).reverse() as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      onCellEdit={setRowId}
      loading={isLoading || isFetching}
      handleSelection={props.handleSelection}
    />)
  
};

interface VariantTableProps extends TableProps {
    tableName?: string;
    numPerPage?: number;
    rows: [];
    columns: GridColDef[];
    hiddenColumns?: HiddenColumns | null;
    onCellEdit?: any;
    loading: boolean;
    handleSelection?: any
  };

const VariantSelectionTable: React.FunctionComponent<VariantTableProps> = ({
    tableName,
    rows = [],
    columns,
    numPerPage = 5,
    hiddenColumns = {},
    onCellEdit,
    loading,
    handleSelection
  }) => {
    const rowData: GridRowsProp = rows;
  
    return (
      <React.Fragment>
        <Title>{tableName}</Title>
        <div style={{ height: 400, width: '100%' }}>
        <StripedDataGrid
          loading={loading}
          slots={{
            loadingOverlay: LinearProgress,
            noRowsOverlay: CustomNoRowsOverlay,
          }}
          sx={{
            "&  .MuiDataGrid-columnHeaders": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
            },
            "& .MuiDataGrid-columnHeadersInner > .MuiDataGrid-checkboxInput, .MuiDataGrid-columnHeadersInner > .MuiDataGrid-menuIcon, .MuiDataGrid-columnHeadersInner >  .MuiDataGrid-menuIconButton":
              {
                color: "primary.contrastText",
              },
          }}
          rows={rowData}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          onRowSelectionModelChange={(ids) => handleSelection(ids)}
          checkboxSelection
          pageSizeOptions={[numPerPage]}
          initialState={{
            pagination: { paginationModel: { pageSize: numPerPage } },
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
                ...hiddenColumns,
              },
            },
          }}
          onCellEditStop={(params) => onCellEdit(params.id)}
        />
        </div>
      </React.Fragment>
    );
  };



