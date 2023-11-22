import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'
import { Matcher } from 'multi-select-speech'

// Define a type for the slice state
interface ContextState {
  matchers: Matcher[]
}

// Define the initial state using that type
const initialState: ContextState = {
  matchers: []
}

export const contextSlice = createSlice({
  name: 'context',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setContext: (state, action: PayloadAction<Matcher[]>) => {
      state.matchers = action.payload
    },
  },
})

export const { setContext } = contextSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const context = (state: RootState) => state.context

export default contextSlice.reducer