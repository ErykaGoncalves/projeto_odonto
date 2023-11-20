'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import theme from '@/theme';
import homeData from '@/services/home/homeData';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface Column {
  id: 'dia' | 'nome';
  label: string;
  minWidth?: string;
  align?: 'right';
  format?: (value: number) => string;
}

interface Data {
  [key: string]: string | number;
}

const columns: Column[] = [
  { id: 'dia', label: 'Dia da semana', minWidth: '20vw' },
  { id: 'nome', label: 'Procedimentos', minWidth: '100' },
];

function createData(...values: (string | number)[]): Data {
  const data: Data = {};
  columns.forEach((column, index) => {
    data[column.id] = values[index];
  });
  return data;
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const session = useSession();
  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === 'authenticated') {
          const result = await homeData({ jwt: session.data?.jwt ?? '' });
          setRows(result.results.map((item: any, index: any) => createData(item.dia, item.nome, index)));
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };
  
    fetchData();
  }, [session]);

  return (
    <Paper sx={{ width: '900px', overflow: 'hidden' }}>
      <TableContainer sx={{ Height: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{ background: theme.palette.primary.main, color: '#fff', fontSize: '1.2rem', lineHeight: '2rem' }}
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
              .map((row, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
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
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
