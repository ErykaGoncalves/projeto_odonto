'use client'
import { AlertColor, Box, Button, TextField, Typography, styled, useMediaQuery } from "@mui/material"
import React, { useState } from "react"
import styles from '../../../../styles/page.module.css'
import Snackbar from '../../../../components/Snackbar'
import cadastroUserData from "@/services/cadastroUser/cadastroUserData"
import { useSession } from "next-auth/react"


export default function CadastroUsersPage(): JSX.Element {
  const session = useSession()
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

  const handleNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value;

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (datePattern.test(inputValue) || inputValue === '' || inputValue.length <= 10) {
      setNascimento(inputValue);
    }
  };


  const handleSaveContent = async (): Promise<void> => {
    try {

      if (
        nome.trim() === '' ||
        cpf.trim() === '' ||
        nascimento.trim() === '' ||
        email.trim() === '' ||
        telefone.trim() === '' ||
        endereco.trim() === ''
      ) {
        setSnackBarActive(true);
        setSnackBarColor('warning');
        setSnackBarMessage('Por favor, preencha todos os dados antes de cadastrar');
        setAutoHideDuration(null);
        return;
      }

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
        jwt: session?.data?.jwt ?? '',
      })


      if (response) {
        if (response?.error) {
          setSnackBarColor('error');
          setSnackBarMessage(response?.msgUser ?? 'Prezado funcionário, ocorreu um erro, por favor, reinicie o sistema');
          setAutoHideDuration(null);
        } else {
          setNome('')
          setCpf('')
          setNascimento('')
          setEmail('')
          setTelefone('')
          setEndereco('')

          setSnackBarColor('success');
          setSnackBarMessage(response?.msgUser + ' Seu número de prontuário é: ' + response?.nro_prontuario ?? 'Sucesso ao cadastrar o usuário' + response?.nro_prontuario);
        }
      } else {
        setSnackBarColor('error');
        setSnackBarMessage( 'Erro ao processar a resposta da API');
        setAutoHideDuration(null);
      }
    } catch (error) {
      console.error(error);
      setSnackBarColor('error');
      setSnackBarMessage('Houve um erro ao salvar o cadastro do usuário.');
      setAutoHideDuration(null);
    } finally {
      setLoading(false);
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
                required
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
                onChange={handleNascimentoChange}
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
            <Button
              onClick={handleSaveContent}
              variant="contained"
              color="primary"
              style={{ marginTop: '16px', background: '#cab3ff' }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Box >
    </>
  )
}