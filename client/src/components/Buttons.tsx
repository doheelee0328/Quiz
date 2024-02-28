import React from 'react'
import '../scss/main.scss'

interface ButtonProps {
  title: string
  onClick?: () => void
  dataCy?: string
}

const Button = ({ title, onClick, dataCy }: ButtonProps) => {
  return (
    <button className='character-button' onClick={onClick} data-cy={dataCy}>
      {title}
    </button>
  )
}

export default Button
