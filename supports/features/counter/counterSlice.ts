import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

// key is initialState
export const initialState: CounterState = {
  value: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      ++state.value;
    },
    decrement: (state) => {
      --state.value
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export const {increment, decrement, incrementByAmount} = counterSlice.actions

export const counterReducer = counterSlice.reducer
export default counterReducer
