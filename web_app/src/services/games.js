import axios from 'axios'
//const baseUrl = 'http://localhost:3001'
const baseUrl = 'http://94.237.117.223/state'

const getFenNotation = () => {
  //const id = Math.floor(Math.random() * 6) + 1  // EDIT THIS!!!
  //const request = axios.get(`${baseUrl}/fens/${id}`)
  const request = axios.get(`${baseUrl}`)
  return request.then(response => {
    return response.data.state
  })
}

export default { getFenNotation }