'use client'
import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Theme from '../theme'
import Image from 'next/image'
import imgAsoec from '../../public/images/notFound.svg'

export default function NotFound(): JSX.Element {
  return (
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        background: '#F9F9F9',
        width: '100vw',
        height: '100vh'
      }}
    >
      <Typography
        component="div"
        sx={{
          fontSize: 'h6.fontSize',
          background: Theme.palette.primary.main,
          color: '#fff',
          textAlign: 'center',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          padding: '1.5rem 0'
        }}
      >
        Oops! página não encontrada
      </Typography>
      <Box
        className={'conteudo'}
        sx={{
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}
      >
        <Box>
          <Image
            src={imgAsoec}
            width={500}
            height={500}
            alt="Not-Found"
          />
        </Box>
        <Button
          variant='contained'
          href="/"
          sx={{
            background: Theme.palette.primary.main,
            color: '#fff',
            ':hover': {
              background: Theme.palette.primary.dark
            },
            padding: '1rem 1rem'
          }}
        >
          Volte para a página principal
        </Button>
      </Box>
    </Box>
  )
}
