interface IHomeProps {
  jwt: string
}

export default async function homeData({
  jwt
}: IHomeProps) {
  try {
    const apiUrl = 'http://localhost:3001/procedimentos'

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
