'use client'
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AlertColor, Box, Button, Chip, Typography } from '@mui/material';
import financeiro from '../../../../../public/images/financeiro.svg'
import Image from 'next/image'
import styles from '../../../../styles/page.module.css'
import { useEffect, useState } from 'react';
import clinicasAllData from '@/services/financeiroClinica/clinicasAllData';
import { useSession } from 'next-auth/react';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Clínica 1',
    'Clínica 2',
    'Clínica 3',
    'Clínica 4',
    'Clínica 5',
];

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelect(): JSX.Element {
    const [error, setError] = useState<string | null>(null);
    const [snackBarActive, setSnackBarActive] = useState<boolean>(false);
    const [snackBarColor, setSnackBarColor] = useState<AlertColor | 'loading'>('loading');
    const [loading, setLoading] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>('');
    const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000);
    const session = useSession();
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
    const [clinicas, setClinicas] = React.useState<string[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                if (session.status === 'authenticated') {
                    setLoading(true);
                    setSnackBarActive(true);
                    setSnackBarColor('loading');
                    setSnackBarMessage('Carregando...');
                    setAutoHideDuration(null);
    
                    const response = await clinicasAllData({
                        jwt: session?.data?.jwt ?? '',
                    });
    
                    const nomesClinicas = response.results.map((clinica: any) => clinica.nome);
    
                    setClinicas(nomesClinicas);
                }
            } catch (error: any) {
                setSnackBarColor('error');
                setSnackBarMessage('Houve um erro ao mostrar as clínicas: ' + String(error));
                setAutoHideDuration(null);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData(); // Chamado quando a sessão é autenticada
    }, [session]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    return (
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
                                    key={clinica}
                                    value={clinica}
                                    style={getStyles(clinica, personName, theme)}
                                >
                                    {clinica}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            marginTop: '16px',
                            background: '#cab3ff'
                        }}
                    >
                        Pesquisar
                    </Button>
                </Box>
                <Box className={styles.imgPage} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Image src={financeiro} alt="Fundo" width={650} height={700} />
                </Box>
            </Box>
        </Box>
    );
}
