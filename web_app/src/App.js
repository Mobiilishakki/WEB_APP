import React, { useState, useEffect, useRef } from 'react';
import gameService from './services/games';
import Chessboard from './components/chessboard/Chessboard';
import './App.css';
import Clock from './components/clock/Clock';

const GAMETIME = { minutes: 25, seconds: 0 }

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
  const [fenNotation, setFenNotation] = useState('')        // fen notation of game state      
  const [gameOn, setGameOn] = useState(false)               // is the game on or not
  const [playerColor, setPlayerColor] = useState('white')   // player color (white or black)
  const [timerWhite, setTimerWhite] = useState(GAMETIME)    // player time starts from 25 min
  const [timerBlack, setTimerBlack] = useState(GAMETIME)    // time should be polled from server
  const interval = useRef()                                 // information about loop (id)

  // function for polling fen notation from server
  const updateFromServer = () => {
    gameService
      .getFenNotation()
      .then(notation => {
        setFenNotation(notation)
      })
      .catch(error => {
        setFenNotation("FAIL")
      })
  }

  // function to notify server that move has been made
  const notifyServer = () => {
    gameService
      .postMoveDone()
  }

  // function to be called when gamestate changes from on to off
  useEffect(() => {
    if (gameOn) {
      updateFromServer()
      const id = setInterval(updateFromServer, 2500)
      interval.current = id
    } else {
      setFenNotation('')
      setTimerWhite(GAMETIME)
      setTimerBlack(GAMETIME)
      clearInterval(interval.current)
    }
  }, [gameOn, interval])

  // component structure
  return (
    <div className="App">
      <h1>Mobiilishakki</h1>
      <div className="menubar">
        <Button onClick={() => setGameOn(!gameOn)} text={gameOn ? 'Disconnect from server' : 'Connect to server'} />
        <Button onClick={() => setPlayerColor(playerColor === "black" ? "white" : "black")} text={"Change player view"} />
      </div>
      <h3>Gamestate</h3>
      <Clock timerWhite={timerWhite} timerBlack={timerBlack} />
      <Button onClick={notifyServer} text="Finish your move" />
      <Chessboard playerColor={playerColor} fen={fenNotation} />
    </div>
  );
}

// export the application component
export default App;
