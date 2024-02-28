import React from 'react'
import Duck from '../images/Duck.png'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to='/'>
      <div className='logo-container'>
        <img src={Duck} alt='logo-duck' className='logo-duck' />
        <span className='smart-duck-logo-title'>SmartDuck</span>
      </div>
    </Link>
  )
}

export default Logo
