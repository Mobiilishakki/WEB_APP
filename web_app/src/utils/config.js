let PORT = process.env.REACT_APP_PORT
let BACKEND_URI = process.env.REACT_APP_BACKEND_URI_PROD

// for development and testing
if (process.env.NODE_ENV !== 'production') {
  BACKEND_URI = process.env.REACT_APP_BACKEND_URI_TEST
}

module.exports = {
  PORT,
  BACKEND_URI
}