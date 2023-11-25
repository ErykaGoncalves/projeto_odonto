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
        <InputLabel id="demo-simple-select-label">Período</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Periodo"
          onChange={handleChange}
        >
          <MenuItem value={10}>5º período</MenuItem>
          <MenuItem value={20}>6º período</MenuItem>
          <MenuItem value={30}>7º período</MenuItem>
          <MenuItem value={40}>8º período</MenuItem>
          <MenuItem value={50}>9º período</MenuItem>
          <MenuItem value={60}>10º período</MenuItem>


        </Select>
      </FormControl>
    </Box>
  );
}