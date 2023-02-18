import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserProfile } from '../../ds/user'
import { AppState } from '../../store'
import backendAPI from '../../utils/api'

export interface AuthState {
  token: string | null
  user: UserProfile | null
}

export const initialState: AuthState = {
  token: null,
  user: null,
}

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.token = null
      state.user = null
      backendAPI.defaults.headers.common.Authorization = undefined
    },
    setToken: (state, action: PayloadAction<string>) => {
      const token = action.payload
      state.token = token
      // inject token into headers
      backendAPI.defaults.headers.common.Authorization = 'Bearer ' + token
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload
    },
  }
})

export const { setToken, resetAuth, setUser } = counterSlice.actions

export const authReducer = counterSlice.reducer

export const selectUser = (state: AppState) => state.auth.user
export const selectAuth = (state: AppState) => state.auth
