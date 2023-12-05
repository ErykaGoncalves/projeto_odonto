import { IAgendamentoResponse } from '@/types/agendamentoPaciente';

interface ICadastroClinicaProps {
    nome_clinica: string | undefined;
    horario_consulta: string | undefined;
    paciente_id: string | undefined;
    aluno_id: string | undefined;
    jwt: string;
}

export default async function agendarConsultaData({
    nome_clinica,
    horario_consulta,
    paciente_id,
    aluno_id,
    jwt,
}: ICadastroClinicaProps): Promise<IAgendamentoResponse | null> {
    try {
        /*const apiUrl = `${process.env.NEXT_PUBLIC_API ?? '' }/clinica`*/
        const apiUrl = 'http://localhost:3001/agendamento'

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
            body: JSON.stringify({
                nome_clinica,
                horario_consulta,
                paciente_id,
                aluno_id,
            }),
            redirect: 'follow',
            cache: 'no-cache',
        };

        const data = await fetch(apiUrl, requestOptions);
        const jsonData: IAgendamentoResponse = await data.json();
        return jsonData;
    } catch (e: any) {
        return null;
    }
}
