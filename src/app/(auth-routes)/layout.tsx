'use client'
import React, { ReactNode } from 'react'
import styles from '../../styles/page.module.css'
import { Paper, Box } from '@mui/material'
import imgUnitri from '../../../public/images/logo_unitri.svg'
import login from '../../../public/images/login.svg'
import Image from 'next/image'
import theme from '@/theme'


interface IProps {
	children: ReactNode;
}

export default function AuthLayout({ children }: IProps): JSX.Element {
	return (
		<html lang="en">
			<body>
				<Box
					position="absolute"
					width="100vw"
					height="100vh"
					sx={{
						background: theme.palette.primary.main,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center'
					}}
					className={styles.loginBackground}
				/>
				<Box
					sx={{
						background: theme.palette.primary.main,
						margin: '0 auto',
						minHeight: '100vh',
						width: '100vw',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'row',
						backdropFilter: 'blur(5px) brightness(0.6)'
					}}
					className={styles.teste}
				>
					<Box
						className={styles.loginContainer}
						component={Paper}
						elevation={1}
						square
						sx={{
							backgroundColor: 'white',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							borderRadius: '15px  0px 0px 15px'
						}}
					>
						{children}
						<Box
							component="footer"
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								flexDirection: 'column',
								marginTop: 'auto',
								marginBottom: '20px',
								padding: '5px',
								width: '80%'
							}}
						>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexWrap: 'wrap',
									gap: '10%',
									width: '100%'
								}}
							>
								<Image
									src={imgUnitri}
									width={100}
									height={100}
									alt="Logotipo do Centro Universitário do Triângulo - UNITRI"
								/>
							</Box>
						</Box>
					</Box>
					<Box
						className={styles.loginImage}
						component={Paper}
						square
						elevation={1}
						style={{
							backgroundPosition: 'center',
							borderRadius: '0px  15px 15px 0px'
						}}
					>
						<Image
							src={login}
							alt="Descrição da imagem de login"
							style={{
								width: '100%',
								height: '100%',
								backgroundRepeat: 'no-repeat',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								borderRadius: '0px  15px 15px 0px'
							}}
						/>
					</Box>
				</Box>
			</body>
		</html>
	)
}
