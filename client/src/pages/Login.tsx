import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeCharacter } from '../slices/character'
import { gamingRoom, setHostName, setNickname } from '../slices/player'
import '../scss/main.scss'
import Button from '../components/Buttons'
import { useNavigate } from 'react-router-dom'
import { socket } from '../socket/index'
import { setPlayersInRoom } from '../slices/player'

// use redux to use the nickname and room
const Login = () => {
  const inputNicknameRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState<string>('')
  const [playerName, setPlayerName] = useState('')

  // const [roomName, setRoomName] = useState('')
  const dispatch = useDispatch()
  // redux
  const selectedCharacter = useSelector(
    (state: any) => state.characterSlice.character
  )
  const selectedRoom = useSelector((state: any) => state.playerSlice.gamingRoom)

  const navigate = useNavigate()

  useEffect(() => {
    if (inputNicknameRef.current) {
      inputNicknameRef.current.focus()
    }

    const storedCharacter = localStorage.getItem('character-image')
    if (storedCharacter) {
      dispatch(changeCharacter(storedCharacter))
    }

    socket.on('update-players', (players: string[]) => {
      dispatch(setPlayersInRoom(players))
    })
    return () => {
      socket.off('update-players')
    }
  }, [dispatch, selectedCharacter])

  const joinRoomHandler = () => {
    if (!selectedRoom || !playerName) {
      setMessage(
        'Please enter your nickname and the existing room to join the game'
      )
      return
    }

    socket.emit('join-room', selectedRoom, playerName, (roomExist: boolean) => {
      if (roomExist) {
        navigate('/lobby')
        dispatch(setNickname(playerName))
      } else {
        setMessage(`The room ${selectedRoom} does not exist`)
      }
    })
  }
  const joinNewGameHandler = () => {
    if (!playerName && !selectedRoom) {
      setMessage('Please enter your username and room to create a quiz')
      return
    } else {
      dispatch(setNickname(playerName))
      // set the nickname to the player name

      socket.emit(
        'create-room',
        selectedRoom,
        playerName,
        (room: string | boolean) => {
          // callback function that provides the name of the room
          if (typeof room === 'string') {
            navigate('/game-room')
            dispatch(setHostName(playerName)) // Dispatch setHostName after setting playerName
          } else {
            setMessage('The room already exists, please try again')
          }
        }
      )
    }
  }

  return (
    <div className='login-container'>
      {/* <Logo /> */}
      {selectedCharacter && (
        <img
          src={selectedCharacter}
          alt='selected-character'
          className='selected-character'
          data-cy='selected-character'
        />
      )}
      <p className='nickname' data-cy='nickname'>
        Username
      </p>
      <input
        type='text'
        ref={inputNicknameRef}
        className='input'
        data-cy='input'
        onChange={(e) => setPlayerName(e.target.value)}
        value={playerName}
      />
      <p className='nickname' data-cy='nickname'>
        Room
      </p>
      <input
        type='text'
        className='input'
        data-cy='input'
        onChange={(e) => dispatch(gamingRoom(e.target.value))}
        value={selectedRoom}
      />

      <div className='start-game-container'>
        <Button title='Create Room' onClick={joinNewGameHandler} />
        <Button
          title='Join Game'
          onClick={joinRoomHandler}
          dataCy='join-button'
        />
      </div>

      {message && <p className='not-entered-message'>{message}</p>}
    </div>
  )
}

export default Login
