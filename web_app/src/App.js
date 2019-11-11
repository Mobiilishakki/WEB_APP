import React, { useState, useEffect } from 'react';
import gameService from './services/games';
import Chessboard from './components/Chessboard';
import './App.css';

const Button = ({ onClick, text }) => {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  )
}

const FENTextArea = ({ content, rows, cols, readOnly }) => {
  return (
    <div>
      <textarea value={content} rows={rows} cols={cols} readOnly={readOnly} />
    </div>
  )
}

const App = () => {
  const [fenNotation, setFenNotation] = useState('')      // fen notation of game state      
  const [gameOn, setGameOn] = useState(false)             // is the game on or not
  const [playerColor, setPlayerColor] = useState('black') // player color (white or black)

  const changeGameState = () => { // set game to on or off
    setGameOn(!gameOn)
    // CHANGE THIS !!!
    setFenNotation(gameOn === true ? "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" : '')
  }

  const changePlayerColor = () => { // change player color to white or black
    setPlayerColor(playerColor === "black" ? "white" : "black")
  }

  return (
    <div className="App">
      <h1>Mobiilishakki</h1>
      <Button onClick={changeGameState} text={gameOn ? 'Disconnect' : 'Connect'} />
      <h3>FEN</h3>
      <FENTextArea content="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR" rows={5} cols={50} readOnly={true} />
      <h3>Gamestate</h3>
      <Button onClick={changePlayerColor} text={"Change player view"} />
      <Chessboard playerColor={playerColor} fen={fenNotation} />
    </div>
  );
}

export default App;
