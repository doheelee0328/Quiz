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
    <div className='game-room-container'>
      <h1 className='heading-setup-game'>Let's Play!</h1>
      <div className='difficulty-container'>
        <h2 className='pick-heading'>Pick a difficulty</h2>
        <div className='choose-container'>
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
        </div>
      </div>
      <div className='category-container'>
        <h2 className='pick-heading'>Pick a Category</h2>
        <div className='pick-container-category'>
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
        </div>
      </div>
      <Button title='Play' onClick={playButtonHandler} />
    </div>
  )
}

export default GameSetup
