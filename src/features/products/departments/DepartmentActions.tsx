import { Box, CircularProgress, Fab } from "@mui/material";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import { useUpdateDepartmentMutation } from "./departementSlice";
import { Check } from "@mui/icons-material";
import Save from "@mui/icons-material/Save";
import { green } from "@mui/material/colors";
import AdjutorTableActions from "../../../components/AdjutorTableActions";

interface DepartmentActionsProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: any;
  setRowId: any;
}
const DepartmentActions: FC<DepartmentActionsProps> = ({
  params,
  rowId,
  setRowId,
}) => {

  const [updateDepartment, { isLoading: isUpdating }] =
    useUpdateDepartmentMutation();
  const [isEditing, setIsEditing] = useState(false);
  const handleSubmit = async () => {
    await updateDepartment(params.row)
    setIsEditing(false)
    setRowId(null)
  }
  return (
    <AdjutorTableActions {...{params,
        rowId,
        isEditing,
        isUpdating,
        handleSubmit}} />
  );
};

export default DepartmentActions;
