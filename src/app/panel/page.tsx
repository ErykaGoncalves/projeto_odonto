'use client'

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import homeData from "@/services/home/homeData";
import ButtonLogout from "@/components/ButtonLogout";


export default function PagePanel(): JSX.Element {
  const { data: session, status } = useSession();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === "authenticated") {
          const result = await homeData({ jwt: session?.jwt });
          setData(result);
        }
      } catch (error) {
        console.error("Erro ao obter os dados:", error);
        // setError(error);
      }
    };

    fetchData();
  }, [session, status]);

  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  if (status !== "authenticated" || !session?.results?.[0]) {
    return <div>Informações do usuário não encontradas.</div>;
  }

  return (
    <>
      <div>
        Olá, {session.results[0].nome}. Bem-vindo(a)!
      </div>

      {data && (
        <div>
          <h2>Dados de homeData:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
      <ButtonLogout />
    </>
  );
}
