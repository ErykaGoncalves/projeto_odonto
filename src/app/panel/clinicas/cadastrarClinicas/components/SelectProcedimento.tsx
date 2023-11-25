import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Procedimentos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Procedimentos"
          onChange={handleChange}
        >
          <MenuItem value={10}>EXTRAÇÃO DE DENTE</MenuItem>
          <MenuItem value={20}>IMPLANTE</MenuItem>
          <MenuItem value={30}>CLÍNICA GERAL</MenuItem>
          <MenuItem value={30}>ENDODONTIA</MenuItem>
          <MenuItem value={30}>PERIODONTIA</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}