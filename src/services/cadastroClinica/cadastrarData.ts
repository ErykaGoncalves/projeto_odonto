import { ICadastroClinicaResponse } from '@/types/cadastroClinica';

interface ICadastroClinicaProps {
  nome: string | undefined;
  periodo: string | undefined;
  turno: string | undefined;
  jwt: string;
}

export default async function cadastroClinicaData({
  periodo,
  turno,
  nome,
  jwt,
}: ICadastroClinicaProps): Promise<ICadastroClinicaResponse | null> {
  try {
    const apiUrl = `http://odonto-unitri.ddns.net/odonto/clinica`

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        periodo,
        turno,
        nome,
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
