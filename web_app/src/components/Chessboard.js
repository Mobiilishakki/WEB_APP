import React from 'react'
import './Chessboard.css'

// single chessboard square. 
// takes color of the square as parameter
const ChessboardSquare = ({ color }) => {
  if (color === 'white') {
    return (
      <td className="light"></td>
    )
  }
  return (
    <td className="dark"></td>
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
      <ChessboardSquare color={color} />
      <ChessboardSquare color={otherColor} />
      <ChessboardSquare color={color} />
      <ChessboardSquare color={otherColor} />
      <ChessboardSquare color={color} />
      <ChessboardSquare color={otherColor} />
      <ChessboardSquare color={color} />
      <ChessboardSquare color={otherColor} />
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
const Chessboard = () => {
  return (
    <table>
      <tbody>
        <TopAxis />
        <ChessboardRow rowNum={1} color="black" />
        <ChessboardRow rowNum={2} color="white" />
        <ChessboardRow rowNum={3} color="black" />
        <ChessboardRow rowNum={4} color="white" />
        <ChessboardRow rowNum={5} color="black" />
        <ChessboardRow rowNum={6} color="white" />
        <ChessboardRow rowNum={7} color="black" />
        <ChessboardRow rowNum={8} color="white" />
      </tbody>
    </table>
  )
}

export default Chessboard;