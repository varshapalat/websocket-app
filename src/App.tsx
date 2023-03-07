import React, { useCallback, useEffect, useState } from 'react';
import './App.css';

const socket = new WebSocket("ws://127.0.0.1:8080/ws");

function App() {
  const [message, setMessage] = useState('')
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    // socket.onerror = () => {
    //   socket = socket.OPEN
    // }
    socket.onopen = () => {
      setMessage('Connected')
    };

    socket.onmessage = (e) => {
      setMessage("Get message from server: " + e.data)
    };

    return () => {
      socket.close()
    }
  }, [])

  const handleClick = useCallback((e: any) => {
    e.preventDefault()

    socket.send(JSON.stringify({
      message: inputValue
    }))
  }, [inputValue])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }, [])

  return (
    <div className="App">
      <input id="input" type="text" value={inputValue} onChange={handleChange} />
      <button onClick={handleClick}>Send</button>
      <pre>{message}</pre>
    </div>
  );
}

export default App;