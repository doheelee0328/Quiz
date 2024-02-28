import { createSlice } from '@reduxjs/toolkit'

type CharacterState = {
  character: any
}

const initialCounterState: CharacterState = {
  character: null,
}

const characterSlice = createSlice({
  name: 'character',
  initialState: initialCounterState,
  reducers: {
    changeCharacter(state, action) {
      state.character = action.payload
    },
  },
})

export const { changeCharacter } = characterSlice.actions
export default characterSlice.reducer
