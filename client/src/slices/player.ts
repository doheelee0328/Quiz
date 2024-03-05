import { createSlice } from '@reduxjs/toolkit'
// use redux to use the nickname and room
type PlayerState = {
  playersInRoom: string[]
  gamingRoom: string
  hostName: string
  nickname: string
}

const initialPlayerState: PlayerState = {
  playersInRoom: [],
  gamingRoom: '',
  hostName: '',
  nickname: '',
}

const PlayerSlice = createSlice({
  name: 'player',
  initialState: initialPlayerState,
  reducers: {
    setPlayersInRoom(state, action) {
      state.playersInRoom = action.payload
    },
    gamingRoom(state, action) {
      state.gamingRoom = action.payload
    },
    setHostName(state, action) {
      state.hostName = action.payload
    },
    setNickname(state, action) {
      state.nickname = action.payload
    },
  },
})

export const { setPlayersInRoom, gamingRoom, setHostName, setNickname } =
  PlayerSlice.actions
export default PlayerSlice.reducer
