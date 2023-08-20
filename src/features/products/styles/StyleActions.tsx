import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import {
  useDeleteStyleMutation,
  useUpdateStyleMutation,
} from "./styleSlice";
import { enqueueSnackbar } from "notistack";

interface StyleActionsProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: any;
  setRowId: any;
}
const StyleActions: FC<StyleActionsProps> = ({
  params,
  rowId,
  setRowId,
}) => {
  const [updateStyle, { isLoading: isUpdating }] =
    useUpdateStyleMutation();

  const [updateLoading, setUpdateLoading] = useState(true)

  const [deleteStyle, { isLoading: isDeleting, error: deleteError }] =
    useDeleteStyleMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSubmit = async () => {
    await updateStyle(params.row);
    setIsEditing(false);
    setRowId(null);
  };

  const handleDeleteSubmit = () => {
    console.log(params.row.id);
    deleteStyle(params.row.id)
      .unwrap()
      .then()
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.data.error, { variant: "error" });
      });
    setIsEditing(false);
    setRowId(null);
  };
  return (
    <AdjutorTableActions
      {...{
        params,
        rowId,
        isEditing,
        updateLoading,
        isDeleting,
        handleUpdateSubmit,
        handleDeleteSubmit,
      }}
    />
  );
};

export default StyleActions;
