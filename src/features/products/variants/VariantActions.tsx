import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import {
  useDeleteVariantMutation,
  useUpdateVariantMutation,
} from "./variantSlice";
import { enqueueSnackbar } from "notistack";

interface VariantActionsProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: any;
  setRowId: any;
}
const VariantActions: FC<VariantActionsProps> = ({
  params,
  rowId,
  setRowId,
}) => {
  const [updateVariant, { isLoading: isUpdating }] =
    useUpdateVariantMutation();

  const [updateLoading, setUpdateLoading] = useState(true)

  const [deleteVariant, { isLoading: isDeleting, error: deleteError }] =
    useDeleteVariantMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSubmit = async () => {
    await updateVariant(params.row);
    setIsEditing(false);
    setRowId(null);
  };

  const handleDeleteSubmit = () => {
    console.log(params.row.id);
    deleteVariant(params.row.id)
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

export default VariantActions;
