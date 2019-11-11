import React from 'react'
import './Chessboard.css'

// array containing pieces information from a1 to h8
const PIECES = Array(64).fill('')

// function takes fen notation as input and
// fills the pieces array with pieces information.
const parseFenNotation = (fen) => {
  let square = 0
  for (let i = 0; i < fen.length; i++) {
    if (square >= 64) {
      break
    }
    let c = fen.charAt(i)
    if (c === '/') { // next line
      continue
    } else if (c >= '0' && c <= '9') {  // number of empty squares
      const blanks = parseInt(c)
      square = square + blanks - 1
    } else { // actual chess piece
      PIECES[square] = c
    }
    square = square + 1
  }
}

// single chessboard square. 
// takes row number, column number and color of the square as parameters
const ChessboardSquare = ({ row, col, color }) => {
  const piece = (row - 1) * 8 + col - 1 // index of the piece
  if (color === 'white') {
    return (
      <td className="light">{PIECES[piece]}</td>
    )
  }
  return (
    <td className="dark">{PIECES[piece]}</td>
  )
}

// chessboard row (8 chessboard squares).
// takes the rownumber as first parameter
// takes the color ("black", "white") of first square as 2nd parameter.
const ChessboardRow = ({ rowNum, color }) => {
  const otherColor = color === "white" ? "black" : "white"
  return (
    <tr>
      <th>{rowNum}</th>
      <ChessboardSquare row={rowNum} col={1} color={color} />
      <ChessboardSquare row={rowNum} col={2} color={otherColor} />
      <ChessboardSquare row={rowNum} col={3} color={color} />
      <ChessboardSquare row={rowNum} col={4} color={otherColor} />
      <ChessboardSquare row={rowNum} col={5} color={color} />
      <ChessboardSquare row={rowNum} col={6} color={otherColor} />
      <ChessboardSquare row={rowNum} col={7} color={color} />
      <ChessboardSquare row={rowNum} col={8} color={otherColor} />
    </tr>
  )
}

// chessboard alphabetic top axis
const TopAxis = () => {
  return (
    <tr>
      <th></th>
      <th>a</th>
      <th>b</th>
      <th>c</th>
      <th>d</th>
      <th>e</th>
      <th>f</th>
      <th>g</th>
      <th>h</th>
    </tr>
  )
}

// chessboard component
// takes fen notation and player color (white, black) as parameters
const Chessboard = ({ playerColor, fen }) => {
  parseFenNotation(fen) // maybe use-effect?
  const rownums = playerColor === "black" ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1]
  const enemyColor = playerColor === "black" ? "white" : "black"
  return (
    <table>
      <tbody>
        <TopAxis />
        <ChessboardRow rowNum={rownums[0]} color={playerColor} />
        <ChessboardRow rowNum={rownums[1]} color={enemyColor} />
        <ChessboardRow rowNum={rownums[2]} color={playerColor} />
        <ChessboardRow rowNum={rownums[3]} color={enemyColor} />
        <ChessboardRow rowNum={rownums[4]} color={playerColor} />
        <ChessboardRow rowNum={rownums[5]} color={enemyColor} />
        <ChessboardRow rowNum={rownums[6]} color={playerColor} />
        <ChessboardRow rowNum={rownums[7]} color={enemyColor} />
      </tbody>
    </table>
  )
}

export default Chessboard;