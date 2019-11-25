import axios from 'axios'
import config from '../utils/config'

// GET current fen notation from the server
const getFenNotation = () => {
  const request = axios.get(`${config.BACKEND_URI}/state`)
  return request.then(response => response.data.state)
}

// POST to server that player has done his/her move
const postMoveDone = () => {
  console.log("ERROR: Not implmented")
}

export default { getFenNotation }