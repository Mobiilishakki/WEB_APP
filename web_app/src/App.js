import React, { useState, useEffect } from 'react';
import gameService from './services/games';
import Chessboard from './components/chessboard/Chessboard';
import './App.css';
import Clock from './components/clock/Clock';

// global variables for chess game
const TIMELIMIT = { minutes: 25, seconds: 0 }
const WHITE = "white"
const BLACK = "black"


// actual web-app component
// connects to backend server and retrieves game state information
// also send notification to server that piece has moved on board
const App = () => {
  const [fenNotation, setFenNotation] = useState('')        // fen notation of game state      
  const [gameIsActive, setGameIsActive] = useState(false)   // is the game on or not
  const [playerColor, setPlayerColor] = useState(WHITE)   // player color (white or black)
  const [timerWhite, setTimerWhite] = useState(TIMELIMIT)   // player time starts from 25 min
  const [timerBlack, setTimerBlack] = useState(TIMELIMIT)   // time should be polled from server
  const [timer, setTimer] = useState(0)                     // used to count time between moves
  const [turn, setTurn] = useState(WHITE)                 // tells which players turn is it

  // function for polling fen-notation from server
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
    if (gameIsActive) {
      gameService.postMoveDone()
      setTurn(turn === WHITE ? BLACK : WHITE)
    }
  }

  // function to countdown remaining time
  const countdown = () => {
    let minutes = turn === WHITE ? timerWhite.minutes : timerBlack.minutes
    let seconds = turn === WHITE ? timerWhite.seconds : timerBlack.seconds
    seconds = seconds - 1
    if (seconds < 0) {
      minutes = minutes - 1
      seconds = 59
    }
    if (turn === WHITE) {
      setTimerWhite({ minutes, seconds })
    } else {
      setTimerBlack({ minutes, seconds })
    }
  }

  // useEffect to loop fen-notation from server
  useEffect(() => {
    let interval = null
    if (gameIsActive) {
      updateFromServer()
      interval = setInterval(updateFromServer, 2500)
    } else {
      setFenNotation('')
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [gameIsActive])

  // useEffect for timer
  useEffect(() => {
    let interval = null
    if (gameIsActive) {
      countdown()
      interval = setInterval(() => {
        setTimer(timer => timer + 1)
      }, 1000)
    } else {
      setTimerWhite(TIMELIMIT)
      setTimerBlack(TIMELIMIT)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [gameIsActive, timer])

  // connect to game or disconnect from existing game
  const handleGameActivation = () => {
    setGameIsActive(!gameIsActive)
    if (!gameIsActive) {
      setTurn(WHITE)
    }
  }

  // application layout structure
  return (
    <div className="App">
      <h1>Mobiilishakki</h1>
      <div className="menubar">
        <button onClick={handleGameActivation}>
          {gameIsActive ? 'Disconnect from server' : 'Connect to server'}
        </button>
        <button onClick={() => setPlayerColor(playerColor === BLACK ? WHITE : BLACK)}>
          {"Change player view"}
        </button>
      </div>
      <h3>Gamestate</h3>
      <Clock timerWhite={timerWhite} timerBlack={timerBlack} />
      <button onClick={notifyServer}>Finish your move</button>
      <Chessboard playerColor={playerColor} fen={fenNotation} />
    </div>
  )
}

// export the application component
export default App;
