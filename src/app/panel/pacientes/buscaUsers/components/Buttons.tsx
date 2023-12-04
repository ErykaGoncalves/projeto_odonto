// Buttons.tsx

import React from "react";
import { Box, Button } from "@mui/material";
import myTheme from "@/theme";
import ModalExcluir from "./ModalExcluir";
import ModalAtualizar from "./ModalAtualizar";

interface ButtonsProps {
    onExcluirClick: () => void;
    onAtualizarClick: () => void;
}

export default function Buttons({ onExcluirClick, onAtualizarClick }: ButtonsProps): JSX.Element {
    const [openModalExcluir, setOpenModalExcluir] = React.useState(false);
    const [openModalAtualizar, setOpenModalAtualizar] = React.useState(false);

    const handleOpenModalExcluir = (): void => {
        setOpenModalExcluir(true);
        onExcluirClick();
    };

    const handleOpenModalAtualizar = (): void => {
        setOpenModalAtualizar(true);
        onAtualizarClick();
    };

    return (
        <>
            <Box sx={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <Button onClick={handleOpenModalExcluir} variant="contained" style={{ background: myTheme.palette.primary.dark, color: '#fff', margin: '10px' }}>
                    Excluir
                </Button>
                <Button onClick={handleOpenModalAtualizar} variant="contained" style={{ background: myTheme.palette.primary.dark, margin: '10px' }}>
                    Atualizar
                </Button>
            </Box>
            <ModalExcluir setOpenModal={setOpenModalExcluir} openModal={openModalExcluir} />
            <ModalAtualizar setOpenModal={setOpenModalAtualizar} openModal={openModalAtualizar} />
        </>
    )
}
