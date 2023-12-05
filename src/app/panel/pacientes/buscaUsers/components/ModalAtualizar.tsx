'use client'

import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AlertColor, Button, Modal, TextField } from '@mui/material'
import theme from '@/theme'
import styles from '@/styles/page.module.css'
import { useSession } from 'next-auth/react'
import AtualizarUsersData from '@/services/pacientes/atualizarUserData'
import Snackbar from '@/components/Snackbar'

interface ModalAtualizarProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    userId?: number; // userId é agora opcional
}

export default function ModalAtualizar({
    openModal,
    setOpenModal,
    userId, // userId é agora opcional
}: ModalAtualizarProps): JSX.Element {
    const [snackBarActive, setSnackBarActive] = useState<boolean>(false);
    const [snackBarColor, setSnackBarColor] = useState<AlertColor | "loading">(
        "loading"
    );
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [autoHideDuration, setAutoHideDuration] = useState<number | null>(2000);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedUserData, setSelectedUserData] = useState<any | null>(null); // Adicione esta linha

    const [id, setId] = useState<number>()
    const [nome, setNome] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [nascimento, setNascimento] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [telefone, setTelefone] = useState<string>('')
    const [endereco, setEndereco] = useState<string>('')

    const session = useSession();

    const handleCloseModal = () => setOpenModal(false);

    React.useEffect(() => {
        // Atualiza os estados iniciais com os dados do usuário selecionado
        if (selectedUserData) {
            setId(selectedUserData.id);
            setNome(selectedUserData.nome);
            setCpf(selectedUserData.cpf);
            setNascimento(selectedUserData.data_nascimento);
            setEmail(selectedUserData.email);
            setTelefone(selectedUserData.telefone);
            setEndereco(selectedUserData.endereco);
        }
    }, [selectedUserData]);

    const handleSearchContent = async (): Promise<void> => {
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

            const response = await AtualizarUsersData({
                id: userId || selectedUserData.id,
                nome,
                cpf,
                data_nasc: nascimento,
                email,
                telefone,
                endereco,
                jwt: session?.data?.jwt ?? '',
            });
            if (response.error) {
                setSnackBarColor('error')
                setSnackBarMessage(response.msgUser)
            }
            else {
                setSnackBarColor('success')
                setSnackBarMessage(response.msgUser)

            }

        } catch (error) {
            console.error(error);
            setSnackBarColor("error");
            setSnackBarMessage("Houve um erro ao buscar histórico.");
            setAutoHideDuration(null);
        } finally {
            setLoading(false);
        }
    };
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
                        Faça a atualização do Paciente
                    </Typography>
                    <Typography variant="body2" id="logout-modal-description">
                        Informe os novos dados e atualize os dados do seu paciente.
                    </Typography>
                    <Box sx={{ padding: '50px' }}>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                name="nome"
                                label="Nome Completo"
                                required
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={(e) => setNome(e.target.value)}
                                value={nome}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                name="cpf"
                                label="CPF"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={(e) => setCpf(e.target.value)}
                                value={cpf}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                name="nascimento"
                                label="Data de nascimento"
                                type='date'
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={(e) => setNascimento(e.target.value)}
                                value={nascimento}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                name="email"
                                label="Email"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                name="telefone"
                                label="Telefone"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={(e) => setTelefone(e.target.value)}
                                value={telefone}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                name="endereco"
                                label="Endereço"
                                variant="outlined"
                                sx={{ width: '100%' }}
                                onChange={(e) => setEndereco(e.target.value)}
                                value={endereco}
                            />
                        </Box>
                    </Box>
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
                        onClick={handleSearchContent}
                        style={{
                            background: theme.palette.primary.light
                        }}
                    >
                        Atualizar
                    </Button>
                </Box>
            </Modal>
        </>
    )
}