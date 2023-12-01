'use client'
import { AlertColor, Box, Button, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import Snackbar from '@/components/Snackbar'
import styles from '../../../../styles/page.module.css'
import HistoricoUsersData from "@/services/cadastroUser/historicoUsersData"
import { useSession } from "next-auth/react"
import myTheme from '@/theme'

type SessionDataItem = {
    cod_alu: string
    consulta: string
    data_consulta: string
    horario_consulta: string
    nome: string
    nome_aluno: string
    pagamento: string
    procedimento: string
    turno: string
    valor: string
}

export default function HistoricoUsersPage(): JSX.Element {
    const [snackBarActive, setSnackBarActive] = useState<boolean>(false)
    const [snackBarColor, setSnackBarColor] = useState<AlertColor | 'loading'>('loading')
    const [snackBarMessage, setSnackBarMessage] = useState<string>('')
    const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000)
    const [loading, setLoading] = useState<boolean>(false)
    const [info, setInfo] = useState<string>('')
    const [sessionData, setSessionData] = useState<SessionDataItem[] | null>(null)
    const session = useSession()


    const handleSaveContent = async (): Promise<void> => {
        try {
            if (
                info.trim() === ''
            ) {
                setSnackBarActive(true);
                setSnackBarColor('warning');
                setSnackBarMessage('Por favor, preencha o campo antes de pesquisar');
                setAutoHideDuration(null);
                return;
            }

            const response = await HistoricoUsersData({
                info,
                jwt: session?.data?.jwt ?? '',
            })

            if (response) {
                if (Array.isArray(response)) {
                    const promiseArray = response.map(async (item: string) => {
                        const detailedResponse = await HistoricoUsersData({
                            info: item,
                            jwt: session?.data?.jwt ?? '',
                        });
                        return detailedResponse;
                    });
            
                    const responses = await Promise.all(promiseArray);
                    const flattenedResults = responses.flat();
                    setInfo('');
                    console.log(response);
                    setSnackBarColor('success');
                    setSessionData((prevState: SessionDataItem[] | null) =>
                        prevState ? [...prevState, ...flattenedResults] : flattenedResults
                    );
                } else {
                    setSnackBarColor('error');
                    setSnackBarMessage('A resposta não é um array');
                    setAutoHideDuration(null);
                }
            }
        } catch (error) {
            setSnackBarColor('error');
            setSnackBarMessage('Houve um erro ao buscar histórico.');
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
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    Histórico de Pacientes
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    Por favor, informe seus dados para mostrar o histórico do paciente procurado.
                </Typography>
                <Box sx={{ padding: '50px' }}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            name="numeroProntuario"
                            label="Número de Prontuário ou CPF"
                            variant="outlined"
                            className={styles.lineForm}
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                            sx={{ width: '800px' }}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveContent}
                        style={{
                            marginTop: '16px',
                            background: '#cab3ff'
                        }}
                    >
                        Pesquisar
                    </Button>
                </Box>
                <Box>
                    {sessionData && (
                        <Box sx={{ marginTop: '16px', padding: '20px', background: '#E5E5E5', borderRadius: '10px' }}>
                            {sessionData.map((item: SessionDataItem, index: number) => (
                                <Box key={index} sx={{ background: myTheme.palette.primary.main, padding: '20px', borderRadius: '10px', margin: '10px' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#fff' }}>{item.nome}</Typography>
                                    <Typography variant="body1">Código Aluno: {item.cod_alu}</Typography>
                                    <Typography variant="body1">Consulta: {item.consulta}</Typography>
                                    <Typography variant="body1">Data da consulta: {item.data_consulta}</Typography>
                                    <Typography variant="body1">Horário da consulta : {item.horario_consulta}</Typography>
                                    <Typography variant="body1">nome do aluno: {item.nome_aluno}</Typography>
                                    <Typography variant="body1">Pagamento: {item.pagamento}</Typography>
                                    <Typography variant="body1">Procedimento: {item.procedimento}</Typography>
                                    <Typography variant="body1">Turno: {item.turno}</Typography>
                                    <Typography variant="body1">Valor: {item.valor}</Typography>

                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}