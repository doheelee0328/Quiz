import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Buttons'
import Difficulty from '../components/Difficulty'
import Category from '../components/Category'

import '../scss/main.scss'

const GameSetup = () => {
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_category.php')
      const data = await response.json()
      console.log(data.trivia_categories)
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
        <Difficulty />
      </div>
      <div className='category-container'>
        <Category categories={categories} />
      </div>
      <div className='ready-to-play-container'>
        <Button title='Ready To Play' onClick={playButtonHandler} />
      </div>
    </div>
  )
}

export default GameSetup
