import React from 'react'
import { useSelector } from 'react-redux'
import Trophy from '../images/trophy.png'
import Button from '../components/Buttons'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setScore } from '../slices/questions'
import '../scss/main.scss'

const Completed = () => {
  const score = useSelector((state: any) => state.questionSlice.score)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goToHome = () => {
    navigate('/')
    window.location.reload()
  }

  const goBackToQuestions = () => {
    navigate('/questions')

    dispatch(setScore(0))
  }

  return (
    <div className='completed-container'>
      <h1>Completed</h1>
      <img src={Trophy} alt='trophy' className='trophy-image' />
      <p className='score-completed'>{`You Scored ${score} Out Of 5`}</p>
      <p className='leaderboard-message'>
        Check out the score in the leaderboard
      </p>
      <div className='completed-button-container'>
        <Button title='Home' onClick={goToHome} />

        <Button title='Play Again' onClick={goBackToQuestions} />
      </div>
    </div>
  )
}

export default Completed
