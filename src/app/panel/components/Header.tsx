'use client'
import React, { useEffect, useState } from 'react'
import MuiAppBar, {
    type AppBarProps as MuiAppBarProps
} from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import MenuIcon from '@mui/icons-material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import styles from '../../../styles/page.module.css'
import theme from '@/theme'
import {
    IconButton,
    Menu,
    MenuItem,
    Skeleton,
    Toolbar,
    Tooltip,
    Typography,
    styled,
} from '@mui/material'
import { Logout } from '@mui/icons-material'
import ModalLogout from './ModalLogout'
import { useSession } from "next-auth/react"

const drawerWidth = 250

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}))

export default function HeaderLayout({
    openSideMenu,
    setSideOpenMenu
}: any): JSX.Element {
    const session = useSession();
    const [openModal, setOpenModal] = React.useState(false);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openUserBtn = Boolean(anchorEl);
    const [nomeFun, setNomeFun] = useState<string | undefined>(undefined);
    const handleClickUserBtn = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserBtn = (): void => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = (): void => {
        setSideOpenMenu(() => true);
    };

    const handleOpenModal = (): void => {
        setOpenModal(true);
    };

    useEffect(() => {
        if (isMobile) {
            setSideOpenMenu(false);
        }
    }, [isMobile, setSideOpenMenu]);

    useEffect(() => {
        if (session.status === 'authenticated') {
            const formatedName: string =
                session.data.results[0].nome.split(' ')[0] ?? ''
            setNomeFun(
                () =>
                    formatedName.charAt(0).toUpperCase() +
                    formatedName.slice(1).toLocaleLowerCase()
            )
        }
    }, [session])
    return (
        <>
            <AppBar
                className={styles.headerLayout}
                sx={{
                    padding: 0,
                    width: '100%',
                    height: 'auto',
                    position: 'relative',
                    color: '#000',
                    background: '#fff',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    marginTop: '5px'
                }}
                elevation={0}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            mr: 2,
                            ...(openSideMenu && {
                                display: 'none'
                            })
                        }}
                    >
                        <MenuIcon sx={{ padding: '0px', margin: '0px' }} />
                    </IconButton>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: isMobile ? 'end' : 'space-between',
                        }}
                    >
                        {nomeFun === '' ? (
                            <Skeleton
                                variant="rounded"
                                width={150}
                                height={32}
                                sx={{
                                    mb: '8px',
                                    display: isMobile ? 'none' : 'block'
                                }}
                            />
                        ) : (
                            <Typography
                                variant="h6"
                                component="h2"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                    color: theme.palette.primary.main,
                                    display: isMobile ? 'none' : 'block'
                                }}
                            >
                                Olá, {nomeFun} !
                            </Typography>
                        )}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title="Meus dados">
                                <IconButton
                                    onClick={handleClickUserBtn}
                                    size="small"
                                    aria-controls={openUserBtn ? 'account-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openUserBtn ? 'true' : undefined}
                                >
                                    <Avatar
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            bgcolor: 'secondary.main',
                                            textAlign: 'end',
                                        }}
                                    >
                                        {session.data?.results[0].nome[0]}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={openUserBtn}
                            onClose={handleCloseUserBtn}
                            onClick={handleCloseUserBtn}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 0px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    color: '#000',
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0
                                    }
                                }
                            }}
                            transformOrigin={{
                                horizontal: 'right',
                                vertical: 'top'
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                            }}
                        >
                            <MenuItem onClick={handleOpenModal}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Sair
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar >
            <ModalLogout setOpenModal={setOpenModal} openModal={openModal} />
        </>
    )
}
