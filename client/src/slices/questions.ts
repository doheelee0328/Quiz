import { createSlice } from '@reduxjs/toolkit'

type QuestionState = {
  selectedCategory: string | number
  selectedDifficulty: string
}

const initialQuestionState: QuestionState = {
  selectedCategory: '',
  selectedDifficulty: '',
}

const questionSlice = createSlice({
  name: 'question',
  initialState: initialQuestionState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload
    },
    setSelectedDifficulty(state, action) {
      state.selectedDifficulty = action.payload
    },
  },
})

export const { setSelectedCategory, setSelectedDifficulty } =
  questionSlice.actions
export default questionSlice.reducer
