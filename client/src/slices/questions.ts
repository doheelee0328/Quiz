import { createSlice } from '@reduxjs/toolkit'

type QuestionState = {
  selectedCategory: string | number
  selectedDifficulty: string
  score: number
}

const initialQuestionState: QuestionState = {
  selectedCategory: '',
  selectedDifficulty: '',
  score: 0,
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
    setScore(state, action) {
      state.score = action.payload
    },
  },
})

export const { setSelectedCategory, setSelectedDifficulty, setScore } =
  questionSlice.actions
export default questionSlice.reducer
