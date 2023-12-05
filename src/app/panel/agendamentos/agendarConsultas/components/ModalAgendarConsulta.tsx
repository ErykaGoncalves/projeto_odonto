'use client'

import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AlertColor, Button, Modal, TextField } from '@mui/material'
import theme from '@/theme'
import { useSession } from 'next-auth/react'
import Snackbar from '@/components/Snackbar'
import SelectAlunos from './SelectAlunos'
import SelectClinica from './SelectClinica'
import SelectData from './SelectData'
import SelectHorario from './SelectHorario'
import { AgendamentoPacienteContext } from '@/context/agendamentoPaciente/AgendamentoPacienteContext'

interface ModalAtualizarProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    userId?: number;
}

export default function ModalAtualizar({
    openModal,
    setOpenModal
}: ModalAtualizarProps): JSX.Element {
    const [error, setError] = useState<string | null>(null)
    const [snackBarActive, setSnackBarActive] = useState<boolean>(false);
    const [snackBarColor, setSnackBarColor] = useState<AlertColor | "loading">(
        "loading"
    );
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000);

    const session = useSession();
    const context = useContext(AgendamentoPacienteContext)

    const handleCloseModal = () => setOpenModal(false);

    const handleAlert = () => {
        alert('ppa')
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
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="logout-modal-title"
                aria-describedby="logout-modal-description"
            >
                <Box
                    sx={{
                        width: '50%',
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 4,
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <Typography variant="h6" id="logout-modal-title" gutterBottom>
                        Faça o agendamento
                    </Typography>
                    <Typography variant="body2" id="logout-modal-description">
                        Informe os novos dados e faça o agendamento do seu paciente.
                    </Typography>
                    <Box sx={{ padding: '50px' }}>
                        <Box sx={{ mb: 2 }}>
                            <SelectClinica
                                session={session}
                                clinica={context?.state.clinica}
                                setError={setError}
                                contextCallback={context?.salvarClinica}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <SelectData
                                session={session}
                                data={context?.state.data}
                                clinica={context?.state.clinica || ''} 
                                setError={setError}
                                contextCallback={context?.salvarData}
                            />
                        </Box>

                    </Box>
                    <div>
                        <Button
                            variant='contained'
                            color="primary"
                            onClick={handleCloseModal}
                            style={{
                                margin: "16px",
                                background: theme.palette.primary.light
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant='contained'
                            color="primary"
                            onClick={handleAlert}
                            style={{
                                background: theme.palette.primary.light
                            }}
                        >
                            Agendar
                        </Button>
                    </div>
                </Box>
            </Modal>

        </>
    )
}