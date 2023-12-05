'use client'

import React, { useContext, useEffect, useState } from 'react'
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
import agendarConsulta from '@/services/agendamentoPacientes/agendarConsultaData'
import { AgendamentoPacienteContext } from '@/context/agendamentoPaciente/AgendamentoPacienteContext'

interface ModalAtualizarProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    userId?: number;
}

interface Aluno {
    id: string;
    nome: string;
}

interface Paciente {
    id: string;
    nome: string;
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
    const [loading, setLoading] = useState<boolean>(false)
    const session = useSession();
    const context = useContext(AgendamentoPacienteContext)

    const handleCloseModal = () => setOpenModal(false);
    const [nome_clinica, setNome_clinica] = useState<string>('')
    const [horario_consulta, setHorario_consulta] = useState<string>('')
    const [alunoId, setAlunoId] = useState<string>('');
    const [pacienteId, setPacienteId] = useState<string>('');
    const [pacienteIdModal, setPacienteIdModal] = useState<string>('');

    useEffect(() => {
        if (context && context.state) {
            setAlunoId(context.state.alunoId || '');
            setPacienteId(context.state.pacienteId || '');
            setPacienteIdModal(context.state.pacienteId || ''); // Adicione esta linha
        }
    }, [context]);

    const handleAgendaContent = async (): Promise<void> => {
        try {
            setLoading(true);
            setSnackBarActive(true);
            setSnackBarColor('loading');
            setSnackBarMessage('Carregando...');
            setAutoHideDuration(null);
    
            // Certifique-se de que os dados do aluno e paciente estão no contexto
            const alunoId: string | undefined = context?.state.alunoId;
            const pacienteId: string | undefined = context?.state.pacienteId;
    
            // Certifique-se de que outros campos obrigatórios estão preenchidos
            if (!nome_clinica || !horario_consulta || !alunoId || !pacienteId) {
                throw new Error("Preencha todos os campos obrigatórios.");
            }

            const response = await agendarConsulta({
                nome_clinica,
                horario_consulta,
                paciente_id: pacienteId,
                aluno_id: alunoId,
                jwt: session?.data?.jwt ?? '',
            });

            if (response) {
                if (response?.error) {
                    setSnackBarColor('error');
                    setSnackBarMessage(response?.msgUser);
                    setAutoHideDuration(null);
                } else {
                    setNome_clinica('')
                    setHorario_consulta('')

                    setSnackBarColor('success');
                    setSnackBarMessage(response?.msgUser);
                }
            } else {
                setSnackBarColor('error');
                setSnackBarMessage('Erro ao processar a resposta da API');
                setAutoHideDuration(null);
            }
        } catch (error) {
            console.error("Erro durante a execução:", error);
            setSnackBarColor('error');
            setSnackBarMessage('Houve um erro ao salvar o agendamento do usuário.');
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
                        <Box sx={{ mb: 2 }}>
                            <SelectHorario
                                session={session}
                                horario={context?.state.horario}
                                clinica={context?.state.clinica || ''}
                                setError={setError}
                                contextCallback={context?.salvarHorario}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <SelectAlunos
                                session={session}
                                alunos={context?.state.alunos}
                                clinica={context?.state.clinica || ''}
                                setError={setError}
                                contextCallback={context?.salvarAlunos}
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
                            onClick={handleAgendaContent}
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