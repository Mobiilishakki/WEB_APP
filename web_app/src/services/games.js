import axios from 'axios'
//const baseUrl = 'http://localhost:3001'
//const baseUrl = 'http://94.237.117.223/state'
const baseUrl = '/state'   // dev settings

// GET current fen notation from the server
const getFenNotation = () => {
  //const id = Math.floor(Math.random() * 6) + 1  // EDIT THIS!!!
  //const request = axios.get(`${baseUrl}/fens/${id}`)
  const request = axios.get(`${baseUrl}`)
  return request.then(response => response.data.state)
}

// POST to server that player has done his/her move
const postMoveDone = () => {
  console.log("ERROR: Not implmented")
}

export default { getFenNotation }