import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import { DepartmentDataTable } from "./DepartmentList";
import { useAddDepartmentMutation } from "./departementSlice";
import { AddDepartment } from "./AddDepartment";

export default function Departments(props: any) {
  
    const [addDepartment, error] = useAddDepartmentMutation()
    return (
      <Grid container spacing={3}>
        {/* <Title>Manage Departments</Title> */}
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <AddDepartment
              onSubmit={({ name }) => {
                addDepartment({ name: name });
              }}
            />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <DepartmentDataTable tableName="Departments" />
          </Paper>
        </Grid>
      </Grid>
    );
}



