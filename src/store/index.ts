import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeSlice'
import contextReducer from './contextSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    context: contextReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch