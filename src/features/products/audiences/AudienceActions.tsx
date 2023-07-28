import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import {
  useDeleteAudienceMutation,
  useUpdateAudienceMutation,
} from "./audienceSlice";
import { enqueueSnackbar } from "notistack";

interface AudienceActionsProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: any;
  setRowId: any;
}
const AudienceActions: FC<AudienceActionsProps> = ({
  params,
  rowId,
  setRowId,
}) => {
  const [updateAudience, { isLoading: isUpdating }] =
    useUpdateAudienceMutation();

  const [updateLoading, setUpdateLoading] = useState(true)

  const [deleteAudience, { isLoading: isDeleting, error: deleteError }] =
    useDeleteAudienceMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSubmit = async () => {
    await updateAudience(params.row);
    setIsEditing(false);
    setRowId(null);
  };

  const handleDeleteSubmit = () => {
    console.log(params.row.id);
    deleteAudience(params.row.id)
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

export default AudienceActions;
