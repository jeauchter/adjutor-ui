import {
  GridRowsProp,
  GridColDef,
  DataGrid,
  gridClasses,
  GridActionsCellItem,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import React, { useState } from "react";
import Title from "./Title";
import { styled, alpha } from "@mui/material/styles";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { PanoramaSharp } from "@mui/icons-material";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

type HiddenColumns = {
  [key: string]: boolean;
};

type TableProps = {
  tableName?: string;
  numPerPage?: number;
  rows: [];
  columns: GridColDef[];
  hiddenColumns?: HiddenColumns | null;
  onCellEdit?: any
};

export const AdjutorTable: React.FC<TableProps> = ({
  tableName,
  rows = [],
  columns,
  numPerPage = 5,
  hiddenColumns = {},
  onCellEdit
}) => {
  const rowData: GridRowsProp = rows;

  return (
    <React.Fragment>
      <Title>{tableName}</Title>
      
      <StripedDataGrid
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
        onCellEditStop={params => onCellEdit(params.id)}
      />
    </React.Fragment>
  );
};
