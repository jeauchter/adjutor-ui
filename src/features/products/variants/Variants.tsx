import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import { VariantDataTable } from "./VariantList";
import { useAddVariantMutation } from "./variantSlice";
import { AddVariant } from "./AddVariant";

export default function Variants(props: any) {
  
    const [addVariant, error] = useAddVariantMutation()
    return (
      <Grid container spacing={3}>
        {/* <Title>Manage Variants</Title> */}
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <AddVariant
              onSubmit={({ name }) => {
                addVariant({ name: name });
              }}
            />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <VariantDataTable tableName="Variants" />
          </Paper>
        </Grid>
      </Grid>
    );
}
