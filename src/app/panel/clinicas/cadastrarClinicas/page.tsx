'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Clinic from '../../../../../public/images/clinica.svg'
import Image from 'next/image'
import styles from '../../../../styles/page.module.css'
import SelectPeriodo from './components/SelectPeriodo'
import SelectHorario from './components/SelectHorario'
import SelectProcedimento from './components/SelectProcedimento'

export default function CadastroUsersPage(): JSX.Element {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ padding: '20px' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Cadastro de Clínicas
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Para realizar o cadastro de uma nova clínica, por favor, informe os dados abaixo.
          </Typography>
          <Box sx={{ padding: '50px' }}>
            <Box sx={{ mb: 2 }}>
              <SelectPeriodo />
            </Box>
            <Box sx={{ mb: 2 }}>
              <SelectHorario />
            </Box>
            <Box sx={{ mb: 2 }}>
              <SelectProcedimento />
            </Box>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '16px', background: '#cab3ff' }}>
              Cadastrar
            </Button>
          </Box>
        </Box>
        <Box className={styles.imgPage} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Image src={Clinic} alt="Fundo" width={650} height={800} />
        </Box>
      </Box >
    </>
  );
}
