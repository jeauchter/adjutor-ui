import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import {
  useDeleteTagMutation,
  useUpdateTagMutation,
} from "./tagSlice";
import { enqueueSnackbar } from "notistack";

interface TagActionsProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: any;
  setRowId: any;
}
const TagActions: FC<TagActionsProps> = ({
  params,
  rowId,
  setRowId,
}) => {
  const [updateTag, { isLoading: isUpdating }] =
    useUpdateTagMutation();

  const [updateLoading, setUpdateLoading] = useState(true)

  const [deleteTag, { isLoading: isDeleting, error: deleteError }] =
    useDeleteTagMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSubmit = async () => {
    await updateTag(params.row);
    setIsEditing(false);
    setRowId(null);
  };

  const handleDeleteSubmit = () => {
    console.log(params.row.id);
    deleteTag(params.row.id)
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

export default TagActions;
