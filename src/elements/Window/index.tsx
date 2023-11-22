import * as React from 'react'
import { Rnd } from 'react-rnd';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../Button';
import { useAppSelector } from '../../hooks/redxux';
import { styleHeaderFromTheme } from '../../themes';
import './Window.css'


type WindowProps = {
  children?: React.ReactNode
  title: string
  visible: boolean
  onHide: () => void
  height: number
  width: number
  x: number
  y: number
};

const Window: React.FC<WindowProps> = ({
  children, title, visible, onHide, height, width, x, y
}) => {
  const theme = useAppSelector((state) => state.theme.theme)

  return (
    <Rnd
      disableDragging={true}
      enableResizing={false}
      size={{ width, height }}
      position={{ x, y }}
    >
      {
        visible && <div className='windowMain'>
          <div
            className='windowToolBar'
            style={styleHeaderFromTheme(theme)}
          >
            <Button
              Icon={AiOutlineClose}
              onClick={onHide}
            />
            {title}
          </div>
          {children}
        </div>
      }
    </Rnd>
  )
}

export default Window