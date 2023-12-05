interface IProcedimentoProps {
    jwt: string;
    nome: string;
  }  

export default async function ProcedimentoData({
    jwt
}: IProcedimentoProps) {
    try {
        const apiUrl = `http://odonto-unitri.ddns.net/odonto/procedimentos`
        
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
