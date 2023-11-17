'use client'
import { getSession, useSession } from "next-auth/react";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonLogout from "@/components/ButtonLogout";

export default function Admin() {
  // Obtém a sessão
  const session = useSession();

  // Verifica se a sessão e session.data estão definidos
  if (!session || !session.data) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-8">Carregando...</h1>
      </div>
    );
  }

  // Verifica se session.data.user está definido
  if (!session.data.user) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-8">Usuário não encontrado.</h1>
      </div>
    );
  }

  // Agora você pode acessar session.data.user.name com segurança
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-8">Olá, {session.data.user.name}. Bem vindo(a)!</h1>
      <ButtonLogout />
    </div>
  );
}