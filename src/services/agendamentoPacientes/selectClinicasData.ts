interface IAlunPeriodoProps {
    jwt: string
    nome_clinica: string
}

export default async function SelectClinicasData({
    jwt,
}: IAlunPeriodoProps) {
    try {
        const headers = new Headers()
        headers.append('Authorization', `Bearer ${jwt}`)

        const requestOptions: RequestInit = {
            method: 'GET',
            headers,
            redirect: 'follow',
            cache: 'no-cache'
        }
        const apiUrl = 'http://localhost:3001/clinicas'
        /**const apiUrl = `${process.env.NEXT_PUBLIC_API ?? '' }/clinicas` */
        const data = await fetch(apiUrl, requestOptions)
        const jsonData = await data.json()
        return jsonData
    } catch (e: any) {
        return null
    }
}
