'use client'

import theme from "@/theme"
import { Button } from "@mui/material"
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function ButtonLogout() {
	const router = useRouter()

	async function logout() {
		await signOut({
			redirect: false
		})

		router.replace('/')
	}

	return (
		<Button
			variant="contained"
			sx={{ mt: 1, background: theme.palette.primary.main }}
			onClick={logout}
		>
			Sim, quero sair
		</Button>
	)
}