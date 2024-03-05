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
        `https://opentdb.com/api.php?amount=10&type=multiple&category=${selectedCategory}&difficulty=${difficulty}`
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
          onClick={() => setSelectedCategory(category.name)}
          key={category.id}
        />
      ))}
      {difficulty && selectedCategory ? (
        <p>
          You have selected {difficulty} and {selectedCategory}
        </p>
      ) : (
        ''
      )}

      <Button title='Play' onClick={playButtonHandler} />
    </div>
  )
}

export default GameSetup
