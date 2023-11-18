import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'
import styles from '@/styles/page.module.css'

export default function FormContato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    duvida: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  const whiteText = {
    color: 'white'
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        m: '20px',
        color: '#fff',
        fontWeight: 'bold'
      }}
    >
      <Box
      className={styles.formContato}
        sx={{
          backgroundColor: '#A783FA',
          borderRadius: '1rem',
          padding: '20px',
          width: '50%',
          textAlign: 'center',
          alignItems: 'center',
          color: '#fff',
          fontWeight: 'bold'
        }}
      >
        <Typography>Selecione seus dados e dúvidas que entraremos em contato</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            margin="normal"
            label="Nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            InputProps={{ style: whiteText }} 
          />
          <TextField
            fullWidth
            margin="normal"
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            InputProps={{ style: whiteText }} 
          />
          <TextField
            fullWidth
            margin="normal"
            label="Telefone"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            InputProps={{ style: whiteText }} 
          />
          <TextField
            fullWidth
            margin="normal"
            label="Sua dúvida"
            name="duvida"
            multiline
            rows={4}
            value={formData.duvida}
            onChange={handleChange}
            required
            InputProps={{ style: whiteText }}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px', background: '#cab3ff' }}>
            Enviar
          </Button>
        </form>
      </Box>
    </Box>
  );
}
