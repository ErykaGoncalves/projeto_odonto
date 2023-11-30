  'use client'
  import { AlertColor, Box, Button, Typography } from "@mui/material"
  import React, { useContext, useEffect, useState } from "react"
  import Clinic from '../../../../../public/images/clinica.svg'
  import Image from 'next/image'
  import styles from '../../../../styles/page.module.css'
  import SelectPeriodo from './components/SelectPeriodo'
  import SelectHorario from './components/SelectTurnos'
  import SelectProcedimento from './components/SelectProcedimento'
  import cadastroClinicaData from "@/services/cadastroClinica/cadastrarData"
  import Snackbar from "@/components/Snackbar"
  import { useSession } from "next-auth/react"
  import { CadastroClinicaContext } from "@/context/cadastroClinica/CadastroClinicaContext"

  export default function CadastroClinicaPage(): JSX.Element {
    const [error, setError] = useState<string | null>(null)
    const [snackBarActive, setSnackBarActive] = useState<boolean>(false)
    const [snackBarColor, setSnackBarColor] = useState<AlertColor | 'loading'>('loading')
    const [loading, setLoading] = useState<boolean>(false)
    const [snackBarMessage, setSnackBarMessage] = useState<string>('')
    const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000)
    const session = useSession()
    const context = useContext(CadastroClinicaContext)

    const handleSaveContent = async (): Promise<void> => {
      const periodo = context?.state.periodo || ''
      const turno = context?.state.turno || ''
      const nome = context?.state.nome || ''
      try {
        setLoading(true)
        setSnackBarActive(true)
        setSnackBarColor('loading')
        setSnackBarMessage('Carregando...')
        setAutoHideDuration(null)

        if (nome === undefined || nome === null) {
          console.error('Erro: O nome é obrigatório.')
          return
        }
        const response = await cadastroClinicaData({
          periodo: periodo,
          turno: turno,
          nome: nome,
          jwt: session?.data?.jwt ?? '',
        })

        if (response) {
          if (response.error) {
            setSnackBarColor('error')
            setSnackBarMessage(response.msgUser + error)
            setAutoHideDuration(null)
          } else {
            setSnackBarColor('success')
            setSnackBarMessage(response.msgUser)
            console.log(response)
          }
        }
      } catch (error: any) {
        setSnackBarColor('error')
        setSnackBarMessage('Houve um erro ao salvar o cadastro do usuário: ' + String(error))
        setAutoHideDuration(null)
      } finally {
        setLoading(false)
      }
    }

    useEffect(() => {
      console.log(context?.state.periodo)
      console.log(context?.state.nome)
      console.log(context?.state.turno)
    }, [context?.state.periodo, context?.state.nome, context?.state.turno])
    

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
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ padding: '20px' }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              Cadastro de Clínicas
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Para realizar o cadastro de uma nova clínica, por favor, informe os dados abaixo.
            </Typography>

            {error && (
              <Snackbar
                snackBarActive={snackBarActive}
                setSnackBarActive={setSnackBarActive}
                message={error}
                autoHideDuration={null}
                severity="error"
              />
            )}

            <Box sx={{ padding: '50px' }}>
              <Box sx={{ mb: 2 }}>
                <SelectPeriodo
                  session={session}
                  periodo={context?.state.periodo}
                  setError={setError}
                  contextCallback={context?.salvarPeriodo}
                />
              </Box>
              {context?.state.periodo && (
                <Box sx={{ mb: 2 }}>
                  <SelectHorario
                    session={session}
                    turno={context?.state.turno || ''}
                    setError={setError}
                    contextCallback={context?.salvarTurno}
                  />
                </Box>
              )}
              {context?.state.turno && (
                <Box sx={{ mb: 2 }}>
                  <SelectProcedimento
                    session={session}
                    procedimento={context?.state.nome}
                    setError={setError}
                    contextCallback={context?.salvarNome}
                  />
                </Box>
              )}
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveContent}
                style={{ marginTop: '16px', background: '#cab3ff' }}>
                Cadastrar
              </Button>
            </Box>
          </Box>
          <Box className={styles.imgPage} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Image src={Clinic} alt="Fundo" width={650} height={800} />
          </Box>
        </Box >
      </>
    )
  }