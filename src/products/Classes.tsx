import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { useGetClassesQuery } from '../app/apiSlice';
import CircularProgress from '@mui/material/CircularProgress';
import {DateTime} from '../components/Date';



function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}


export default function Orders() {
    const { data, error, isLoading } = useGetClassesQuery()
    
    if (isLoading) {
        return <CircularProgress color="secondary" />
    }
    if (data) {
        console.log(data)
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
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.Department.name}</TableCell>
                                <TableCell><DateTime passedDate={row.createdAt} /></TableCell>
                            </TableRow>
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
