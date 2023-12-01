interface IClinicaAllProps {
    jwt: string
}

export default async function clinicasAllData({
    jwt
}: IClinicaAllProps) {
    try {
        const apiUrl = 'http://localhost:3001/clinicas-all'

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
