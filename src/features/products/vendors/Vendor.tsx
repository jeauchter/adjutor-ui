import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import { VendorDataTable } from "./VendorList";
import { useAddVendorMutation } from "./vendorSlice";
import { AddVendor } from "./AddVendor";

export default function Vendors(props: any) {
  
    const [addVendor, error] = useAddVendorMutation()
    return (
      <Grid container spacing={3}>
        {/* <Title>Manage Vendors</Title> */}
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <AddVendor
              onSubmit={({ name }) => {
                addVendor({ name: name });
              }}
            />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <VendorDataTable tableName="Vendors" />
          </Paper>
        </Grid>
      </Grid>
    );
}
