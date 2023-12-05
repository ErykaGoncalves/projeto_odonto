interface IPeriodoProps {
    jwt: string
    periodo: string
}

export default async function periodoData({
    jwt
}: IPeriodoProps) {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API ?? '' }/periodos`

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
