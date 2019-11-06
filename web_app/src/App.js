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

const LastMoveText = ({text}) => {
  return (
    <div>
      <p><strong>{text}</strong></p>
    </div>
  )
}

const App = () => {
  const [fenNotation, setFenNotation] = useState('')  // fen notation of game state
  const [lastMove, setLastMove] = useState('')        // last move of current game        
  const [gameOn, setGameOn] = useState(false)         // is the game on or not

  const changeGameState = () => { // set game to on or off
    setGameOn(!gameOn)
  }

  return (
    <div className="App">
      <h1>Mobiilishakki</h1>
      <Button onClick={changeGameState} text={gameOn ? 'Disconnect' : 'Connect'}></Button>
      <h3>FEN-notaatio</h3>
      <FENTextArea content="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" rows={5} cols={50} readOnly={true} />
      <h3>Viimeisin siirto</h3>
      <LastMoveText text="Valkoinen Ratsu: From B1 To A3"/>
      <h3>Pelitilanne</h3>
      <Chessboard />
    </div>
  );
}

export default App;
