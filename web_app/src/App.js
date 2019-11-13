import React, { useState, useEffect, useRef } from 'react';
import gameService from './services/games';
import Chessboard from './components/Chessboard';
import './App.css';

// general button component
// takes onclick function and button text as parameters
const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

// component for fen notation
// takes content (fen notation as string) as parameter
const Fen = ({ content }) => {
  return (
    <div>
      <textarea value={content} rows={3} cols={50} readOnly={true} />
    </div>
  )
}

// actual web-app component
// connects to backend server and retrieves game state infomarion
const App = () => {
  const [fenNotation, setFenNotation] = useState('')      // fen notation of game state      
  const [gameOn, setGameOn] = useState(false)             // is the game on or not
  const [playerColor, setPlayerColor] = useState('black') // player color (white or black)
  const interval = useRef()                               // information about loop (id)

  const updateFromServer = () => { // looping function
    gameService
      .getFenNotation()
      .then(notation => {
        setFenNotation(notation)
      })
      .catch(error => { 
        setFenNotation("Could not retrieve FEN notation")
      })
  }

  useEffect(() => { // do this when gamestate changes between on or off 
    if (gameOn) {
      updateFromServer()
      const id = setInterval(updateFromServer, 2500)
      interval.current = id
    } else {
      setFenNotation('')
      clearInterval(interval.current)
    }
  }, [gameOn, interval])

  return (  // component structure (HTML like)
    <div className="App">
      <h1>Mobiilishakki</h1>
      <Button onClick={() => setGameOn(!gameOn)} text={gameOn ? 'Disconnect' : 'Connect'} />
      <h3>FEN</h3>
      <Fen content={fenNotation} />
      <h3>Gamestate</h3>
      <Button onClick={() => setPlayerColor(playerColor === "black" ? "white" : "black")} text={"Change player view"} />
      <Chessboard playerColor={playerColor} fen={fenNotation} />
    </div>
  );
}

// export the application component
export default App;
