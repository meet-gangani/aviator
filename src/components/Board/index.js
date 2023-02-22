import React, { useEffect } from 'react'
import './index.css'
import { Circle } from '../../assets/images'
import { BackGround } from '../../assets/audio'
import { Howl } from 'howler'

const Board = () => {
  const sound = new Howl({
    src: [ BackGround ]
  })

  const startSound = () => {
    sound.play()
    console.log('startSound => startSound :: ', sound)
  }

  const stopSound = () => {
    sound.stop()
    console.log('stopSound => stopSound :: ', sound)
  }

  useEffect(() => {
    // startSound()

    return () => {
      console.log('cleanup called...!')
      stopSound()
    }
  }, [])

  return (
      <div className="container">
        {/*<button onClick={() => {*/}
        {/*  // stopSound()*/}
        {/*}}>stop*/}
        {/*</button>*/}

        <div className="game-board">
          <img className="object-circle" src={Circle} alt="img-circle"/>
        </div>
      </div>
  )
}

export default Board