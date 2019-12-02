import React from 'react';
import './Chessboard.css';
import bp from './pieces/bp.png';  // black pawn 
import br from './pieces/br.png';  // black rook
import bn from './pieces/bn.png';  // black knight
import bb from './pieces/bb.png';  // black bishop
import bq from './pieces/bq.png';  // black queen
import bk from './pieces/bk.png';  // black king
import wp from './pieces/wp.png';  // white pawn
import wr from './pieces/wr.png';  // white rook
import wn from './pieces/wn.png';  // white knight
import wb from './pieces/wb.png';  // white bishop
import wq from './pieces/wq.png';  // white queen
import wk from './pieces/wk.png';  // white knight

// array containing pieces information from a1 to h8
// two dimensional (row, col)
let PIECES;

// function that creates two dimeansional array
const create2DimensionalArray = (rows, cols) => {
  let array = new Array(rows)
  for (let i = 0; i < rows; i++) {
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

// function that returns correct chess piece image
// by following the rules of fen notation
const getChessPieceImage = (fenChar) => {
  switch (fenChar) {
    case 'p':
      return bp
    case 'r':
      return br
    case 'n':
      return bn
    case 'b':
      return bb
    case 'q':
      return bq
    case 'k':
      return bk
    case 'P':
      return wp
    case 'R':
      return wr
    case 'N':
      return wn
    case 'B':
      return wb
    case 'Q':
      return wq
    case 'K':
      return wk
    default: // unkown character --> no chess piece available
      return ''
  }
}

// single chessboard square. 
// takes row number, column number and color of the square as parameters
const ChessboardSquare = ({ row, col, color }) => {
  const piece = PIECES[row - 1][col - 1]
  if (color === 'white') {
    return (
      <td className="light"><img src={getChessPieceImage(piece)} alt={piece} /></td>
    )
  }
  return (
    <td className="dark"><img src={getChessPieceImage(piece)} alt={piece} /></td>
  )
}

// chessboard row (8 chessboard squares).
// takes player color as first parameter
// takes the rownumber as second parameter
// takes the color ("black", "white") of first square as third parameter.
const ChessboardRow = ({ playerColor, rowNum, color }) => {
  const otherColor = color === "white" ? "black" : "white"
  return (
    <tr>
      <th>{rowNum}</th>
      <ChessboardSquare row={rowNum} col={playerColor === 'white' ? 1 : 8} color={color} />
      <ChessboardSquare row={rowNum} col={playerColor === 'white' ? 2 : 7} color={otherColor} />
      <ChessboardSquare row={rowNum} col={playerColor === 'white' ? 3 : 6} color={color} />
      <ChessboardSquare row={rowNum} col={playerColor === 'white' ? 4 : 5} color={otherColor} />
      <ChessboardSquare row={rowNum} col={playerColor === 'white' ? 5 : 4} color={color} />
      <ChessboardSquare row={rowNum} col={playerColor === 'white' ? 6 : 3} color={otherColor} />
      <ChessboardSquare row={rowNum} col={playerColor === 'white' ? 7 : 2} color={color} />
      <ChessboardSquare row={rowNum} col={playerColor === 'white' ? 8 : 1} color={otherColor} />
    </tr>
  )
}

// chessboard alphabetic top axis
// takes player color as first parameter
const TopAxis = ({ playerColor }) => {
  return (
    <tr>
      <th></th>
      <th>{playerColor === 'white' ? 'a' : 'h'}</th>
      <th>{playerColor === 'white' ? 'b' : 'g'}</th>
      <th>{playerColor === 'white' ? 'c' : 'f'}</th>
      <th>{playerColor === 'white' ? 'd' : 'e'}</th>
      <th>{playerColor === 'white' ? 'e' : 'd'}</th>
      <th>{playerColor === 'white' ? 'f' : 'c'}</th>
      <th>{playerColor === 'white' ? 'g' : 'b'}</th>
      <th>{playerColor === 'white' ? 'h' : 'a'}</th>
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
        <TopAxis playerColor={playerColor} />
        <ChessboardRow playerColor={playerColor} rowNum={rownums[0]} color={playerColor} />
        <ChessboardRow playerColor={playerColor} rowNum={rownums[1]} color={enemyColor} />
        <ChessboardRow playerColor={playerColor} rowNum={rownums[2]} color={playerColor} />
        <ChessboardRow playerColor={playerColor} rowNum={rownums[3]} color={enemyColor} />
        <ChessboardRow playerColor={playerColor} rowNum={rownums[4]} color={playerColor} />
        <ChessboardRow playerColor={playerColor} rowNum={rownums[5]} color={enemyColor} />
        <ChessboardRow playerColor={playerColor} rowNum={rownums[6]} color={playerColor} />
        <ChessboardRow playerColor={playerColor} rowNum={rownums[7]} color={enemyColor} />
      </tbody>
    </table>
  )
}

// export the chessboard component
export default Chessboard;