export default interface Trade {
  isin: string
  tradeDate: Date
  price: number
  size: number
  side: 'BUY' | 'SELL'
  client: string
}

export const defaultTrade: Trade = {
  isin: '',
  tradeDate: new Date(),
  price: 0,
  size: 0,
  side: 'BUY',
  client: ''
}