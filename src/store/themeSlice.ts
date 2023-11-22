import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { Theme } from '@/themes'

// Define a type for the slice state
interface ThemeState {
  theme: Theme
}

// Define the initial state using that type
const initialState: ThemeState = {
  theme: 'none'
}

export const themeSlice = createSlice({
  name: 'theme',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const theme = (state: RootState) => state.theme

export default themeSlice.reducer