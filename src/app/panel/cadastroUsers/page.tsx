'use client'
import { AlertColor, Box, Button, TextField, Typography, useMediaQuery } from "@mui/material"
import React, { useCallback, useState } from "react"
import Users from '../../../../public/images/users.svg'
import Image from 'next/image'
import styles from '../../../styles/page.module.css'
import Snackbar from '../../../components/Snackbar'
import cadastroUserData from "@/services/cadastroUser/cadastroUserData"
import { useSession } from "next-auth/react"

export default function CadastroUsersPage(): JSX.Element {
  const { data: session } = useSession()
  const lineForm = useMediaQuery('(max-width:1200px)')
  const [error, setError] = useState<string | null>(null)
  const [snackBarActive, setSnackBarActive] = useState<boolean>(false)
  const [snackBarColor, setSnackBarColor] = useState<AlertColor | 'loading'>('loading')
  const [loading, setLoading] = useState<boolean>(false)
  const [snackBarMessage, setSnackBarMessage] = useState<string>('')
  const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000)

  const [nome, setNome] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [nascimento, setNascimento] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [telefone, setTelefone] = useState<string>('')
  const [endereco, setEndereco] = useState<string>('')

  const handleSaveContent = async (): Promise<void> => {
    try {
      setLoading(true)
      setSnackBarActive(true)
      setSnackBarColor('loading')
      setSnackBarMessage('Carregando...')
      setAutoHideDuration(null)

      const response = await cadastroUserData({
        email,
        endereco,
        telefone,
        dataNasc: nascimento,
        cpf,
        nome,
        jwt: session?.jwt ?? '',
      })

      if (response == error) {
        setSnackBarActive(true);
        setSnackBarColor('error');
        setSnackBarMessage('Prezado funcionário, ocorreu um erro, por favor, reinicie o sistema');
        setAutoHideDuration(null);
      } else {
        setSnackBarActive(true);
        setSnackBarColor('success');
        setSnackBarMessage('Sucesso ao cadastrar o usuário');
        setAutoHideDuration(5000);
      }
    } catch (error) {
      console.error(error)
      setSnackBarColor('error')
      setSnackBarMessage('Houve um erro ao salvar o cadastri do usuário.')
      setAutoHideDuration(null)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      {snackBarActive && (
        <Snackbar
          snackBarActive={snackBarActive}
          setSnackBarActive={setSnackBarActive}
          message={snackBarMessage}
          severity={snackBarColor}
          autoHideDuration={autoHideDuration}
        />
      )}
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
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                name="cpf"
                label="CPF"
                variant="outlined"
                className={styles.lineForm}
                sx={{ width: '800px' }}
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                name="nascimento"
                label="Data de nascimento"
                variant="outlined"
                sx={{ width: '800px' }}
                value={nascimento}
                onChange={(e) => setNascimento(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                name="email"
                label="Email"
                variant="outlined"
                className={styles.lineForm}
                sx={{ width: '800px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                name="telefone"
                label="Telefone"
                variant="outlined"
                className={styles.lineForm}
                sx={{ width: '800px' }}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                name="endereco"
                label="Endereço"
                variant="outlined"
                className={styles.lineForm}
                sx={{ width: '800px' }}
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </Box>
            <Button onClick={handleSaveContent} variant="contained" color="primary" style={{ marginTop: '16px', background: '#cab3ff' }}>
              Cadastrar
            </Button>
          </Box>
        </Box>
        <Box
          className={styles.imgPage} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Image src={Users} alt="Fundo" width={650} height={800} />
        </Box>
      </Box >
    </>
  )
}
