import {
  Autocomplete,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  TextField,
  createFilterOptions,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  GridColDef,
  GridRowsProp
} from "@mui/x-data-grid";
import { Form, Formik } from "formik";
import * as React from "react";
import { AdjutorTable } from "../../components/AdjutorTable";
import Title from "../../components/Title";
import { useAddClassMutation, useGetClassesQuery } from "./classSlice";
import { useGetDepartmentsQuery } from "./departementSlice";
import {  AddClassApi } from "../../models/classes.model"

type ClassList = {
  tableName?: string;
};

type DataTableRow = {
  id: number;
  className: string;
  departmentName: string;
  createdAt: string;
};
export const ClassListDataTable: React.FC<ClassList> = ({
  tableName = "Recently Added Classes",
}) => {
  const { data, isLoading } = useGetClassesQuery();
  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }
  if (data) {
    const rowData: DataTableRow[] = [];
    Array.from(data)
      .reverse()
      .map((row) => {
        let dateCreated = new Date(row.createdAt).toLocaleString();
        let newRow: DataTableRow = {
          id: row.id,
          className: row.name,
          departmentName: row.Department.name,
          createdAt: dateCreated,
        };
        rowData.push(newRow);
      });

    const rows: GridRowsProp = rowData;
    const columns: GridColDef[] = [
      {
        field: "className",
        headerName: "Name",
        flex: 1,
        minWidth: 100,
        editable: true,
      },
      {
        field: "departmentName",
        headerName: "Department Name",
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
    console.log(columns);
    return <AdjutorTable tableName={tableName} rows={rowData as []} columns={columns}  />
    
  }
  return null;
};



interface Props {
  onSubmit: (values: AddClassApi) => void;
}

interface DepartmentOptionType {
  inputValue?: string;
  name: string;
  id?: number;
}
const filter = createFilterOptions<DepartmentOptionType>();

export const AddClass: React.FC<Props> = ({ onSubmit }) => {
  const [value, setValue] = React.useState<DepartmentOptionType | null>(null);
  const { data, isLoading } = useGetDepartmentsQuery();

  if (isLoading) {
  }
  if (data) {
    const departmentOptions: DepartmentOptionType[] = [];
    const departments = Array.from(data);
    departments.map((department) => {
      departmentOptions.push({
        name: department.name,
        id: department.id,
      });
    });
    return (
      <Formik
        initialValues={{ name: "", departmentName: "" }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm();
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <Card
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent>
                <Title>Add Class</Title>
                <TextField
                  id="form-input-class-name"
                  label="Name"
                  variant="outlined"
                  sx={{ mt: 1, mb: 1 }}
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                />

                <Autocomplete
                  value={values.departmentName}
                  onChange={(event, newValue) => {
                    if (typeof newValue === "string") {
                      setValue({
                        name: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setFieldValue(
                        "departmentName",
                        newValue.inputValue
                          ? newValue.inputValue
                          : newValue.name
                      );
                    } else {
                      setFieldValue(
                        "departmentName",
                        newValue?.inputValue
                          ? newValue?.inputValue
                          : newValue?.name
                      );
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.name
                    );
                    if (inputValue !== "" && !isExisting) {
                      filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  handleHomeEndKeys
                  id="deparmtents-autocomplete-select"
                  options={departmentOptions}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  renderOption={(props, option) => (
                    <li {...props}>{option.name}</li>
                  )}
                  freeSolo
                  sx={{ mt: 1, mb: 1 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={values.departmentName}
                      label="Department Name"
                    />
                  )}
                />
              </CardContent>
              <CardActions>
                <Button type="submit" variant="outlined">
                  Add
                </Button>
                <Button type="reset" variant="outlined" color="error">
                  Reset
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    );
  }
  return null;
};

export default function Classes(props: any) {
  const [addClass, error] = useAddClassMutation();
  return (
    <Grid container spacing={3}>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <AddClass
          onSubmit={({ name, departmentName }) => {
            console.log(name, departmentName);
            addClass({ name: name, departmentName: departmentName });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <ClassListDataTable tableName="Class List" />
        </Paper>
      </Grid>
    </Grid>
  );
}
