import React, { useState, useEffect, useRef } from 'react';
import gameService from './services/games';
import Chessboard from './components/chessboard/Chessboard';
import './App.css';
import Clock from './components/Clock';

// general button component
// takes onclick function and button text as parameters
const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
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
        setFenNotation("FAIL")
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
      <h3>Gamestate</h3>
      <Clock />
      <Button text="Finnish move" />
      <Chessboard playerColor={playerColor} fen={fenNotation} />
      <Button onClick={() => setPlayerColor(playerColor === "black" ? "white" : "black")} text={"Change player view"} />
    </div>
  );
}

// export the application component
export default App;
