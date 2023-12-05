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
  alunos: string | undefined
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}


const SelectAlunos = ({ session }: BasicSelectProps): JSX.Element => {
  const context = useContext(AgendamentoPacienteContext);
  const [alunPeriods, setAlunPeriods] = useState<string[]>([]);
  const [selectAlun, setSelectAlun] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === 'authenticated') {
          const result = await selectAlunPeriodoData({ jwt: session.data?.jwt ?? '', nome_clinica: selectAlun });
          const resultsObject: Record<string, string> = result.results;
          const extractedPeriods = Object.values(resultsObject);
          context?.salvarAlunos(selectAlun)
          setAlunPeriods(extractedPeriods);
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchData();
  }, [session, selectAlun, context]);

  const handleChange = () => {
    setSelectAlun('');
    context?.salvarAlunos('');
  };

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
              {alunPeriods.map((alunos) => (
                <MenuItem key={alunos} value={alunos}>
                  {alunos}
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

export default SelectAlunos