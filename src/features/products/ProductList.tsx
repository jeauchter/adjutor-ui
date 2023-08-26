import { CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { FC, useMemo, useState } from "react";
import { AdjutorTable } from "../../components/AdjutorTable";
import { DateTime } from "../../components/Date";
import { useGetProductsQuery } from "./productSlice";
import { Product } from "../../models/products.model";

interface ProductListProps {
  tableName?: string;
  products: Product[];
  isLoading: boolean
}

type HiddenColumns = {
  [key: string]: boolean;
};

export const ProductList: FC<ProductListProps> = ({ tableName, products, isLoading }) => {
  
  // const { data: departments, error, isLoading:departmentLoading, isFetching, isSuccess } = useGetDepartmentsQuery();
  const hiddenColumns: HiddenColumns = {};
  const [rowId, setRowId] = useState(null);
  const columns: GridColDef[] =  useMemo(() => [
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
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      minWidth: 100,
      editable: false,
      renderCell: (params) => <DateTime passedDate={params.value} />,
    },
  ],
  [rowId]
  );

  return (
    <AdjutorTable
      tableName={tableName}
      rows={Array.from(products).reverse() as []}
      columns={columns}
      hiddenColumns={hiddenColumns}
      loading={isLoading}
    />
  );
};
