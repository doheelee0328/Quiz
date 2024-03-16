import React from 'react'
import Button from './Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedDifficulty } from '../slices/questions'
import '../scss/main.scss'

const Difficulty = () => {
  const dispatch = useDispatch()

  const difficulty = useSelector(
    (state: any) => state.questionSlice.selectedDifficulty
  )
  return (
    <>
      <h2 className='pick-heading'>Pick a difficulty</h2>
      <div className='choose-container'>
        <Button
          title='Easy'
          onClick={() => dispatch(setSelectedDifficulty('easy'))}
          active={difficulty === 'easy'}
        />
        <Button
          title='Medium'
          onClick={() => dispatch(setSelectedDifficulty('medium'))}
          active={difficulty === 'medium'}
        />
        <Button
          title='Hard'
          onClick={() => dispatch(setSelectedDifficulty('hard'))}
          active={difficulty === 'hard'}
        />
      </div>
    </>
  )
}

export default Difficulty
