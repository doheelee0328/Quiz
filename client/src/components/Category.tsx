import React from 'react'
import Button from './Buttons'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCategory } from '../slices/questions'
import '../scss/main.scss'

interface Categories {
  id: number
  name: string
}

const Category = ({ categories }: { categories: Array<Categories> }) => {
  const dispatch = useDispatch()

  const selectedCategory = useSelector(
    (state: any) => state.questionSlice.selectedCategory
  )
  return (
    <>
      <h2 className='pick-heading'>Pick a Category</h2>
      <div className='pick-container-category'>
        {categories.map((category: Categories) => (
          <Button
            title={category.name}
            onClick={() =>
              dispatch(
                setSelectedCategory({ id: category.id, name: category.name })
              )
            }
            active={selectedCategory && selectedCategory.id === category.id}
            key={category.id}
          />
        ))}
      </div>
    </>
  )
}

export default Category
