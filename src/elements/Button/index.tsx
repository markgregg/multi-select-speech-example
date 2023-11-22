import * as React from 'react'
import { IconType } from 'react-icons'
import './Button.css'

interface ButtonProps {
  Icon: IconType
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className='buttonMain'
    >
      <Icon />
    </div>
  )
}

export default Button