import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import { TagDataTable } from "./TagList";
import { useAddTagMutation } from "./tagSlice";
import { AddTag } from "./AddTag";

export default function Tags(props: any) {
  
    const [addTag, error] = useAddTagMutation()
    return (
      <Grid container spacing={3}>
        {/* <Title>Manage Tags</Title> */}
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <AddTag
              onSubmit={({ name }) => {
                addTag({ name: name });
              }}
            />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <TagDataTable tableName="Tags" />
          </Paper>
        </Grid>
      </Grid>
    );
}
