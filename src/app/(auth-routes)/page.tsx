'use client'

import { Box, Typography, Button, TextField, InputAdornment, CircularProgress } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import styles from '../../styles/page.module.css'
import IconButton from '@mui/material/IconButton'

export default function HomeAuth() {
  const router = useRouter();
  const [codUser, setCodUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      setLoading(() => true)
      const response = await signIn('credentials', {
        redirect: false,
        cod_user: codUser,
        password: password
      });

      if (response?.error) {
        setErrorMessage("Credenciais inválidas. Por favor, verifique seu código de usuário e senha." + errorMessage);
        return;
      }

      router.replace('/panel');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage("Ocorreu um erro durante o login. Tente novamente mais tarde.");
    }
  }

  return (
    <Box
      sx={{ padding: '20px' }}
    >
      <Box
        sx={{
          margin: 'auto 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        <Box sx={{ mt: '60px' }}>
          <Typography
            variant="h3"
            component="h1"
            textAlign="left"
            width="100%"
            sx={{ textAlign: 'center' }}

          >
            Bem-vindo à UNITRI!
          </Typography>
          <Typography
            variant="subtitle1"
            component="p"
            width="100%"
            sx={{ mt: '50px' }}
          >
            Acesse suas informações e explore nossas ferramentas para uma
            jornada acadêmica eficiente.
          </Typography>
        </Box>
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: '60px', width: '100%' }}
        >
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            name="cod_user"
            placeholder="Digite seu código de usuário"
            onChange={(e) => setCodUser(e.target.value)}
            sx={{
              margin: '20px 0 4px 0'
            }}
          />

          <TextField
            fullWidth
            variant="outlined"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  >
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{
              margin: '20px 0 4px 0',
              color: errorMessage ? 'red' : 'inherit',
            }}
          />
          {errorMessage && (
            <Typography variant="body2" color="error">
              {errorMessage}
            </Typography>
          )}
          
          <Button
            variant="contained"
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              backgroundColor: '#a783fa',
              mt: '50px',
              '&:hover': {
                backgroundColor: '#a783fa',
                boxShadow: '0px 0px 20px #a783fa'
              }
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  'Entrar'
                )}
          </Button>
        </form>
      </Box>
      <Typography
        textAlign="center"
        variant="body1"
        margin="auto 0"
        className={styles.firstAccess}
      >
        Primeiro acesso?
        <br />
      </Typography>
    </Box>
  )
}
