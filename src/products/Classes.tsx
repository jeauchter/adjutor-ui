import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow, { TableRowTypeMap } from '@mui/material/TableRow';
import Title from '../components/Title';
import { useGetClassesQuery } from '../app/apiSlice';
import CircularProgress from '@mui/material/CircularProgress';
import {DateTime} from '../components/Date';
import { styled } from '@mui/material/styles';



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
  })) as typeof TableRow ;

export const ClassList: React.FunctionComponent = () => {
    const { data, isLoading } = useGetClassesQuery()
    
    if (isLoading) {
        return <CircularProgress color="secondary" />
    }
    if (data) {
        return (
            <React.Fragment>
                <Title>Recently Added Classes</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
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

