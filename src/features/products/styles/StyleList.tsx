import { GridColDef, GridRenderCellParams, GridRenderEditCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import { AdjutorEditTable } from "../../../components/AdjutorEditTable";
import { DateTime } from "../../../components/Date";
import StyleActions from "./StyleActions";
import { useGetStylesQuery } from "./styleSlice";
import { useGetAudiencesQuery } from "../audiences/audienceSlice";
import { AudienceAutocomplete } from "../../../components/autocomplete/Audience";
import { Autocomplete, TextField } from "@mui/material";
import { Audience } from "../../../models/audience.model";
import { useGetDepartmentsQuery } from "../departments/departementSlice";

interface IStyleDataTableProps {
  tableName?: string;
}

type HiddenColumns = {
  [key: string]: boolean;
};

type Option = {
  value: number;
  label: string;
};



export function StyleDataTable(props: IStyleDataTableProps) {
  const {
    data: styleResults = [],
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetStylesQuery();
  const {
    data: audienceData = [],
    isLoading: areAudiencesLoading,
    isFetching: areAudiencesFetching,
  } = useGetAudiencesQuery();
  const {
    data: departmentData,
    isLoading: areDepartmentsLoading,
    isFetching: areDepartmentsFetching,
  } = useGetDepartmentsQuery();
  const [rowId, setRowId] = useState(null);

  const hiddenColumns: HiddenColumns = {
    id: false,
  };
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
        field: "departmentId",
        headerName: "Department Name",
        flex: 1,
        minWidth: 100,
        editable: true,
        type: "singleSelect",
        valueOptions: departmentData,
        getOptionLabel: (value:any) => value.name,
        getOptionValue: (value:any) => value.id,
      },
      {
        field: "audienceId",
        headerName: "Audience Name",
        flex: 1,
        minWidth: 100,
        editable: true,
        type: "singleSelect",
        valueOptions: audienceData,
        getOptionLabel: (value:any) => value.name,
        getOptionValue: (value:any) => value.id,
      },
      {
        field: "createdAt",
        headerName: "Created",
        flex: 1,
        minWidth: 100,
        editable: false,
        renderCell: (params) => <DateTime passedDate={params.value} />,
      },
      {
        field: "updatedAt",
        headerName: "Updated At",
        flex: 1,
        minWidth: 100,
        editable: false,
        renderCell: (params) => <DateTime passedDate={params.value} />,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <StyleActions {...{ params, rowId, setRowId }} />
        ),
      },
    ]
  

  return (
    <AdjutorEditTable
      tableName={props.tableName}
      rows={Array.from(styleResults).reverse() as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      onCellEdit={setRowId}
      loading={isLoading || isFetching || areAudiencesLoading || areAudiencesFetching || areDepartmentsLoading ||areDepartmentsFetching}
    />
  );
}
