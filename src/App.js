import React, { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Customized, ResponsiveContainer } from 'recharts'
import Plan1 from './assets/images/plane-1.svg'

function App() {
  const [ chartData, setChartData ] = useState([])

  // const updateChartData = () => {
    // newChartData.push(Math.random());
    // setChartData((prevValue) => [ ...prevValue, Math.random() ])
  // const newChartData = [...chartData];
  // setChartData((prevValue) => [ ...prevValue, Math.random() ])
  // }

  const MovingObject = ({ x, y, value }) => (
      <text x={x} y={y} textAnchor="middle">
        {value}
      </text>
  )

  const [ movingObject, setMovingObject ] = useState({
    name: 'Jun',
    value: 0
  })

  const handleMouseMove = (event) => {
    const mouseX = event.chartX
    const xScale = event.activeLabelProps.scale.x
    const xValue = xScale.invert(mouseX)
    setMovingObject({
      name: xValue,
      value: Math.floor(Math.random() * 100)
    })
  }

  useEffect(() => {
    const step = 0.1
    const n = 5
    const seq = [ ...Array(Math.floor(n / step) + 1).keys() ].map((x) => {
      return {
        name: Math.random().toString(36),
        value: parseFloat((x * step).toFixed(1))
      }
    })
    setChartData(seq)
    console.log('seq', seq)

    // const intervalId = setInterval(updateChartData, 1000);
    // console.log('intervalId', intervalId)
    // return () => clearInterval(intervalId);
  }, [])

  const renderImage = (props) => {
    return (
        <image
            x={20}
            y={20}
            width={40}
            height={40}
              src={Plan1}
        />
    )
  }

  return (
      // <img src="./assets/images/plane-1.svg" alt=""/>
      <ResponsiveContainer width={800} height={800}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3"/>
          {/*<Animation duration={1000}/>*/}
          <Area type="monotone" dataKey="value" animationDuration={15000} stroke="#8884d8" fill="#8884d8"/>
          {/*<ForeignObject x="50%" y="50%" width="200" height="200">*/}
          {/*  <div xmlns="http://www.w3.org/1999/xhtml">*/}
          {/*    <h1>Hello world</h1>*/}
          {/*  </div>*/}
          {/*</ForeignObject>*/}
          <Customized component={renderImage}/>
        </AreaChart>
      </ResponsiveContainer>

      // <LineChart width={1800} height={800} data={chartData} onMouseMove={handleMouseMove}>
      //   <CartesianGrid strokeDasharray="3 3" />
      //   <XAxis dataKey="name" />
      //   <YAxis />
      //   <Line animationDuration={5000} type="monotone" dataKey="value" stroke="#8884d8" />
      //   <Label
      //       content={<MovingObject value={movingObject.value} />}
      //       position="top"
      //       offset={10}
      //       render={({ viewBox }) => (
      //           <MovingObject
      //               x={viewBox.x + (viewBox.width / (chartData.length - 1)) * chartData.findIndex((d) => d.name === movingObject.name)}
      //               y={viewBox.y}
      //               value={movingObject.value}
      //           />
      //       )}
      //   />
      // </LineChart>

      // <LineChart width={500} height={300} data={chartData}>
      //   <Line type="monotone" dataKey="value" stroke="#8884d8" />
      //   <CartesianGrid stroke="#ccc" />
      //   <XAxis dataKey="name" />
      //   <YAxis />
      //   <Customized component={renderImage} />
      // </LineChart>
  )
}

export default App