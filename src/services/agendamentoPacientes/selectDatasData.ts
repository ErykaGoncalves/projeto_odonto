interface IAlunPeriodoProps {
    jwt: string
    nome_clinica: string
}

export default async function SelectDatasData({
    jwt,
    nome_clinica
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
        const apiUrl = `http://odonto-unitri.ddns.net/odonto/datas?nome_clinica=${nome_clinica}`

        console.log(apiUrl)

        const data = await fetch(apiUrl, requestOptions)
        const jsonData = await data.json()
        return jsonData
    } catch (e: any) {
        return null
    }
}
