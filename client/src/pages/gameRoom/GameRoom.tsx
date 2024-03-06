import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Buttons'
import { useDispatch } from 'react-redux'
import {
  setSelectedCategory,
  setSelectedDifficulty,
} from '../../slices/questions'

const GameSetup = () => {
  const [categories, setCategories] = useState([])
  // const [selectedCategory, setSelectedCategory] = useState('')
  // const [questions, setQuestions] = useState([])
  // const [difficulty, setDifficulty] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php')
      const data = await response.json()

      setCategories(data.trivia_categories)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const playButtonHandler = () => {
    navigate('/lobby')
  }

  return (
    <div>
      <h1>Let's set up a game</h1>
      <h1>Pick a difficulty</h1>
      <Button
        title='Easy'
        onClick={() => dispatch(setSelectedDifficulty('easy'))}
      />
      <Button
        title='Medium'
        onClick={() => dispatch(setSelectedDifficulty('medium'))}
      />
      <Button
        title='Hard'
        onClick={() => dispatch(setSelectedDifficulty('hard'))}
      />

      <h1>Pick a Category</h1>
      {categories.map((category: any) => (
        <Button
          title={category.name}
          onClick={() =>
            dispatch(
              setSelectedCategory({ id: category.id, name: category.name })
            )
          }
          key={category.id}
        />
      ))}

      <Button title='Play' onClick={playButtonHandler} />
    </div>
  )
}

export default GameSetup
