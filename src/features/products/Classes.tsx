import { Autocomplete, Button, Card, CardActions, CardContent, Grid, Paper, TextField, createFilterOptions } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled, alpha } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRowsProp, gridClasses } from '@mui/x-data-grid';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { DateTime } from '../../components/Date';
import Title from '../../components/Title';
import { useAddClassMutation, useGetClassesQuery } from './classSlice';
import { useGetDepartmentsQuery } from './departementSlice';


const ODD_OPACITY = 0.2;

function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
})) as typeof TableRow;

type ClassList = {
    tableName?: string
}



export const ClassList: React.FC<ClassList> = ({ tableName = "Recently Added Classes" }) => {
    const { data, isLoading } = useGetClassesQuery()

    if (isLoading) {
        return <CircularProgress color="secondary" />
    }
    if (data) {
        const dataReverse = Array.from(data).reverse()
        return (
            <React.Fragment>
                <Title>{tableName}</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataReverse.map((row) => (
                            <StyledTableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.Department.name}</TableCell>
                                <TableCell><DateTime passedDate={row.createdAt} /></TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                    See more classes
                </Link>
            </React.Fragment>
        );
    }

    return null
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&.Mui-selected': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY + theme.palette.action.selectedOpacity,
        ),
        '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY +
              theme.palette.action.selectedOpacity +
              theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              ODD_OPACITY + theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    },
  }));


type DataTableRow = {
    id: number,
    className: string,
    departmentName: string,
    createdAt: string
}
type DataTableRows = DataTableRow[]
export const ClassListDataTable: React.FC<ClassList> = ({ tableName = "Recently Added Classes" }) => {
    const { data, isLoading } = useGetClassesQuery()
    if (isLoading) {
        return <CircularProgress color="secondary" />
    }
    if (data) {
        const rowData: DataTableRows = []
        Array.from(data).reverse().forEach((row) => {
            let dateCreated = new Date(row.createdAt).toLocaleString()
            let newRow:DataTableRow = {
                id: row.id,
                className: row.name,
                departmentName: row.Department.name,
                createdAt: dateCreated
            }
            rowData.push(newRow)
        })
        
        const rows: GridRowsProp = rowData
        const columns: GridColDef[] = [
            { field: "className", headerName: "Name", flex: 1, minWidth: 100, editable:false },
            { field: "departmentName", headerName: "Department Name", flex: 1, minWidth: 100, editable:false },
            { field: "createdAt", headerName: "Created", flex: 1, minWidth: 100, editable:false },
        ]
        return (
            <React.Fragment>
                <Title>{tableName}</Title>
                <DataGrid rows={rows} columns={columns}
                 getRowClassName={(params) =>
                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                  }
                 initialState={{ pagination: { paginationModel: { pageSize: 5 } } }} />

            </React.Fragment>
        );
    }
    return null
}

interface Values {
    name: string,
    departmentName: string
}

interface Props {
    onSubmit: (values: Values) => void;
}

interface DepartmentOptionType {
    inputValue?: string;
    name: string;
    id?: number;
}
const filter = createFilterOptions<DepartmentOptionType>();

export const AddClass: React.FC<Props> = ({ onSubmit }) => {
    const [value, setValue] = React.useState<DepartmentOptionType | null>(null)
    const { data, isLoading } = useGetDepartmentsQuery()
    if (isLoading) {
    }
    if (data) {
        const departmentOptions: DepartmentOptionType[] = []
        const departments = Array.from(data)
        departments.map(department => {

            departmentOptions.push({
                name: department.name,
                id: department.id
            })
        })
        return (
            <Formik initialValues={{ name: '', departmentName: '' }} onSubmit={(values, { resetForm }) => {
                onSubmit(values)
                resetForm()
            }}>
                {({ values, handleChange, setFieldValue }) => (
                    <Form>
                        <Card
                            sx={{
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
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
                                        if (typeof newValue === 'string') {
                                            setValue({
                                                name: newValue,
                                            });
                                        } else if (newValue && newValue.inputValue) {
                                            // Create a new value from the user input
                                            setFieldValue("departmentName", newValue.inputValue ? newValue.inputValue : newValue.name);
                                        } else {
                                            setFieldValue("departmentName", newValue?.inputValue ? newValue?.inputValue : newValue?.name);
                                        }
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);

                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === option.name);
                                        if (inputValue !== '' && !isExisting) {
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
                                        if (typeof option === 'string') {
                                            return option;
                                        }
                                        // Add "xxx" option created dynamically
                                        if (option.inputValue) {
                                            return option.inputValue;
                                        }
                                        // Regular option
                                        return option.name;
                                    }}
                                    renderOption={(props, option) => <li {...props}>{option.name}</li>}
                                    freeSolo
                                    sx={{ mt: 1, mb: 1 }}

                                    renderInput={(params) => (
                                        <TextField {...params} value={values.departmentName} label="Department Name" />
                                    )}
                                />


                            </CardContent>
                            <CardActions>
                                <Button type="submit" variant="outlined">Add</Button>
                                <Button type="reset" variant="outlined" color='error'>Reset</Button>
                            </CardActions>
                        </Card>
                    </Form>
                )}
            </Formik>


        )
    }
    return null
}

export default function Classes(props: any) {
    const [addClass, error] = useAddClassMutation()
    return (
        <Grid container spacing={3}>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>

                <AddClass onSubmit={({ name, departmentName }) => {
                    console.log(name, departmentName)
                    addClass({ name: name, departmentName: departmentName })
                }} />

            </Grid>
            {/* Recent Classes */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    {/* <ClassList tableName='Class List' /> */}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <ClassListDataTable tableName='Class List' />
                </Paper>
            </Grid>


        </Grid>
    );
}

