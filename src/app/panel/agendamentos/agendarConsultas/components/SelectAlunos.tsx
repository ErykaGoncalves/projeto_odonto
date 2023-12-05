import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import selectAlunPeriodoData from '@/services/agendamentoPacientes/selectAlunPeriodoData';
import { useContext, useEffect, useState } from 'react';
import { AUTHENTICATED } from '@/utils/constants';
import { Skeleton } from '@mui/material';
import { AgendamentoPacienteContext } from '@/context/agendamentoPaciente/AgendamentoPacienteContext';

interface BasicSelectProps {
  contextCallback?: (payload: string) => void;
  session: any;
  alunos: string | undefined;
  clinica: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}


const SelectAlunos = ({ session, clinica, setError, contextCallback }: BasicSelectProps): JSX.Element => {
  const context = useContext(AgendamentoPacienteContext);
  const [alunPeriods, setAlunPeriods] = useState<string[]>([]);
  const [selectAlun, setSelectAlun] = useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    setSelectAlun(event.target.value);
    context?.salvarAlunos(event.target.value);
  };

   useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === 'authenticated' && clinica !== undefined) {
          const response = await selectAlunPeriodoData({ jwt: session.data?.jwt ?? '', nome_clinica: clinica });
   
          if (response.result) {
            const namesArray = response.result.map((aluno: any) => aluno.nome);
            
            setAlunPeriods(namesArray);
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
            <InputLabel id="demo-simple-select-label">Alunos</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              value={selectAlun}
              label="Periodo"
            >
              {alunPeriods.map((aluno) => (
                <MenuItem key={aluno} value={aluno}>
                  {aluno}
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

export default SelectAlunos;