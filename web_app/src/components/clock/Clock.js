import React from 'react';
import './Clock.css'

// format minutes and seconds with leading zeros
const formatTime = ({ minutes, seconds }) => {
  if (minutes <= 0 && seconds <= 0) {
    return "00:00"
  }
  let result = ""
  if (minutes < 10) {
    result = "0" + minutes + ":"
  } else {
    result = minutes + ":"
  }
  if (seconds < 10) {
    result = result + "0" + seconds
  } else {
    result = result + seconds
  }
  return result
}

// clock element that shows time
// takes time objects for black and white as input
// example_timer = { minutes: 25, seconds: 0 }
const Clock = ({ timerWhite, timerBlack }) => {
  return (
    <table className="clockTable">
      <tbody>
        <tr>
          <td>
            <p><strong>White</strong></p>
            <p className="counterFont">{formatTime(timerWhite)}</p>
          </td>
          <td>
            <p><strong>Black</strong></p>
            <p className="counterFont">{formatTime(timerBlack)}</p>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default Clock;