import { ICadastroClinicaResponse } from '@/types/cadastroClinica';

interface ICadastroClinicaProps {
  periodo: string;
  turno: string;
  id_procedimento?: string
  jwt: string;
}


export default async function cadastroClinicaData({
  periodo,
  turno,
  id_procedimento,
  jwt,
}: ICadastroClinicaProps): Promise<ICadastroClinicaResponse | null> {
  try {
    const apiUrl = 'http://localhost:3001/clinica';
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        periodo,
        turno,
        id_procedimento,
      }),
      redirect: 'follow',
      cache: 'no-cache',
    };

    const data = await fetch(apiUrl, requestOptions);
    const jsonData: ICadastroClinicaResponse = await data.json();
    return jsonData;
  } catch (e: any) {
    return null;
  }
}
