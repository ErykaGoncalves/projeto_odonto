interface IHomeProps {
  jwt: string
}

export default async function homeData({
  jwt
}: IHomeProps) {
  try {
    const apiUrl = 'http://localhost:3001/procedimentos'

    console.log(apiUrl)
    const headers = new Headers()
    headers.append('Authorization', `Bearer ${jwt}`)

    console.log(apiUrl)
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
