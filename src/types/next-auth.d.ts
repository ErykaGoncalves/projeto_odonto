import NextAuth from 'next-auth'

export interface ICredentialsValue {
	codUser: string,
	password: string
  }

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			codUser: string
			name: string
		}
	}
}