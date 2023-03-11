import React, { useEffect, useState } from 'react'
import './index.scss'
import { BackGround } from '../../assets/audio'
import { Howl } from 'howler'
import Plan1 from '../../assets/images/plane-1.svg'

const Board = () => {
  const [ state, setState ] = useState(50)

  const sound = new Howl({
    src: [ BackGround ]
  })

  const startSound = () => {
    sound.play()
    // console.log('startSound => startSound :: ', sound)
  }

  const stopSound = () => {
    sound.stop()
    // console.log('stopSound => stopSound :: ', sound)
  }

  useEffect(() => {
    // startSound()

    return () => {
      // console.log('cleanup called...!')
      stopSound()
    }
  }, [])

  const divisor = document.getElementById('divisor')
  const handle = document.getElementById('handle')
  const slider = document.getElementById('slider')

  function moveDivisor() {
    handle.style.left = slider.value + '%'
    divisor.style.width = slider.value + '%'
  }

  window.onload = function() {
    moveDivisor()
  }

  return (
      <div className="">
        {/*<button onClick={() => {*/}
        {/*  // stopSound()*/}
        {/*}}>stop*/}
        {/*</button>*/}

        <div className="game-board">
          <div className="container">
            <div id="comparison">
              <figure>
                <div id="handle"/>
                <div id="divisor"/>
              </figure>
              <img className="board-plan" src={Plan1} width={150} height={74} alt="plan"/>
              <input id="slider" type="range" min="0" max="100" value={state} onChange={() => moveDivisor()}/>
            </div>
          </div>

          {/*<img className="object-circle" src={Circle} alt="img-circle"/>*/}
        </div>
      </div>
  )
}

export default Board