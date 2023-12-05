import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import selectClinicasData from '@/services/agendamentoPacientes/selectClinicasData';
import { useContext, useEffect, useState } from 'react';
import { AUTHENTICATED } from '@/utils/constants';
import { Skeleton } from '@mui/material';
import { AgendamentoPacienteContext } from '@/context/agendamentoPaciente/AgendamentoPacienteContext';

interface BasicSelectProps {
  contextCallback?: (payload: string) => void;
  session: any;
  clinica: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectClinica({ session }: BasicSelectProps): JSX.Element {
  const context = useContext(AgendamentoPacienteContext);
  const [agendaClinica, setAgendaClinica] = useState<string[]>([]);
  const [selectClin, setSelectClin] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectClin(event.target.value);
    context?.salvarClinica(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === 'authenticated') {
          const response = await selectClinicasData({ jwt: session.data?.jwt ?? '', nome_clinica: selectClin });
  
          if (response.result) {
            let resultArray = [];
  
            if (Array.isArray(response.result)) {
              resultArray = response.result;
            } else {
              resultArray = Object.values(response.result);
            }
  
            setAgendaClinica(resultArray);
          } else {
            console.log('DEU ERROOOOO');
          }
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };
  
    fetchData();
  }, [session, selectClin, context]);
  
  
  

  if (session.status === AUTHENTICATED) {
    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Clinicas</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              value={selectClin}
              label="Periodo"
            >
              {agendaClinica.map((clinica) => (
                <MenuItem key={clinica} value={clinica}>
                  {clinica}
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