import Trade from '@/types/Trade'
import * as React from 'react'
import { useAppSelector } from '../../hooks/redxux'
import { styleDivFromTheme } from '../../themes'
import './TradeExample.css'

interface TradeExampleProps {
  trade: Trade
  onClose: () => void
}

const TradeExample: React.FC<TradeExampleProps> = ({ trade, onClose }) => {
  const theme = useAppSelector((state) => state.theme.theme)

  return (
    <div
      className='tradeMain'
      style={styleDivFromTheme(theme)}
    >
      <div
        className='tradeBuySell'
        style={{ backgroundColor: trade.side === 'BUY' ? 'blue' : 'red' }}
      ><h1>{trade.side}</h1></div>
      <div><b>Client:</b> {trade.client ?? 'Banco Santander S.A.'}</div>
      <div><b>Isin:</b> {trade.isin ?? 'EU000A1G0EN1'}</div>
      <div><b>Price:</b> {trade.price ?? 99.99}</div>
      <div><b>Size:</b> {trade.size ?? 1000000}</div>
      <button
        className='tradeButton'
        onClick={onClose}
      >Enter</button>
    </div>
  )
}

export default TradeExample