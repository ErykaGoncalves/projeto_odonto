'use client'
import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import Clinic from '../../../../../public/images/clinica.svg'
import Image from 'next/image'
import styles from '../../../../styles/page.module.css'

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
                    <TextField
                      name="periodo"
                      label="Período"
                      variant="outlined"
                      className={styles.lineForm}
                      sx={{ width: '800px' }}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      name="horario"
                      label="Horário"
                      variant="outlined"
                      className={styles.lineForm}
                      sx={{ width: '800px' }}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      name="procedimento"
                      label="Procedimento"
                      variant="outlined"
                      className={styles.lineForm}
                      sx={{ width: '800px' }}
                    />
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
