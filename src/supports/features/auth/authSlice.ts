import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserProfile } from '../../ds/user'
import { AppState } from '../../store'
import backendAPI from '../../utils/api'
import { UserWork } from '../../ds/userWork'

export interface AuthState {
  token: string | null
  user: UserProfile | null
  works: UserWork[]
}

export const initialState: AuthState = {
  token: null,
  user: null,
  works: []
}

/**
 * pass query, async thunk: ref: https://stackoverflow.com/a/60325032/9422455
 */
export const authSlice = createSlice({
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
      // todo: bind async getWork to after setUser
    },
    setWorks: (state, action: PayloadAction<UserWork[]>) => {
      state.works = action.payload
    }
  },
})

export const { setToken, resetAuth, setUser, setWorks } = authSlice.actions

export const authReducer = authSlice.reducer

export const selectUser = (state: AppState) => state.auth.user
