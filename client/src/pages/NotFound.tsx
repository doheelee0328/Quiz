import React from 'react'
import '../scss/main.scss'

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <h1 className='404-message' data-cy='404-message'>
        404
      </h1>
      <p className='page-not-found' data-cy='page-not-found-message'>
        Page Not Found
      </p>
    </div>
  )
}

export default NotFound
