import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import { ProductTypeDataTable } from "./ProductTypeList";
import { useAddProductTypeMutation } from "./productTypeSlice";
import { AddProductType } from "./AddProductType";

export default function ProductTypes(props: any) {
  
    const [addProductType, error] = useAddProductTypeMutation()
    return (
      <Grid container spacing={3}>
        {/* <Title>Manage ProductTypes</Title> */}
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <AddProductType
              onSubmit={({ name }) => {
                addProductType({ name: name });
              }}
            />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <ProductTypeDataTable tableName="Product Types" />
          </Paper>
        </Grid>
      </Grid>
    );
}
