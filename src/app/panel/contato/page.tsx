'use client'
import React from 'react'
import styles from '../../../styles/page.module.css'
import { Paper, Box } from '@mui/material'
import FAQ from '../../../../public/images/FAQ.svg'
import Image from 'next/image'
import FormContato from './components/FormContato'

export default function AuthLayout(): JSX.Element {
  return (
    <Box
      className={styles.contatoImage}
      component={Paper}
      sx={{
        backgroundImage: `url(${FAQ.src})`,
        backgroundPosition: 'center',
        alignItems: 'center',
        height: '90vh',
        webkitBackdropFilter: 'blur(5px)',
        backdropFilter: 'blur(5px)'
      }}
    >
      <FormContato />
    </Box>
  )
}
