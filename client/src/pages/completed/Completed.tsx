import React from 'react'
import { useSelector } from 'react-redux'
import Trophy from '../../images/trophy.png'
import Button from '../../components/Buttons'
import '../../scss/main.scss'

const Completed = () => {
  const score = useSelector((state: any) => state.questionSlice.score)
  const nickname = useSelector((state: any) => state.playerSlice.nickname)

  return (
    <div className='completed-container'>
      <h1>Completed</h1>
      <img src={Trophy} alt='trophy' className='trophy-image' />
      <p className='score-completed'>{`You Scored ${score} Out Of 5`}</p>
      <p className='leaderboard-message'>
        Check out the score in the leaderboard
      </p>
      <div className='completed-button-container'>
        <Button title='Home' />
        <Button title='Leaderboard' />
        <Button title='Play Again' />
      </div>
    </div>
  )
}

export default Completed
