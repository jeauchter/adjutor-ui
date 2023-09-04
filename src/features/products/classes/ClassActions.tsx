import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import {
  useDeleteClassMutation,
  useUpdateClassMutation,
} from "./classSlice";
import { enqueueSnackbar } from "notistack";

interface ClassActionsProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: any;
  setRowId: any;
}
const ClassActions: FC<ClassActionsProps> = ({
  params,
  rowId,
  setRowId,
}) => {
  const [updateClass, { isLoading: isUpdating }] =
    useUpdateClassMutation();

  const [updateLoading, setUpdateLoading] = useState(true)

  const [deleteClass, { isLoading: isDeleting, error: deleteError }] =
    useDeleteClassMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSubmit = async () => {
    await updateClass(params.row);
    setIsEditing(false);
    setRowId(null);
  };

  const handleDeleteSubmit = () => {
    console.log(params.row.id);
    deleteClass(params.row.id)
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

export default ClassActions;
