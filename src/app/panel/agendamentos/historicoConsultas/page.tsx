'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Users from '../../../../../public/images/historico.svg'
import Image from 'next/image'
import styles from '../../../../styles/page.module.css'

export default function CadastroUsersPage(): JSX.Element {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ padding: '20px' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Histórico de Consultas
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Por favor, informe os dados do paciente abaixo para verificar seu histórico de consultas.
          </Typography>
          <Box sx={{ padding: '50px' }}>
            <Box sx={{ mb: 2 }}>
              <TextField
                name="numeroProntuario"
                label="Número de Prontuário ou CPF"
                variant="outlined"
                className={styles.lineForm}
                sx={{ width: '800px' }}
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px', background: '#cab3ff' }}>
              Pesquisar
            </Button>
          </Box>
        </Box>
        <Box className={styles.imgPage} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Image src={Users} alt="Fundo" width={650} height={800} />
        </Box>
      </Box >
    </>
  );
}
