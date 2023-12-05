interface IAtualizarUsersProps {
    id: number;
    nome: string;
    cpf: string;
    data_nasc: string;
    email: string;
    telefone: string;
    endereco: string;
    jwt: string;
}

export default async function AtualizarUsersData({
    id,
    nome,
    cpf,
    data_nasc,
    email,
    telefone,
    endereco,
    jwt,
}: IAtualizarUsersProps) {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API ?? ''
            }/update-paciente?id=${id}`
            
        const headers = new Headers();
        headers.append('Authorization', `Bearer ${jwt}`);

        const requestOptions: RequestInit = {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                nome,
                cpf,
                data_nasc: data_nasc,
                email,
                telefone,
                endereco,
            }),
            redirect: 'follow',
            cache: 'no-cache',
        };
        console.log('api: ' + apiUrl)
        console.log('Dados enviados para o servidor:', requestOptions.body);

        const data = await fetch(apiUrl, requestOptions);
        const jsonData = await data.json();
        return jsonData;
    } catch (e: any) {
        return null;
    }
}