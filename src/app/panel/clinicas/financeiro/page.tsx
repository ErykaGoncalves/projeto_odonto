'use client'
import * as React from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { AlertColor, Box, Button, Chip, Typography } from '@mui/material'
import financeiro from '../../../../../public/images/financeiro.svg'
import Image from 'next/image'
import styles from '../../../../styles/page.module.css'
import { useEffect, useState } from 'react'
import clinicasAllData from '@/services/financeiroClinica/clinicasAllData'
import { useSession } from 'next-auth/react'
import HistoricoClinicasData from '@/services/financeiroClinica/historicoClinicaData'
import Snackbar from '@/components/Snackbar'


const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    }

}


export default function MultipleSelect(): JSX.Element {
    const [error, setError] = useState<string | null>(null)
    const [snackBarActive, setSnackBarActive] = useState<boolean>(false)
    const [snackBarColor, setSnackBarColor] = useState<AlertColor | 'loading'>('loading')
    const [loading, setLoading] = useState<boolean>(false)
    const [snackBarMessage, setSnackBarMessage] = useState<string>('')
    const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000)
    const [sessionData, setSessionData] = useState<any>(null)
    const session = useSession()
    const theme = useTheme()
    const [personName, setPersonName] = React.useState<string[]>([])
    const [clinicas, setClinicas] = React.useState<any[]>([])
    const [id_clinica, setProcedimentoId] = useState<number | null>(null)
    const [selectedProcedimentoId, setSelectedProcedimentoId] = React.useState<number[]>([]);




    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                if (session.status === 'authenticated') {

                    const response = await clinicasAllData({
                        jwt: session?.data?.jwt ?? '',
                    })

                    const nomesClinicas = response.results.map((clinica: any) => ({
                        id: clinica.id,
                        nome: clinica.nome,
                    }))

                    setClinicas(nomesClinicas)
                }
            } catch (error: any) {
                setSnackBarColor('error')
                setSnackBarMessage('Houve um erro ao mostrar as clínicas: ' + String(error))
                setAutoHideDuration(null)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [session])

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const selectedIds = clinicas
            .filter((clinica) => event.target.value.includes(clinica.nome))
            .map((clinica) => clinica.id);

        setPersonName(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
        setSelectedProcedimentoId(selectedIds);
    }


    const handleHistoricoContent = async (): Promise<void> => {
        try {
            setLoading(true);
            setSnackBarActive(true);
            setSnackBarColor('loading');
            setSnackBarMessage('Carregando...');
            setAutoHideDuration(null);

            const response = await HistoricoClinicasData({
                jwt: session?.data?.jwt ?? '',
                id_clinica: selectedProcedimentoId,
            });

            if (response && !response.error) {
                setSessionData(response.results)
                setSnackBarColor('success')
                setSnackBarMessage(response.msgUser)
            } else {
                setSnackBarColor('error')
                setSnackBarMessage(response.msgUser)
            }
        } catch (error: any) {
            setSnackBarColor('error')
            setSnackBarMessage('Houve um erro ao mostrar o seu histórico: ' + String(error))
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
            <Box sx={{ padding: '20px' }}>
                <Typography variant="h3" sx={{ mb: 2 }}>
                    Consultas Financeiras
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    Por favor, informe a clínica ao qual deseja ver seus dados financeiros.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ m: 2 }}>
                        <FormControl>
                            <InputLabel id="demo-multiple-chip-label">Clínica</InputLabel>
                            <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={personName}
                                className={styles.selectForm}
                                onChange={handleChange}
                                input={<OutlinedInput id="select-multiple-chip" label="Clínica" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                sx={{ width: 800 }}
                            >
                                {clinicas.map((clinica) => (
                                    <MenuItem
                                        key={clinica.id}
                                        value={clinica.nome}
                                        style={getStyles(clinica.nome, personName, theme)}
                                    >
                                        {clinica.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleHistoricoContent}  // Alterado de onChange para onClick
                            style={{
                                marginTop: '16px',
                                background: '#cab3ff',
                            }}
                        >
                            Pesquisar
                        </Button>
                        {sessionData && (
                            <Box sx={{ marginTop: '16px' }}>
                                <Typography variant="h5">Resultados do Histórico:</Typography>
                                <ul>
                                    {sessionData.map((item: any, index: number) => (
                                        <li key={index}>{/* Renderize os dados do histórico aqui */}</li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                    </Box>
                    <Box className={styles.imgPage} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Image src={financeiro} alt="Fundo" width={650} height={700} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}
