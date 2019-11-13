import React from 'react';
import './Chessboard.css';
// import p from './p.svg';  // black pawn 
// import r from './r.svg';  // black rook
// import n from './n.svg';  // black knight
// import b from './b.svg';  // black bishop
// import q from './q.svg';  // black queen
// import k from './k.svg';  // black king
// import P from './P.svg';  // white pawn
// import R from './R.svg';  // white rook
// import N from './N.svg';  // white knight
// import B from './B.svg';  // white bishop
// import Q from './Q.svg';  // white queen
// import K from './K.svg';  // white knight

// array containing pieces information from a1 to h8
// two dimensional (row, col)
let PIECES;

// function that creates two dimeansional array
const create2DimensionalArray = (rows, cols) => {
  let array = new Array(rows)
  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols; j++) {
      array[i] = new Array(cols)
    }
  }
  return array
}

// function takes fen notation as input and
// fills the pieces array with pieces information.
const parseFenNotation = (fen) => {
  PIECES = create2DimensionalArray(8, 8)  // init 
  let col = 0
  let row = 7
  for (let i = 0; i < fen.length; i++) {
    let c = fen.charAt(i)
    if (c === '/') { // next line
      row = row - 1
      col = 0
      continue
    } else if (c >= '0' && c <= '9') {  // number of empty squares
      const blanks = parseInt(c)
      col = col + blanks - 1
    } else { // actual chess piece
      PIECES[row][col] = c
    }
    col = col + 1
  }
}

// single chessboard square. 
// takes row number, column number and color of the square as parameters
const ChessboardSquare = ({ row, col, color }) => {
  if (color === 'white') {
    return (
      <td className="light">{PIECES[row - 1][col - 1]}</td>
    )
  }
  return (
    <td className="dark">{PIECES[row - 1][col - 1]}</td>
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

// export the chessboard component
export default Chessboard;