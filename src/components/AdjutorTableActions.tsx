import { Box, CircularProgress, Fab, Grid } from "@mui/material";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import { Check, Delete } from "@mui/icons-material";
import Save from "@mui/icons-material/Save";
import { green } from "@mui/material/colors";

interface AdjutorTableActionsProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: any;
  isEditing: boolean;
  updateLoading: boolean;
  handleUpdateSubmit?: any;
  handleDeleteSubmit?: any;
}

function saveButton(
  params: any,
  rowId: number,
  isEditing: boolean,
  updateLoading: boolean,
  handleUpdateSubmit: any
) {
  return (
    <React.Fragment>
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            m: 1,
          }}
          disabled={params.id !== rowId || isEditing}
          onClick={handleUpdateSubmit}
        >
          <Save />
     
        </Fab>
    </React.Fragment>
  );
}

function deleteButton(handleDeleteSubmit: any) {
  return (
    <React.Fragment>
      <Fab
        color="primary"
        sx={{
          width: 40,
          height: 40,
          m: 1,
        }}
        onClick={handleDeleteSubmit}
      >
        <Delete />
      </Fab>
    </React.Fragment>
  );
}

const AdjutorTableActions: FC<AdjutorTableActionsProps> = ({
  params,
  rowId,
  isEditing,
  updateLoading,
  handleUpdateSubmit,
  handleDeleteSubmit,
}) => {
  let button;
  let deleteButtonFrag;
  {
    handleUpdateSubmit &&
      (button = saveButton(
        params,
        rowId,
        isEditing,
        updateLoading,
        handleUpdateSubmit
      ));
  }
  {
    handleDeleteSubmit && (deleteButtonFrag = deleteButton(handleDeleteSubmit));
  }

  return (
    <Box sx={{ m: 1, display: "flex", postion: "relative" }}>
      {button}
      {deleteButtonFrag}
    </Box>
  );
};

export default AdjutorTableActions;
