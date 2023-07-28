import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import {
  useDeleteProductTypeMutation,
  useUpdateProductTypeMutation,
} from "./productTypeSlice";
import { enqueueSnackbar } from "notistack";

interface ProductTypeActionsProps {
  params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;
  rowId: any;
  setRowId: any;
}
const ProductTypeActions: FC<ProductTypeActionsProps> = ({
  params,
  rowId,
  setRowId,
}) => {
  const [updateProductType, { isLoading: isUpdating }] =
    useUpdateProductTypeMutation();

  const [updateLoading, setUpdateLoading] = useState(true)

  const [deleteProductType, { isLoading: isDeleting, error: deleteError }] =
    useDeleteProductTypeMutation();
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSubmit = async () => {
    await updateProductType(params.row);
    setIsEditing(false);
    setRowId(null);
  };

  const handleDeleteSubmit = () => {
    console.log(params.row.id);
    deleteProductType(params.row.id)
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

export default ProductTypeActions;
