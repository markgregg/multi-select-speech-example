import * as React from 'react'
import Select from './elements/Select'
import { Theme, bodyStyleFromTheme, themes } from './themes'
import CommandBar from './elements/CommandBar'
import { useAppDispatch, useAppSelector } from './hooks/redxux'
import { setTheme } from './store/themeSlice'
import AgGridExample from './elements/AgGridExample'
import Window from './elements/Window'
import Button from './elements/Button'
import { LuGrid } from 'react-icons/lu';
import './App.css'
import TradeExample from './elements/TradeExample'
import { Matcher } from 'multi-select-speech'
import Trade, { defaultTrade } from './types/Trade'

const App = () => {
  const [showCategories, setShowCategories] = React.useState<boolean>(false)
  const [hideToolTips, setHideToolTips] = React.useState<boolean>(false)
  const [blotterVisible, setBlotterVisible] = React.useState<boolean>(true)
  const [tradeEntryVisible, setTradeEntryVisible] = React.useState<boolean>(false)
  const [trade, setTrade] = React.useState<Trade>(defaultTrade)
  const theme = useAppSelector((state) => state.theme.theme)
  const dispatch = useAppDispatch()

  const updateTheme = (theme: Theme) => {
    dispatch(setTheme(theme))
  }

  const enterTrade = (matchers: Matcher[]) => {
    const isin = matchers.find(m => m.source === 'ISIN')?.text ?? 'XS2567260927'
    const tradeDate = matchers.find(m => m.source === 'TradeDate')?.value as Date ?? new Date()
    const price = matchers.find(m => m.source === 'Price')?.value as number ?? 99.99
    const size = matchers.find(m => m.source === 'Size')?.value as number ?? 1000000
    const side = matchers.find(m => m.source === 'Side')?.value as ('BUY' | 'SELL') ?? 'BUY'
    const client = matchers.find(m => m.source === 'Client')?.text ?? 'Landesbank Saar'

    setTrade({
      isin,
      tradeDate,
      price,
      size,
      side,
      client
    })
    setTradeEntryVisible(true)
  }

  return (
    <div
      className='mainBody'
      style={bodyStyleFromTheme(theme)}
    >
      <h2>MutliSelect</h2>
      <div className='mainSelection'>
        <div className='mainTheme'>
          <b>Themes</b>
          <Select
            options={themes}
            selection={theme}
            onSelectOption={updateTheme}
          />
        </div>
        <div className='mainOptions'>
          <label>Show Categories
            <input
              type="checkbox"
              checked={showCategories}
              onChange={e => setShowCategories(e.currentTarget.checked)}
            />
          </label>
          <label>Hide Tooltips
            <input
              type="checkbox"
              checked={hideToolTips}
              onChange={e => setHideToolTips(e.currentTarget.checked)}
            />
          </label>
        </div>
      </div>
      <div className='mainToolBar'>
        <Button Icon={LuGrid} onClick={() => setBlotterVisible(true)} />
      </div>
      <CommandBar onTrade={enterTrade} showCategories={showCategories} hideToolTips={hideToolTips} />
      <Window
        title='Position Blotter'
        visible={blotterVisible}
        onHide={() => setBlotterVisible(false)}
        height={500}
        width={1200}
        x={50}
        y={220}
      >
        <AgGridExample showCategories={showCategories} hideToolTips={hideToolTips} />
      </Window>
      <Window
        title='Trade entry'
        visible={tradeEntryVisible}
        onHide={() => setTradeEntryVisible(false)}
        height={300}
        width={350}
        x={200}
        y={300}
      >
        <TradeExample trade={trade} onClose={() => setTradeEntryVisible(false)} />
      </Window>
    </div>
  )
}

export default App
