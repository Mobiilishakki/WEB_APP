import axios from 'axios'
const baseUrl = 'http://localhost:3001/fens'

const getFenNotation = () => {
  const id = Math.floor(Math.random() * 6) + 1  // EDIT THIS!!!
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data.fen)
}

export default { getFenNotation }