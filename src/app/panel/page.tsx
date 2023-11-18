'use client'
import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import '../../styles/page.module.css';
import ListaAtendimentosDiarios from "./components/DiasDeAtendimento";
import Image from "next/image";
import Dashboard from '../../../public/images/dashboard.svg';
import theme from "@/theme";
import styles from '../../styles/page.module.css'

export default function Panel(): JSX.Element {
    const isMobile = useMediaQuery('(max-width:1500px)');

    return (
        <>
            <Box suppressHydrationWarning={true}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px'
                }}
            >
                <Box>
                    <Typography variant="h3" sx={{ mb: 2 }}>
                        Seja bem vindo!
                    </Typography>
                    <Typography sx={{ mb: 2 }}>
                        Sistema criado para controle de consultas da clínica odontologica da UNITRI.
                    </Typography>
                    <Box sx={{
                        background: theme.palette.primary.main,
                        display: isMobile ? 'block' : 'none',
                        margin: '10px',
                        borderRadius: '5px',
                        boxShadow: '0px 0px 15px #b899fe',
                        padding: '10px'
                    }}
                    >
                        <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Atenção:
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            Para visualizar as ações do sistema, entre no menu localizado no ícone superior esquerdo!
                        </Typography>
                    </Box>
                    <Box sx={{ display: isMobile ? 'block' : 'flex'}}>
                        <Box sx={{ display: isMobile ? 'none' : 'block', mt: '80px' }}>
                            <ListaAtendimentosDiarios />
                        </Box>
                        <Box className={styles.imgPage} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                            <Image
                                src={Dashboard}
                                width={isMobile ? 600 : 650}
                                height={isMobile ? 600 : 700}
                                style={{ display: isMobile ? 'none' : 'block' }}
                                alt="Imagem representativa"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}
