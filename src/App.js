import './App.css'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8080')
import { Area, AreaChart, CartesianGrid, Customized, ResponsiveContainer } from 'recharts'
import Plan1 from './assets/images/plane-1.svg'
import Board from './components/Board'

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
    setChartData(seq)

    // const intervalId = setInterval(updateChartData, 1000);
    // console.log('intervalId', intervalId)
    // return () => clearInterval(intervalId);
  }, [])

  const MovingObject = ({ x, y, value }) => (
      <text x={x} y={y} textAnchor="middle">
        {value}
      </text>
  )

  const [ movingObject, setMovingObject ] = useState({
    name: 'Jun',
    value: 0
  })

    socket.on('counter', (data) => {
      console.log(data)
      setCounter(data)
    })
  }, [])

  return (
      <div className="App" style={{ flexDirection: 'column', padding: '10px' }}>
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

  }

  return (
      <>
        <Board/>

        {/*<img src="./assets/images/plane-1.svg" alt=""/>*/}

        {/*<ResponsiveContainer width={800} height={800}>*/}
        {/*  <AreaChart data={chartData}>*/}
        {/*    <CartesianGrid strokeDasharray="3 3"/>*/}
        {/*    /!* animationEasing 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' *!/*/}
        {/*    <Area className="relative" type="monotone" dataKey="value" animationDuration={15000} stroke="#e50539" fill="#e50539"/>*/}
        {/*    <Customized component={() => <image className="plan" x={10} y={20} width={150} height={74} href={Plan1}/>}/>*/}
        {/*  </AreaChart>*/}
        {/*</ResponsiveContainer>*/}

        {/*<div className="glow">*/}
        {/*  <span className="bg_glow">123</span>*/}
        {/*</div>*/}

        {/* <LineChart width={1800} height={800} data={chartData} onMouseMove={handleMouseMove}>*/}
        {/*   <CartesianGrid strokeDasharray="3 3" />*/}
        {/*   <XAxis dataKey="name" />*/}
        {/*   <YAxis />*/}
        {/*   <Line animationDuration={5000} type="monotone" dataKey="value" stroke="#8884d8" />*/}
        {/*   <Label*/}
        {/*       content={<MovingObject value={movingObject.value} />}*/}
        {/*       position="top"*/}
        {/*       offset={10}*/}
        {/*       render={({ viewBox }) => (*/}
        {/*           <MovingObject*/}
        {/*               x={viewBox.x + (viewBox.width / (chartData.length - 1)) * chartData.findIndex((d) => d.name === movingObject.name)}*/}
        {/*               y={viewBox.y}*/}
        {/*               value={movingObject.value}*/}
        {/*           />*/}
        {/*       )}*/}
        {/*   />*/}
        {/* </LineChart>*/}

        {/* <LineChart width={500} height={300} data={chartData}>*/}
        {/*   <Line type="monotone" dataKey="value" stroke="#8884d8" />*/}
        {/*   <CartesianGrid stroke="#ccc" />*/}
        {/*   <XAxis dataKey="name" />*/}
        {/*   <YAxis />*/}
        {/*   <Customized component={renderImage} />*/}
        {/* </LineChart>*/}
      </>
  )
}

export default App