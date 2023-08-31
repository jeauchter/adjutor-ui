import { GridColDef, GridRenderEditCellParams } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import { AdjutorTable } from "../../../components/AdjutorTable";
import { DateTime } from "../../../components/Date";
import StyleActions from "./StyleActions";
import { useGetStylesQuery } from "./styleSlice";
import { useGetAudiencesQuery } from "../audiences/audienceSlice";
import { AudienceAutocomplete } from "../../../components/autocomplete/Audience";
import { Autocomplete, TextField } from "@mui/material";
import { Audience } from "../../../models/audience.model";

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
  const [rowId, setRowId] = useState(null);

  const audienceOptions: Option[] = audienceData.map((c) => {
    return { value: c.id, label: c.name };
  });

  audienceOptions.unshift({ value: 0, label: "" })

  const hiddenColumns: HiddenColumns = {
    id: false,
  };
  const columns: GridColDef[] = useMemo(
    () => [
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
        field: "departmentName",
        headerName: "Department Name",
        flex: 1,
        minWidth: 100,
        editable: true,
        valueGetter: (params) => params.row.Department.name,
      },
      {
        field: "audienceName",
        headerName: "Audience Name",
        flex: 1,
        minWidth: 100,
        editable: true,
        type: "singleSelect",
        valueOptions: () => audienceOptions,
        valueGetter: (params) => audienceOptions.find((opt) => opt.value === params.row.Audience.id)?.label,
          
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
    ],
    [rowId]
  );

  return (
    <AdjutorTable
      tableName={props.tableName}
      rows={Array.from(styleResults).reverse() as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      onCellEdit={setRowId}
      loading={isLoading || isFetching}
    />
  );
}
