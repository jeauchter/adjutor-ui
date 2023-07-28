import {
  Grid,
  Paper
} from "@mui/material";
import React from "react";
import { AddClass } from "./AddClass";
import { ClassList } from "./ClassList";
import { useAddClassMutation } from "./classSlice";

export default function Classes(props: any) {
  const [addClass, {isError}] = useAddClassMutation()
  return (
    <Grid container spacing={3}>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <AddClass
          onSubmit={({ name, departmentName }) => {
            addClass({ name: name, departmentName: departmentName });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <ClassList tableName="Class List" />
        </Paper>
      </Grid>
    </Grid>
  );
}
