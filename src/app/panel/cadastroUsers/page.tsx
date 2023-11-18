'use client'
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material"
import React from "react";
import Users from '../../../../public/images/users.svg'
import Image from 'next/image'
import styles from '../../../styles/page.module.css'

export default function CadastroUsersPage(): JSX.Element {
  const lineForm = useMediaQuery('(max-width:1200px)')

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ padding: '20px', alignItems: 'center' }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Cadastro de Pacientes
          </Typography>
          <Typography sx={{ mb: 2 }}>
            Seja bem-vindo ao sistema de cadastro de usuários, por favor, informe os dados do paciente abaixo para cadastrá-lo no sistema.
          </Typography>
          <Box sx={{ padding: '50px' }}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  name="nome"
                  label="Nome Completo"
                  variant="outlined"
                  className={styles.lineForm}
                  sx={{ width: '800px' }}

                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  name="cpf"
                  label="CPF"
                  variant="outlined"
                  className={styles.lineForm}
                  sx={{ width: '800px' }}

                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  name="nascimento"
                  label="Data de nascimento"
                  variant="outlined"
                  sx={{ width: '800px' }}

                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  className={styles.lineForm}
                  sx={{ width: '800px' }}

                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  name="telefone"
                  label="Telefone"
                  variant="outlined"
                  className={styles.lineForm}
                  sx={{ width: '800px' }}

                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  name="endereco"
                  label="Endereço"
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
          <Image src={Users} alt="Fundo" width={650} height={800} />
        </Box>
      </Box >
    </>
  );
}
