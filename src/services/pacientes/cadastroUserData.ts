import { ICadastroUserResponse } from '@/types/cadastroUser';

interface ICadastroProps {
  email: string;
  endereco: string;
  telefone: string;
  dataNasc: string;
  cpf: string;
  nome: string;
  jwt: string;
}

export default async function cadastroUserData({
  email,
  endereco,
  telefone,
  dataNasc,
  cpf,
  nome,
  jwt,
}: ICadastroProps): Promise<ICadastroUserResponse | null> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API ?? ''}/user`

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${jwt}`);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email,
        endereco,
        telefone,
        data_nasc: dataNasc,
        cpf,
        nome,
      }),
      redirect: 'follow',
      cache: 'no-cache',
    };

    const data = await fetch(apiUrl, requestOptions);
    const jsonData: ICadastroUserResponse = await data.json();
    return jsonData;
  } catch (e: any) {
    return null;
  }
}
