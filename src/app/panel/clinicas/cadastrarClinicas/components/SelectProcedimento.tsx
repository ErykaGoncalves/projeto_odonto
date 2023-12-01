import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ProcedimentoData from '@/services/cadastroClinica/procedimentosData';
import { useContext, useEffect, useState } from 'react';
import { CadastroClinicaContext } from '@/context/cadastroClinica/CadastroClinicaContext';
import { AUTHENTICATED } from '@/utils/constants';
import { Skeleton } from '@mui/material';

interface BasicSelectProcedimentosProps {
  contextCallback?: (payload: string) => void;
  session: any;
  procedimento: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const SelectProcedimento = ({ session }: BasicSelectProcedimentosProps) => {
  const context = useContext(CadastroClinicaContext)
  const [procedimento, setProcedimento] = useState<string[]>([]);
  const [selectedProcedimento, setSelectedProcedimento] = React.useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === 'authenticated') {
          const result = await ProcedimentoData({ jwt: session.data?.jwt ?? '', nome: selectedProcedimento });
          const resultsObject: Record<string, string> = result.results;
          const extractedProced = Object.values(resultsObject);
          context?.salvarNome(selectedProcedimento)
          setProcedimento(extractedProced)
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchData();
  }, [session, selectedProcedimento, context]);

    const handleChange = (event: SelectChangeEvent) => {
      setSelectedProcedimento(event.target.value);
      context?.salvarNome(event.target.value)
    };

    if (session.status === AUTHENTICATED) {
      return (
        <>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Procedimentos</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
                value={selectedProcedimento}
                label="Procedimentos"
              >
                {procedimento.map((proced) => (
                  <MenuItem key={proced} value={proced}>
                    {proced}
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

  export default SelectProcedimento;
