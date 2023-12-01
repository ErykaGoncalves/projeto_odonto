import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ICredentialsValue } from "@/types/next-auth";

const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 4 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        cod_user: { label: "cod_user", type: "text", placeholder: "Digite seu código de usuário" },
        password: { label: "Password", type: "password", placeholder: "Digite sua senha" }
      },

      async authorize(credentials: Record<"cod_user" | "password", string> | undefined): Promise<any> {
        const { jwt } = credentials as ICredentialsValue
        try {
          if (!credentials) {
            throw new Error('Credenciais não fornecidas');
          }
          const response = await fetch(`${process.env.NEXTAUTH_URL ?? ''}/login`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              cod_user: credentials.cod_user,
              password: credentials.password
            })
          });

          if (!response.ok) {
            throw new Error('Credenciais inválidas');
          }

          const user = await response.json();

          return user;
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
