import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/Title';
import { useGetClassesQuery } from './ProductSlice';



function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}


export default function Orders() {
    const { data, error, isLoading } = useGetClassesQuery()
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (data) {
        return (
            <React.Fragment>
                <Title>Recent Classes</Title>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Department ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.DepartmentID}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                    See more orders
                </Link>
            </React.Fragment>
        );
    }

    return null
}
