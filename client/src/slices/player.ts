import { createSlice } from '@reduxjs/toolkit'
// use redux to use the nickname and room
type PlayerState = {
  playersInRoom: string[]
  gamingRoom: string
  hostName: string
}

const initialPlayerState: PlayerState = {
  playersInRoom: [],
  gamingRoom: '',
  hostName: '',
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
  },
})

export const { setPlayersInRoom, gamingRoom, setHostName } = PlayerSlice.actions
export default PlayerSlice.reducer
