interface IHistoricoProps {
    jwt: string
    id_clinica: number
}

export default async function HistoricoClinicasData({
    jwt,
    id_clinica
}: IHistoricoProps) {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API ?? ''
            }/historico-clinica?id_clinica=${id_clinica}`

        const headers = new Headers()
        headers.append('Authorization', `Bearer ${jwt}`)

        const requestOptions: RequestInit = {
            method: 'GET',
            headers,
            redirect: 'follow',
            cache: 'no-cache'
        }

        const data = await fetch(apiUrl, requestOptions)
        const jsonData = await data.json()
        return jsonData
    } catch (e: any) {
        return null
    }
}
