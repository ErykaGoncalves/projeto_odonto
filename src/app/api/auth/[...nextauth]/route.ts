import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ICredentialsValue } from "@/types/next-auth";

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},

			async authorize(credentials, req) {
				try {
					const { cod_user, password } = credentials as ICredentialsValue;

					const response = await fetch('http://localhost:3001/login', {
						method: 'POST',
						headers: {
							'Content-type': 'application/json'
						},
						body: JSON.stringify({
							username: cod_user,
							password: password
						})
					});

					console.log(response)

					if (response.ok) {
						const user = await response.json();
						return user;
					} else {
						const errorMessage = await response.text();
						console.error('Erro na autenticação:', errorMessage);
						return null;
					}
				} catch (error) {
					console.error('Erro na requisição:', error);
					return null;
				}
			},
		})
	],
	pages: {
		signIn: '/'
	},
	callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }) {
			session = token.user as any;
			return session;
		}
	}
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
