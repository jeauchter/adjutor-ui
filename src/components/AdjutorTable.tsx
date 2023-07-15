import {
  GridRowsProp,
  GridColDef,
  DataGrid,
  gridClasses,
} from "@mui/x-data-grid";
import React from "react";
import Title from "./Title";
import { styled, alpha } from "@mui/material/styles";
import theme from "../theme";

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

type TableProps = {
  tableName: string;
  numPerPage?: number;
  rows: GridRowsProp;
  columns: GridColDef[];
};

export const AdjutorTable: React.FC<TableProps> = ({
  tableName,
  rows,
  columns,
  numPerPage = 5
}) => {
  return (
    <React.Fragment>
      <Title>{tableName}</Title>
      <StripedDataGrid
        sx={{
          "&  .MuiDataGrid-columnHeaders": {
            bgcolor: "primary.main",
            color: "primary.contrastText",
          },
          "& .MuiDataGrid-columnHeaderTitleContainerContent > .MuiDataGrid-checkboxInput, .MuiDataGrid-menuIcon ":
            {
              color: "primary.contrastText",
            },
        }}
        rows={rows}
        columns={columns}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        checkboxSelection
        initialState={{ pagination: { paginationModel: { pageSize: numPerPage } } }}
      />
    </React.Fragment>
  );
};
