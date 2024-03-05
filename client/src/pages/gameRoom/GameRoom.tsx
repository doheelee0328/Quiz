import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Buttons'

const GameSetup = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [questions, setQuestions] = useState([])
  const [difficulty, setDifficulty] = useState('')

  const navigate = useNavigate()

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php')
      const data = await response.json()

      setCategories(data.trivia_categories)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${difficulty}&type=multiple`
      )
      const data = await response.json()

      setQuestions(data.results)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchQuestions()
  }, [])

  const playButtonHandler = () => {
    navigate('/lobby')
  }

  return (
    <div>
      <h1>Let's set up a game</h1>
      <h1>Pick a difficulty</h1>
      <Button title='Easy' onClick={() => setDifficulty('easy')} />
      <Button title='Medium' onClick={() => setDifficulty('medium')} />
      <Button title='Hard' onClick={() => setDifficulty('hard')} />

      <h1>Pick a Category</h1>
      {categories.map((category: any) => (
        <Button
          title={category.name}
          onClick={() => setSelectedCategory(category.id)}
          key={category.id}
        />
      ))}

      {/* {questions && questions.length > 0 && (
        <div>
          <h2>Questions</h2>
          {questions.map((question: any, index: number) => (
            <div key={index}>
              <p>
                Question {index + 1}: {question.question}
              </p>
              <p>Correct Answer: {question.correct_answer}</p>
              <p>Incorrect Answers: {question.incorrect_answers.join(', ')}</p>
            </div>
          ))}
        </div>
      )} */}
      <Button title='Play' onClick={playButtonHandler} />
    </div>
  )
}

export default GameSetup
