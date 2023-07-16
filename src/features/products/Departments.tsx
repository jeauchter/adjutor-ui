import { Grid, Paper } from "@mui/material";
import React, { Component } from "react";
import { useGetDepartmentsQuery } from "./departementSlice";
import Title from "../../components/Title";
import {Department} from "../../models/departments.model"
import { useSelector } from "react-redux";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { AdjutorTable } from "../../components/AdjutorTable";

type Props = {};

type State = {};

class Departments extends Component<Props, State> {
  state = {};

  render() {
    return (
        <Grid container spacing={3}>
          <Title>Manage Departments</Title>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          {/* <AddClass
              onSubmit={({ name, departmentName }) => {
                console.log(name, departmentName);
                addClass({ name: name, departmentName: departmentName });
              }}
            /> */}
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <DepartmentDataTable tableName="Departments" />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

interface IDepartmentDataTableProps {
  tableName?: string;
}


const DepartmentDataTable: React.FC<IDepartmentDataTableProps> = (props) => {
  const { data: departments, error, isLoading, isFetching, isSuccess } = useGetDepartmentsQuery();
  const [gridRows, setRows] = React.useState(departments);
  let content
  
  const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        flex: 1,
        minWidth: 100,
        hideable: true,
        editable: true,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      minWidth: 100,
      editable: false,
    },
  ];
  {isLoading && (content = <Title>...Loading</Title>)}
  {isFetching && (content = <Title>...Fetching</Title>)}
  if(isSuccess && departments){
     content =  <AdjutorTable tableName={props.tableName} rows={gridRows as []} columns={columns}  />
  }
      

  return (
    <div>
        {content}
    </div>
  );
};

export default Departments;
