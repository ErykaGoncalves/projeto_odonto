import NextAuth from 'next-auth'

export interface ICredentialsValue {
	cod_user: string
	password: string
	jwt: string
}

declare module 'next-auth' {
	interface Session {
		jwt: string
		results: SessionResult
	}
}

interface User {
	id: string
	codUser: string
	name: string
}
