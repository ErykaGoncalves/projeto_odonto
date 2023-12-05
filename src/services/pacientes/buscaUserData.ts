interface IBuscaUsersProps {
    jwt: string
    info: string
}

export default async function BuscaUsersData({
    jwt,
    info
}: IBuscaUsersProps) {
    try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API ?? ''
            }/get-user?info=${info}`

        const headers = new Headers()
        headers.append('Authorization', `Bearer ${jwt}`)

        const requestOptions: RequestInit = {
            method: 'GET',
            headers,
            redirect: 'follow',
            cache: 'no-cache'
        }
        console.log(apiUrl)

        const data = await fetch(apiUrl, requestOptions)
        const jsonData = await data.json()
        return jsonData
    } catch (e: any) {
        return null
    }
}
