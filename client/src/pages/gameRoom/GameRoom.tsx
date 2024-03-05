import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setHostName } from '../../slices/player'
import '../../scss/main.scss'
import Button from '../../components/Buttons'
import { useNavigate } from 'react-router-dom'
import { socket } from '../../socket/index'
import Logo from '../../components/Logo'

const GameSetup = () => {
  const navigate = useNavigate()

  const playButtonHanlder = () => {
    navigate('/lobby')
  }
  return (
    <div>
      <Logo />
      <p>Let's play a game</p>
      <Button title='Play' onClick={playButtonHanlder} />
    </div>
  )
}

export default GameSetup
