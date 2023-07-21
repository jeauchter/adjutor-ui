import { Title } from "@mui/icons-material";
import {
    GridColDef
} from "@mui/x-data-grid";
import React from "react";
import { AdjutorTable } from "../../../components/AdjutorTable";
import { DateTime } from "../../../components/Date";
import { useGetDepartmentsQuery } from "./departementSlice";

interface IDepartmentDataTableProps {
  tableName?: string;
}

type HiddenColumns = {
    [key:string]: boolean
}

export const DepartmentDataTable: React.FC<IDepartmentDataTableProps> = (
  props
) => {
  const {
    data: departments,
    error,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetDepartmentsQuery();
  let content;

  const hiddenColumns: HiddenColumns =
    {
      id: false
    }
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      minWidth: 100,
      hideable: true,
      editable: false,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      minWidth: 100,
      editable: false,
      renderCell: (params) => <DateTime passedDate={params.value} />,
    },
  ];
  {
    isLoading && (content = <Title>...Loading</Title>);
  }
  {
    isFetching && (content = <Title>...Fetching</Title>);
  }
  {
    isSuccess &&
      (content = (
        <AdjutorTable
          tableName={props.tableName}
          rows={Array.from(departments).reverse() as []}
          columns={columns}
          hiddenColumns={hiddenColumns}
        />
      ));
  }

  return <div>{content}</div>;
};
