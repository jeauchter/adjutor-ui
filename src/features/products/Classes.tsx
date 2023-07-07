import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow, { TableRowTypeMap } from '@mui/material/TableRow';
import Title from '../../components/Title';
import { useGetClassesQuery } from './classSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { DateTime } from '../../components/Date';
import { styled } from '@mui/material/styles';
import { Box, Card, FormControl, Grid, Icon, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import {DepartmentAutocomplete} from '../../components/autocomplete/Department';



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

export const ClassList: React.FunctionComponent<ClassList> = ({ tableName = "Recently Added Classes" }) => {
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

export const AddClass: React.FunctionComponent = () => {
    return (

        <Card
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
            }}
        >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Name</InputLabel>
                        <OutlinedInput
                        id="component-outlined"
                        label="Name"
                        />
                
                </FormControl>
                <FormControl>
                    <DepartmentAutocomplete />
                </FormControl>
            </Box>

        </Card>
    )
}


export default function Classes(props: any) {
    return (
        <Grid container spacing={3}>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>

                <AddClass />

            </Grid>
            {/* Recent Classes */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <ClassList tableName='Class List' />
                </Paper>
            </Grid>
        </Grid>
    );
}