'use client'

import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, Modal } from '@mui/material'
import theme from '@/theme'
import ButtonLogout from '@/components/ButtonLogout'

interface SelectPerfilProps {
    openModal: boolean
    setOpenModal: (value: boolean) => void
}

export default function SelectPerfil({
    openModal,
    setOpenModal
}: SelectPerfilProps): JSX.Element {

    const handleCloseModal = () => setOpenModal(false);
    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="logout-modal-title"
            aria-describedby="logout-modal-description"
        >
            <Box
                sx={{
                    width: 300,
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
                    Fazer Logout
                </Typography>
                <Typography variant="body2" id="logout-modal-description">
                    Tem certeza que deseja sair?
                </Typography>
                <Button onClick={handleCloseModal} sx={{ mt: 2, color: theme.palette.primary.main }}>
                    Cancelar
                </Button>
                <ButtonLogout />
            </Box>
        </Modal>
    )
}
