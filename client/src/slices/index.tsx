import { configureStore } from '@reduxjs/toolkit'
import characterReducer from './character'
import playerReducer from './player'

// import each of the slice and export the store

export const store = configureStore({
  reducer: {
    characterSlice: characterReducer,
    playerSlice: playerReducer,
  },
})
