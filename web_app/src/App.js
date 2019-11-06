import React, { useState, useEffect } from 'react';
import './App.css';

const Button = ({ text }) => {
  return (
    <div>
      <button>{text}</button>
    </div>
  )
}

const TextArea = ({ content, rows, cols, readOnly }) => {
  return (
    <div>
      <textarea value={content} rows={rows} cols={cols} readOnly={readOnly} />
    </div>
  )
}

const App = () => {
  const [fenNotation, setFenNotation] = useState('')
  const [lastMove, setLastMove] = useState('')

  return (
    <div className="App">
      <h1>Mobiilishakki</h1>
      <br />
      <Button text="Connect"></Button>
      <br />
      <h3>FEN-notaatio</h3>
      <TextArea content={fenNotation} rows={5} cols={50} readOnly={true} />
      <br />
      <h3>Viimeisin siirto</h3>
      <br />
      <h3>Pelitilanne</h3>
    </div>
  );
}

export default App;
