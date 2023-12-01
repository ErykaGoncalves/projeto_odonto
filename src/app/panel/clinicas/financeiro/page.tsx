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
import myTheme from '@/theme'

type SessionDataItem = {
    nome: string
    periodo: string
    procedimento: string
    total_atendimentos: string
    consultas_realizadas: string
    consultas_nao_realizadas: string
    valor_consulta: string
    total_valor_consultas_pagas: string
}


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
    const [snackBarActive, setSnackBarActive] = useState<boolean>(false)
    const [snackBarColor, setSnackBarColor] = useState<AlertColor | 'loading'>('loading')
    const [snackBarMessage, setSnackBarMessage] = useState<string>('')
    const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000)
    const [sessionData, setSessionData] = useState<SessionDataItem[] | null>(null)

    const session = useSession()
    const theme = useTheme()
    const [personName, setPersonName] = useState<string[]>([])
    const [clinicas, setClinicas] = useState<any[]>([])
    const [selectedProcedimentoId, setSelectedProcedimentoId] = useState<number[]>([])

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
                        periodo: clinica.periodo
                    }))

                    setClinicas(nomesClinicas)
                }
            } catch (error: any) {
                setSnackBarColor('error')
                setSnackBarMessage('Houve um erro ao mostrar as clínicas: ' + String(error))
                setAutoHideDuration(null)
            }
        }

        fetchData()
    }, [session])

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const selectedIds = clinicas
            .filter((clinica) => event.target.value.includes(clinica.nome))
            .map((clinica) => clinica.id)

        setPersonName(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value)
        setSelectedProcedimentoId(selectedIds)
    }

    const handleHistoricoContent = async (): Promise<void> => {
        try {

            const responsePromises = selectedProcedimentoId.map(async (clinicId) => {
                const response = await HistoricoClinicasData({
                    jwt: session?.data?.jwt ?? '',
                    id_clinica: clinicId,
                })
                return response.result
            })

            const responses = await Promise.all(responsePromises)
            const flattenedResults = responses.flat()

            console.log('Results from multiple clinics:', flattenedResults)

            setSnackBarColor('success')
            setSessionData((prevState: SessionDataItem[] | null) =>
                prevState ? [...prevState, ...flattenedResults] : flattenedResults
            )
        } catch (error: any) {
            setSnackBarColor('error')
            setSnackBarMessage('Houve um erro ao mostrar o seu histórico: ' + String(error))
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
                                        {clinica.nome} - {clinica.periodo} PERIODO
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleHistoricoContent}
                            style={{
                                marginTop: '16px',
                                background: '#cab3ff',
                            }}
                        >
                            Pesquisar
                        </Button>
                        <Box>
                            {sessionData && (
                                <Box sx={{ marginTop: '16px', padding: '20px', background: '#E5E5E5', borderRadius: '10px' }}>
                                    {sessionData.map((item: SessionDataItem, index: number) => (
                                        <Box key={index} sx={{ background: myTheme.palette.primary.main, padding: '20px', borderRadius: '10px', margin: '10px' }}>
                                            <Typography variant="subtitle1" sx={{fontWeight: 'bold', color: '#fff'}}>{item.nome}</Typography>
                                            <Typography variant="body1">Periodo: {item.periodo}</Typography>
                                            <Typography variant="body1">Procedimento: {item.procedimento}</Typography>
                                            <Typography variant="body1">Total de atendimento: {item.total_atendimentos}</Typography>
                                            <Typography variant="body1">Consultas realizadas: {item.consultas_realizadas}</Typography>
                                            <Typography variant="body1">Consultas não realizadas: {item.consultas_nao_realizadas}</Typography>
                                            <Typography variant="body1">Valor da Consulta: {item.valor_consulta}</Typography>
                                            <Typography variant="body1">Total do valor de consultas: {item.total_valor_consultas_pagas}</Typography>
                                           
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box
                        className={styles.imgPage}
                        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
                    >
                        <Image src={financeiro} alt="Fundo" width={650} height={700} />
                    </Box>
                </Box>
            </Box>
        </>
    )
}