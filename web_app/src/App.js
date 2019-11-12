import React, { useState, useEffect } from 'react';
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
      <textarea value={content} rows={5} cols={50} readOnly={true} />
    </div>
  )
}

// acutal web-app
// connects to backend server and retrieves game state infomarion
const App = () => {
  const [fenNotation, setFenNotation] = useState('')      // fen notation of game state      
  const [gameOn, setGameOn] = useState(false)             // is the game on or not
  const [playerColor, setPlayerColor] = useState('black') // player color (white or black)

  const updateFromServer = () => { // looping function
    if (gameOn) {
      gameService
        .getFenNotation()
        .then(notation => {
          setFenNotation(notation)
        })
        .catch(error => {
          alert("Failed to retrieve fen notation")
        })
    }else{
      setFenNotation('')
    }
  } 

  useEffect(updateFromServer, [gameOn]) // call updateFromServer when gamestate changes

  const changeGameState = () => { // set game to on or off
    setGameOn(!gameOn)
  }

  const changePlayerColor = () => { // change player color to white or black
    setPlayerColor(playerColor === "black" ? "white" : "black")
  }

  return (
    <div className="App">
      <h1>Mobiilishakki</h1>
      <Button onClick={changeGameState} text={gameOn ? 'Disconnect' : 'Connect'} />
      <h3>FEN</h3>
      <Fen content={fenNotation} />
      <h3>Gamestate</h3>
      <Button onClick={changePlayerColor} text={"Change player view"} />
      <Chessboard playerColor={playerColor} fen={fenNotation} />
    </div>
  );
}

export default App;
