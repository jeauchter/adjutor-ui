import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import { AudienceDataTable } from "./AudienceList";
import { useAddAudienceMutation } from "./audienceSlice";
import { AddAudience } from "./AddAudience";

export default function Audiences(props: any) {
  
    const [addAudience, error] = useAddAudienceMutation()
    return (
      <Grid container spacing={3}>
        {/* <Title>Manage Audiences</Title> */}
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <AddAudience
              onSubmit={({ name }) => {
                addAudience({ name: name });
              }}
            />
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <AudienceDataTable tableName="Audiences" />
          </Paper>
        </Grid>
      </Grid>
    );
}
