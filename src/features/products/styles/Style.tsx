import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import { StyleDataTable } from "./StyleList";
import { useAddStyleMutation } from "./styleSlice";
import { AddStyle } from "./AddStyle";

export default function Styles(props: any) {
  
    const [addStyle, error] = useAddStyleMutation()
    return (
      <Grid container spacing={3}>
        {/* <Title>Manage Styles</Title> */}
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <AddStyle
              onSubmit={(values) => {
                addStyle(values);
              }}
            />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <StyleDataTable tableName="Styles" />
          </Paper>
        </Grid>
      </Grid>
    );
}
