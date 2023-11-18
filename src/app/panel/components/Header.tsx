/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useEffect } from 'react'
import MuiAppBar, {
    type AppBarProps as MuiAppBarProps
} from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import MenuIcon from '@mui/icons-material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
// import { useSession } from 'next-auth/react'
import styles from '../../../styles/page.module.css'
import theme from '@/theme'
import {
    IconButton,
    Link,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    styled,
} from '@mui/material'
import { Logout } from '@mui/icons-material'
import ModalLogout from './ModalLogout'

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
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openUserBtn = Boolean(anchorEl)
    const handleClickUserBtn = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseUserBtn = (): void => {
        setAnchorEl(null)
    }
    const handleDrawerOpen = (): void => {
        setSideOpenMenu(() => true)
    }

    const [openModal, setOpenModal] = React.useState(false)
    const handleOpenModal = (): void => {
        setOpenModal(true)
    }

    //   const session = useSession()
    //   const primeiroCaractereNome = session?.data?.user?.result?.dados[0].nome[0]

    useEffect(() => {
        if (isMobile) {
            setSideOpenMenu(false)
        }
    }, [isMobile])

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
                            Olá, funcionário(a)
                        </Typography>
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
                                        {/* {primeiroCaractereNome} */}
                                        A
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
