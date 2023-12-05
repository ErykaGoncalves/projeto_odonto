import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import selectDatasData from '@/services/agendamentoPacientes/selectDatasData';
import { useContext, useEffect, useState } from 'react';
import { AUTHENTICATED } from '@/utils/constants';
import { Skeleton } from '@mui/material';
import { useSession } from 'next-auth/react';
import { AgendamentoPacienteContext } from '@/context/agendamentoPaciente/AgendamentoPacienteContext';

interface BasicSelectProps {
  contextCallback?: (payload: string) => void;
  session: any;
  data: string | undefined;
  clinica: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SelectData({ session, clinica, setError, contextCallback }: BasicSelectProps): JSX.Element {
  const context = useContext(AgendamentoPacienteContext);
  const [agendaData, setAgendaData] = useState<string[]>([]);
  const [selectData, setSelectData] = useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    setSelectData(event.target.value);
    context?.salvarClinica(event.target.value);
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === 'authenticated' && clinica !== undefined) {
          const response = await selectDatasData({ jwt: session.data?.jwt ?? '', nome_clinica: clinica });
   
          if (response.result) {
            let resultArray = [];
    
            if (Array.isArray(response.result)) {
              resultArray = response.result;
            } else {
              resultArray = Object.values(response.result);
            }
    
            setAgendaData(resultArray);
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
            <InputLabel id="demo-simple-select-label">Data</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              value={selectData}
              label="Periodo"
            >
              {agendaData.map((datas) => (
                <MenuItem key={datas} value={datas}>
                  {datas}
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
