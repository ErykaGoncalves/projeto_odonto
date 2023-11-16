import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			codUser: string
			name: string
		}
	}
}