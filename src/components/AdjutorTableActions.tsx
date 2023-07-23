import { Box, CircularProgress, Fab } from "@mui/material";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import { Check } from "@mui/icons-material";
import Save from "@mui/icons-material/Save";
import { green } from "@mui/material/colors";

interface AdjutorTableActionsProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: any;
  handleSubmit: any;
  isEditing: boolean;
  isUpdating: boolean;
}
const AdjutorTableActions: FC<AdjutorTableActionsProps> = ({
  params,
  rowId,
  isEditing,
  isUpdating,
  handleSubmit
}) => {


  return (
    <Box sx={{ m: 1, postion: "relative" }}>
      {
       (<Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || isEditing}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {isUpdating && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            postion: "absolute",
            top: -6,
            left:-6,
            zIndex:1
          }}
        />
      )}
    </Box>
  );
};

export default AdjutorTableActions;