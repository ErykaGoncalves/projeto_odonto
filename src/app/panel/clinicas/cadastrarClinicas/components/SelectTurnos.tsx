import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useContext, useEffect, useState } from 'react';
import turnosData from '@/services/cadastroClinica/turnosData';
import { CadastroClinicaContext } from '@/context/cadastroClinica/CadastroClinicaContext';
import { AUTHENTICATED } from '@/utils/constants';
import { Skeleton } from '@mui/material';

interface TurnoSelectProps {
  contextCallback?: (payload: string) => void
  session: any
  turno: string | undefined
  setError: React.Dispatch<React.SetStateAction<string | null>>
}

const SelectTurno = ({ session }: TurnoSelectProps) => {
  const context = useContext(CadastroClinicaContext)
  const [turnos, setTurnos] = useState<string[]>([]);
  const [selectedTurnos, setSelectedTurnos] = React.useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === 'authenticated') {
          const result = await turnosData({ jwt: session.data?.jwt ?? '', turno: selectedTurnos });
          const resultsObject: Record<string, string> = result.results;
          const extractedTurnos = Object.values(resultsObject);
          setTurnos(extractedTurnos);
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchData();
  }, [session, selectedTurnos]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedTurnos(event.target.value)
    context?.salvarPeriodo(event.target.value)
    context?.salvarTurno(event.target.value);
  };
  if (session.status === AUTHENTICATED) {
    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Turnos</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTurnos}
              label="Horário"
              onChange={handleChange}
            >
              {turnos.map((turno) => (
                <MenuItem key={turno} value={turno}>
                  {turno}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </>
    )
  }

  return (
    <Skeleton
      variant="rounded"
      width="100%"
      sx={{ maxWidth: '400px' }}
      height={48}
    />
  );
}

export default SelectTurno;
