interface IBuscarPacientesProps {
    jwt: string
    info: string
}

export default async function BuscarPacienteData({
    jwt,
    info
}: IBuscarPacientesProps) {
    try {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${jwt}`)

        const requestOptions: RequestInit = {
            method: 'GET',
            headers,
            redirect: 'follow',
            cache: 'no-cache'
        }
        const apiUrl = `http://localhost:3001/get-user?info=${info}`
        /*const apiUrl = `${process.env.NEXT_PUBLIC_API ?? '' }/get-user?info=${info}`*/
        console.log(apiUrl)

        const data = await fetch(apiUrl, requestOptions)
        const jsonData = await data.json()
        return jsonData
    } catch (e: any) {
        return null
    }
}
