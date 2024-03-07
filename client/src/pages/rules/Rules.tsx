import React from 'react'
import Button from '../../components/Buttons'
import { useNavigate } from 'react-router-dom'
import '../../scss/main.scss'

const Rules = () => {
  const navigate = useNavigate()

  const navigateToTheQuestionPage = () => {
    navigate('/questions')
  }
  return (
    <div className='rules-container'>
      <h1 className='rules-heading'>Rules</h1>
      <ol className='rules'>
        <li> You will have 20 seconds to answer each question</li>
        <li>You will receive points for each correct response</li>
        <li>You cannot go back to the previous question</li>
      </ol>
      <Button title='Play' onClick={navigateToTheQuestionPage} />
    </div>
  )
}

export default Rules
