import { Grid, Paper } from "@mui/material";
import React from "react";
import Orders from "../dashboard/Orders";


export default function Products(props: any) {
    return (
        <Grid container spacing={3}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Orders />
            </Paper>
          </Grid>
        </Grid>
    );
}