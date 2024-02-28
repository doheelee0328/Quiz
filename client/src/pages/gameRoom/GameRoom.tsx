import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../../components/Buttons'

const GameSetup = () => {
  return (
    <div>
      <p>Let's play a game</p>
      <Button title='Play' />
    </div>
  )
}

export default GameSetup
