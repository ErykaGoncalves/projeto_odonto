import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import theme from '@/theme';

interface Column {
    id: 'consultas' | 'horario';
    label: string;
    minWidth?: string;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'consultas', label: 'Consultas Diárias', minWidth: '50vw' },
    { id: 'horario', label: 'Horário', minWidth: '100' },
];

interface Data {
    consultas: string;
    horario: string;
}

function createData(
    consultas: string,
    horario: string,
): Data {
    return { consultas, horario };
}

const rows = [
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
    createData('Paciente', '00:00'),
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '20px' }}>
            <TableContainer sx={{ Height: 600 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    sx={{background: theme.palette.primary.main, color: '#fff', fontSize: '1.2rem', lineHeight: '2rem'}}
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.consultas}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align} sx={{ fontSize: '1.2rem', lineHeight: '2rem' }}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}