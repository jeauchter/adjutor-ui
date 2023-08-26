import { Box, Grid, Paper } from "@mui/material";
import React from "react";
import { ClassList } from "./classes/ClassList";
import AddProductStepper from "./AddProductStepper";
import { useGetClassesQuery } from "./classes/classSlice";
import { useGetProductsQuery } from "./productSlice";
import { ProductList } from "./ProductList";

export default function Products(props: any) {
  const { data: classes = [], isLoading: areClassesLoading, isSuccess } = useGetClassesQuery();
  const { data: products = [], isLoading: areProductsLoading } = useGetProductsQuery();
  return (
    <Grid container spacing={3}>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Box  justifyContent={"center"}>
          <AddProductStepper />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <ProductList products={products} isLoading={areProductsLoading}/>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <ClassList classes={classes} isLoading={areClassesLoading}/>
        </Paper>
      </Grid>
    </Grid>
  );
}
