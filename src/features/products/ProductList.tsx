import { CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { FC, useMemo, useState } from "react";
import { AdjutorTable } from "../../components/AdjutorTable";
import { DateTime } from "../../components/Date";
import { useGetProductsQuery } from "./productSlice";
import { Product } from "../../models/products.model";
import ProductActions from "./ProductListActions";

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
      field: "vendorName",
      headerName: "Vendor Name",
      flex: 1,
      minWidth: 100,
      editable: true,
      valueGetter: (params) => params.row.Vendor.name,
    },
    {
      field: "className",
      headerName: "Class",
      flex: 1,
      minWidth: 100,
      editable: true,
      valueGetter: (params) => params.row.Class.name,
    },
    {
      field: "styleName",
      headerName: "Style",
      flex: 1,
      minWidth: 100,
      editable: true,
      valueGetter: (params) => params.row.Style.name,
    },
    {
      field: "productTypeName",
      headerName: "Type",
      flex: 1,
      minWidth: 100,
      editable: true,
      valueGetter: (params) => params.row.ProductType.name,
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
      field: "actions",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => (
        <ProductActions {...{ params, rowId, setRowId }} />
      ),
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
