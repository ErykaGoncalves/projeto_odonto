
'use client'
import * as React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import { useMediaQuery, Link, IconButton, Drawer, Typography } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Collapse from '@mui/material/Collapse'
import DomainAddIcon from '@mui/icons-material/DomainAdd'
import RequestQuoteIcon from '@mui/icons-material/RequestQuote'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import styles from '../../../styles/page.module.css'
import EditNoteIcon from '@mui/icons-material/EditNote'
import DomainIcon from '@mui/icons-material/Domain'
import theme from '@/theme'
import HomeIcon from '@mui/icons-material/Home'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PeopleIcon from '@mui/icons-material/People';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ModalLogout from './ModalLogout'

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}))

export default function MenuSystem({
    openSideMenu,
    setSideOpenMenu
}: {
    openSideMenu: boolean
    setSideOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element {
    const [openSubMenu, setOpenSubMenu] = React.useState({
        cadastro: false,
        agendamentos: false,
        configuracoes: false,
        clinicas: false,
        users: false
    })
    const [openModal, setOpenModal] = React.useState(false)
    const isMobile = useMediaQuery('(max-width:850px)')

    const handleClick = (menu: string): void => {
        setOpenSubMenu((prevOpen: any) => ({
            ...prevOpen,
            [menu]: !prevOpen[menu]
        }))
    }
    const handleDrawerClose = (): void => {
        setSideOpenMenu(() => false)
    }

    const handleOpenModal = (): void => {
        setOpenModal(true)
    }
    return (
        <>
            <Drawer
                sx={{
                    width: isMobile ? '100vw' : '250px',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isMobile ? '100vw' : '250px',
                        boxSizing: 'border-box'
                    }
                }}
                variant="persistent"
                anchor="left"
                open={openSideMenu}
            >
                <Box sx={{ height: isMobile ? '100%' : '100vh' }}>
                    <List
                        className={styles.listLayout}
                        sx={{
                            background: theme.palette.primary.main, minHeight: '100vh',
                            height: 'auto',
                            color: '#fff',
                            itemsColor: '#fff'
                        }}
                    >
                        <DrawerHeader>

                            <Box>
                                <DrawerHeader>
                                    <IconButton onClick={handleDrawerClose} sx={{ color: '#fff' }}>
                                        {theme.direction === 'ltr' ? (
                                            <ChevronLeftIcon />
                                        ) : (
                                            <ChevronRightIcon />
                                        )}
                                    </IconButton>
                                </DrawerHeader>
                            </Box>
                        </DrawerHeader>
                        <Box
                            className={'boxImageListLayout'}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '35px'
                            }}
                        >
                            <Typography variant='h4' sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}>Unitri</Typography>
                        </Box>
                        <Link
                            href="/panel"
                            sx={{ color: '#fff', textDecoration: 'none' }}
                        >
                            <ListItemButton>
                                <ListItemIcon sx={{ color: '#fff' }}>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </Link>

                        <ListItemButton
                            onClick={() => {
                                handleClick('users')
                            }}
                        >
                            <ListItemIcon sx={{ color: '#fff' }}>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText className="conteudoMenu" primary="Pacientes" />
                            {openSubMenu.users ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                        <Collapse in={openSubMenu.users} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link
                                    href="/panel/pacientes/cadastroUsers"
                                    sx={{ color: '#fff', textDecoration: 'none' }}
                                >
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon sx={{ color: '#fff' }}>
                                            <PersonAddAltIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Cadastro de Pacientes" />
                                    </ListItemButton>
                                </Link>
                                <Link
                                    href="/panel/pacientes/historicoUsers"
                                    sx={{ color: '#fff', textDecoration: 'none' }}
                                >
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon sx={{ color: '#fff' }}>
                                            <FolderSharedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Historico de Pacientes" />
                                    </ListItemButton>
                                </Link>
                                <Link
                                    href="/panel/pacientes/buscaUsers"
                                    sx={{ color: '#fff', textDecoration: 'none' }}
                                >
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon sx={{ color: '#fff' }}>
                                            <PersonSearchIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Buscar Paciente" />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>

                        <ListItemButton
                            onClick={() => {
                                handleClick('agendamentos')
                            }}
                        >
                            <ListItemIcon sx={{ color: '#fff' }}>
                                <EditNoteIcon />
                            </ListItemIcon>
                            <ListItemText className="conteudoMenu" primary="Agendamentos" />
                            {openSubMenu.agendamentos ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                        <Collapse in={openSubMenu.agendamentos} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link
                                    href="/panel/agendamentos/agendarConsultas"
                                    sx={{ color: '#fff', textDecoration: 'none' }}
                                >
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon sx={{ color: '#fff' }}>
                                            <LibraryAddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Agendar consulta" />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>

                        <ListItemButton
                            onClick={() => {
                                handleClick('clinicas')
                            }}
                        >
                            <ListItemIcon sx={{ color: '#fff' }}>
                                <DomainIcon />
                            </ListItemIcon>
                            <ListItemText className="conteudoMenu" primary="Clinicas" />
                            {openSubMenu.clinicas ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </ListItemButton>
                        <Collapse in={openSubMenu.clinicas} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link
                                    href="/panel/clinicas/financeiro"
                                    sx={{ color: '#fff', textDecoration: 'none' }}
                                >
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon sx={{ color: '#fff' }}>
                                            <RequestQuoteIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Financeiro" />
                                    </ListItemButton>
                                </Link>
                                <Link
                                    href="/panel/clinicas/cadastrarClinicas"
                                    sx={{ color: '#fff', textDecoration: 'none' }}
                                >
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemIcon sx={{ color: '#fff' }}>
                                            <DomainAddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Cadastrar Clínica" />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>
                        <ListItemButton onClick={handleOpenModal}>
                            <ListItemIcon sx={{ color: '#fff' }}>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sair" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            <ModalLogout setOpenModal={setOpenModal} openModal={openModal} />
        </>
    )
}
