export default interface Bond {
  isin: string
  currency: string
  issueDate: string
  maturityDate: string
  price: number
  size: number
  side: 'BUY' | 'SELL'
  coupon: number
  issuer: string
  hairCut: number
}