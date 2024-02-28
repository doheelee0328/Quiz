import React, { useState, useEffect, useRef, useReducer } from 'react'
import Button from '../../components/Buttons'
import { useSelector } from 'react-redux'
import { socket } from '../../socket/index'
import { useDispatch } from 'react-redux'
import { setPlayersInRoom } from '../../slices/player'
import Logo from '../../components/Logo'
import MessageLogo from '../../images/send-message-icon.png'
import '../../scss/main.scss'
import LobbyStatus from '../../components/LobbyStatus'

type LobbyState = {
  message: string
  messages: Array<string>
}

const Lobby = () => {
  const initialState: LobbyState = {
    message: '',
    messages: [],
  }
  const [message, setMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [messages, setMessages] = useState<
    { nickname: string; message: string; character: string }[]
  >([])
  const [showMessage, setShowMessage] = useState<boolean>(false)

  // const [playersInRoom, setPlayersInRoom] = useState<Array<string>>([])

  const selectedRoom = useSelector((state: any) => state.playerSlice.gamingRoom)
  const playersInRoom = useSelector(
    (state: any) => state.playerSlice.playersInRoom
  )
  const selectedCharacter = useSelector(
    (state: any) => state.characterSlice.character
  )
  const hostName = useSelector((state: any) => state.playerSlice.hostName)
  console.log(hostName)

  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('update-nicknames', (updatedNicknames) => {
      dispatch(setPlayersInRoom(updatedNicknames))
    })

    socket.on('previous-messages', (previousMessages) => {
      setMessages(previousMessages)
    })

    const receiveMessageHandler = ({
      nickname: senderNickname,
      message,
      character,
    }: {
      nickname: string
      message: string
      character: string
    }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { nickname: senderNickname, message, character },
      ])
    }

    socket.on('receive-message', receiveMessageHandler)

    // Cleanup function repeated messages
    return () => {
      socket.off('update-nicknames')
      socket.off('receive-message', receiveMessageHandler)
      socket.off('playerData')
    }
  }, [])

  const submitMessageHandler = () => {
    if (!message) {
      setErrorMessage('Please enter your message')
      return
    }
    socket.emit('send-message', message, selectedRoom, selectedCharacter)
    setMessage('')
  }

  return (
    <div className='lobby-container'>
      {/* <Logo /> */}
      <h1 className='lobby-title'>Lobby</h1>
      {/* <p className='lobby-waiting-sentence'>
        Waiting for the host to start the game....
      </p> */}

      <div className='players-container'>
        <h3 className='number-of-players'>
          Players in room:
          <span className='length-of-players'>{playersInRoom.length}</span>
        </h3>

        <LobbyStatus host={hostName} />
        {playersInRoom.map((playerInfo: string, index: number) => (
          <p className='players' key={index}>
            Player name: {playerInfo}
          </p>
        ))}
      </div>
      {showMessage && (
        <div className='logo-message-container'>
          <div className='lobby-message-box'>
            {messages.map(({ nickname, message, character }, index) => (
              <div key={index}>
                <div className='character-message-container'>
                  <img
                    src={character}
                    alt='chosen-character-images'
                    className='character-image'
                  />
                  <span className='chat-message'>{nickname}:</span>
                  <span className='chat-message'>{message}</span>
                </div>
              </div>
            ))}
          </div>
          <div className='lobby-input-message-container'>
            <input
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className='lobby-input '
              placeholder='Enter your message'
            />
            <img
              src={MessageLogo}
              alt='message-logo'
              className='message-logo'
              onClick={submitMessageHandler}
            />
          </div>
        </div>
      )}

      <div className='lobby-button-container'>
        {hostName && <Button title='Start The Quiz' />}

        <Button
          title='Send Messages To Your Players'
          onClick={() => setShowMessage(!showMessage)}
        />
      </div>
      <p className='lobby-message'>{errorMessage && errorMessage}</p>
    </div>
  )
}

export default Lobby
