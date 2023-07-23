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
  isUpdating: boolean;
  isDeleting: boolean;
  handleUpdateSubmit?: any;
  handleDeleteSubmit?: any;
}
const AdjutorTableActions: FC<AdjutorTableActionsProps> = ({
  params,
  rowId,
  isEditing,
  isUpdating,
  isDeleting,
  handleUpdateSubmit,
  handleDeleteSubmit
}) => {


  return (
    <Box sx={{ m: 1, postion: "relative" }}>
      
      { handleUpdateSubmit && (<Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            m:1
          }}
          disabled={params.id !== rowId || isEditing}
          onClick={handleUpdateSubmit}
        >
          <Save />
        </Fab>
        )}
       { handleDeleteSubmit && (<Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            m:1
          }}
          onClick={handleDeleteSubmit}
        >
          <Delete />
        </Fab>)}
      {isUpdating || isDeleting && (
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