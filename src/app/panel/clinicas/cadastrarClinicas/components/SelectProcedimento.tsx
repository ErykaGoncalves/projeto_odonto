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

const SelectProcedimento = ({ session, contextCallback, setError }: BasicSelectProcedimentosProps) => {
  const [procedimento, setProcedimento] = useState<any[]>([]);
  const [procedimentosCarregados, setProcedimentosCarregados] = useState(false);
  const context = useContext(CadastroClinicaContext);
  const [selectedProcedimento, setSelectedProcedimento] = useState<{ id: string; nome: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (session.status === 'authenticated') {
          const result = await ProcedimentoData({ jwt: session.data?.jwt ?? '', procedimento: selectedProcedimento });
          const resultsArray = result.results;
          setProcedimento(resultsArray);
          setProcedimentosCarregados(true);
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchData();
  }, [session, selectedProcedimento]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedProcedimentoId = event.target.value;
    const selectedProcedimentoObject = procedimento.find((p) => p.id === selectedProcedimentoId);

    if (selectedProcedimentoObject) {
      setSelectedProcedimento({
        id: selectedProcedimentoId,
        nome: selectedProcedimentoObject.nome,
      });

      context?.salvarTurno(selectedProcedimentoObject.nome);
      context?.salvarProcedimento(selectedProcedimentoObject);
    }
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
              value={selectedProcedimento ? selectedProcedimento.id : ''}
              label="Procedimentos"
              onChange={handleChange}
            >
              {procedimentosCarregados && procedimento.map((proced) => (
                <MenuItem key={proced.id} value={proced.id}>
                  {proced.nome}
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
