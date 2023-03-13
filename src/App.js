import './App.css'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Board from './components/Board'

const socket = io.connect('http://localhost:8080')

function App() {
  // Messages States
  const room = '45189564'
  const [ counter, setCounter ] = useState(0)
  const [ message, setMessage ] = useState('')
  const [ messageReceived, setMessageReceived ] = useState([])

  socket.emit('join_room', room)

  const sendMessage = () => {
    socket.emit('send_message', { message, room })
    setMessage('')
  }

  useEffect(() => {
    console.log('socket', socket)
    socket.on('receive_message', (data) => {
      setMessageReceived((prev) => [ ...prev, data.message ])
    })
    // setChartData(seq)

    // const intervalId = setInterval(updateChartData, 1000);
    // console.log('intervalId', intervalId)
    // return () => clearInterval(intervalId);
  }, [])

  socket.on('counter', (data) => {
    console.log(data)
    setCounter(data)
  })

  return (
      <div className="App" style={{ flexDirection: 'column', padding: '10px' }}>
        <Board/>

        <h1> counter : {counter}</h1>
        <h1> connected to room : {socket.id}</h1>
        <input
            placeholder="Message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value)
            }}
            onKeyPress={(event) => {
              if ([ 'Enter', 'NumpadEnter' ].includes(event.code)) return sendMessage()
            }}
        />

        <div>
          <h1> Message:</h1>
          {messageReceived.map((msg, index) => <h4 key={index}>{msg}</h4>)}
        </div>
      </div>
  )
}

export default App