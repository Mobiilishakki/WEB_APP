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

  return (
    <div className="App">

      <h1>Mobiilishakki</h1>

      <Button text="Connect"></Button>

      <br />
      <TextArea content={fenNotation} rows={10} cols={50} readOnly={true} />
    </div>
  );
}

export default App;
