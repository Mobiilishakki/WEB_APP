import axios from 'axios'
const baseUrl = 'http://localhost:3001/fen'

const getFenNotation = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getFenNotation }