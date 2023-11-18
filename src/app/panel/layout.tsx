'use client'
import * as React from 'react'
import Box from '@mui/material/Box'
import MenuSystem from './components/MenuSystem'
import { useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import * as material from '@mui/material'

const Main = material.styled('main', {
  shouldForwardProp: prop => prop !== 'open'
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  position: 'relative',
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

export default function LayoutPanel({ children }: any): JSX.Element {
  const [open] = useState(true)
  const isMobile = useMediaQuery('(max-width:1250px)')
  const [openSideMenu, setSideOpenMenu] = useState(false)

  useEffect(() => {
    setSideOpenMenu(!isMobile)
  }, [isMobile])


  return (
    <>
      <Main open={open}>
        <MenuSystem
          setSideOpenMenu={setSideOpenMenu}
          openSideMenu={openSideMenu}
        />
        <Box
          height="100vh"
          marginLeft={openSideMenu && !isMobile ? '250px' : '0'}
          sx={{ transition: 'all 0.2s', overflow: 'auto', background: '#F9F9F9' }}
        >
          <Box
            className="conteudoLayout"
            sx={{
              width: '100%',
              background: '#F9F9F9',
              color: '#000'
            }}
          >
            <Header
              openSideMenu={openSideMenu}
              setSideOpenMenu={setSideOpenMenu}
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 9999
              }}
            />
            <Box>{children}</Box>
          </Box>
        </Box>
      </Main>
    </>
  )
}