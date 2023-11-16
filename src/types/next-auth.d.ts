import NextAuth from 'next-auth'

export interface ICredentialsValue {
	cod_user: string,
	password: string
	jwt: string
  }

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			cod_user: string
			name: string
		}
	}
}