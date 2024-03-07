import React from 'react'
import '../scss/main.scss'

interface ButtonProps {
  title: string
  onClick?: () => void
  dataCy?: string
  active?: boolean
}

const Button = ({ title, onClick, dataCy, active }: ButtonProps) => {
  return (
    <button
      className={`character-button ${active ? 'active' : ''}`}
      onClick={onClick}
      data-cy={dataCy}
    >
      {title}
    </button>
  )
}

export default Button
