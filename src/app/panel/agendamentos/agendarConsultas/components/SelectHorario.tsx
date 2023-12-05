import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import selectHorarioData from '@/services/agendamentoPacientes/selectHorarioData';
import { useContext, useEffect, useState } from 'react';
import { AUTHENTICATED } from '@/utils/constants';
import { Skeleton } from '@mui/material';
import { AgendamentoPacienteContext } from '@/context/agendamentoPaciente/AgendamentoPacienteContext';

interface BasicSelectProps {
  contextCallback?: (payload: string) => void;
  session: any;
  horario: string | undefined;
  clinica: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectHorario({ session, clinica, setError, contextCallback }: BasicSelectProps): JSX.Element {
  const context = useContext(AgendamentoPacienteContext);
  const [agendaHorario, setAgendaHorario] = useState<string[]>([]);
  const [selectHorario, setSelectHorario] = useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    setSelectHorario(event.target.value);
    context?.salvarHorario(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === 'authenticated' && clinica !== undefined) {
          const response = await selectHorarioData({ jwt: session.data?.jwt ?? '', nome_clinica: clinica });
          console.log('HORARIOOOOO' + response)
          if (response.result) {
            let resultArray = [];

            if (Array.isArray(response.result)) {
              resultArray = response.result;
            } else {
              resultArray = Object.values(response.result);
            }

            setAgendaHorario(resultArray);
          } else {
            console.log('DEU ERROOOOO');
          }
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchData();
  }, [session, clinica, context]);

  if (session.status === AUTHENTICATED) {
    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Horario</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              value={selectHorario}
              label="Periodo"
            >
              {agendaHorario.map((horarios) => (
                <MenuItem key={horarios} value={horarios}>
                  {horarios}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </>
    );
  }

  return (
    <Skeleton
      variant="rounded"
      width="100%"
      sx={{ maxWidth: '400px' }}
      height={48}
    />
  );
};
