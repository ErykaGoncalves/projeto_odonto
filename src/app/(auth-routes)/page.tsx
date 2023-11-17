'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function HomeAuth() {
  const router = useRouter();
  const [codUser, setCodUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      // Faça a solicitação de login usando as credenciais fornecidas
      const response = await signIn('credentials', {
        redirect: false,
        cod_user: codUser,
        password: password
      });

      if (response?.error) {
        console.log('[LOGIN_RESPONSE]: ', response);
        return;
      }

      router.replace('/panel');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-3xl mb-6">Login</h1>
      <form className="w-[400px] flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="text"
          name="cod_user"
          placeholder="Digite seu código de usuário"
          onChange={(e) => setCodUser(e.target.value)}
        />

        <input
          className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="h-12 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
