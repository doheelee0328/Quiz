import React from 'react'
import Arrow from '../../images/Arrow.png'
import Duck from '../../images/Duck.png'
import { Link } from 'react-router-dom'
import '../../scss/main.scss'

const Homepage = () => {
  return (
    <div className='smart-duck-container'>
      <h1 className='welcome-message' data-cy='welcome-heading'>
        Welcome To SmartDuck
      </h1>

      <p className='begin-learning-message' data-cy='welcome-paragraph'>
        Click the duck to begin your learning
      </p>
      <div className='image-container'>
        <img
          src={Arrow}
          alt='arrow'
          className='arrow-image'
          data-cy='image-arrow'
        />
        <Link to='/character'>
          <img
            src={Duck}
            alt='duck'
            className='duck-image'
            data-cy='image-duck'
          />
        </Link>
      </div>
    </div>
  )
}

export default Homepage
