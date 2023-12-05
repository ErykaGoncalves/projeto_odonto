interface IHistoricoUsersProps {
    jwt: string
    info: string
}

export default async function HistoricoUsersData({
    jwt,
    info
}: IHistoricoUsersProps) {
    try {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${jwt}`)

        const requestOptions: RequestInit = {
            method: 'GET',
            headers,
            redirect: 'follow',
            cache: 'no-cache'
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API ?? ''
            }/historico-paciente?info=${info}`

        const data = await fetch(apiUrl, requestOptions)
        const jsonData = await data.json()
        return jsonData
    } catch (e: any) {
        return null
    }
}
