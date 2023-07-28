import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import {
  useDeleteVendorMutation,
  useUpdateVendorMutation,
} from "./vendorSlice";
import { enqueueSnackbar } from "notistack";

interface VendorActionsProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: any;
  setRowId: any;
}
const VendorActions: FC<VendorActionsProps> = ({
  params,
  rowId,
  setRowId,
}) => {
  const [updateVendor, { isLoading: isUpdating }] =
    useUpdateVendorMutation();

  const [updateLoading, setUpdateLoading] = useState(true)

  const [deleteVendor, { isLoading: isDeleting, error: deleteError }] =
    useDeleteVendorMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSubmit = async () => {
    await updateVendor(params.row);
    setIsEditing(false);
    setRowId(null);
  };

  const handleDeleteSubmit = () => {
    console.log(params.row.id);
    deleteVendor(params.row.id)
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

export default VendorActions;
