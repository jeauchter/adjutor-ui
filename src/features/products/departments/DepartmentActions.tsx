import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { FC, useState } from "react";
import AdjutorTableActions from "../../../components/AdjutorTableActions";
import { useDeleteDepartmentMutation, useUpdateDepartmentMutation } from "./departementSlice";

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
    useUpdateDepartmentMutation()

  const [deleteDepartment, {isLoading: isDeleting, error:deleteError}] = useDeleteDepartmentMutation()
  const [isEditing, setIsEditing] = useState(false)


  
  const handleUpdateSubmit = async () => {
    await updateDepartment(params.row)
    setIsEditing(false)
    setRowId(null)
  }
  
  const handleDeleteSubmit = () => {
    console.log(params.row.id)
    deleteDepartment(params.row.id)
    setIsEditing(false)
    setRowId(null)
  }
  return (
    <AdjutorTableActions {...{params,
        rowId,
        isEditing,
        isUpdating,
        isDeleting,
        handleUpdateSubmit,
        handleDeleteSubmit
    }} />
  );
};

export default DepartmentActions;
