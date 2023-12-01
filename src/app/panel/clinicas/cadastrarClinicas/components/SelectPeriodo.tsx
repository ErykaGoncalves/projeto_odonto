import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import periodoData from '@/services/cadastroClinica/periodoData';
import { useContext, useEffect, useState } from 'react';
import { CadastroClinicaContext } from '@/context/cadastroClinica/CadastroClinicaContext';
import { AUTHENTICATED } from '@/utils/constants';
import { Skeleton } from '@mui/material';

interface BasicSelectProps {
  contextCallback?: (payload: string) => void;
  session: any;
  periodo: string | undefined
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}


const SelectPeriodo = ({ session }: BasicSelectProps) => {
  const context = useContext(CadastroClinicaContext);
  const [periods, setPeriods] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = React.useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === 'authenticated') {
          const result = await periodoData({ jwt: session.data?.jwt ?? '', periodo: selectedPeriod });
          const resultsObject: Record<string, string> = result.results;
          const extractedPeriods = Object.values(resultsObject);
          context?.salvarPeriodo(selectedPeriod)
          setPeriods(extractedPeriods);
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchData();
  }, [session, selectedPeriod, context]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedPeriod(event.target.value);
    context?.salvarPeriodo(event.target.value);
  };

  if (session.status === AUTHENTICATED) {
    return (
      <>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Período</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChange}
              value={selectedPeriod}
              label="Periodo"
            >
              {periods.map((period) => (
                <MenuItem key={period} value={period}>
                  {period} PERÍODO
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

export default SelectPeriodo;
