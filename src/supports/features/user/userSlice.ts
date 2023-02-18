import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserProfile } from '../../ds/user'
import { AppState } from '../../store'
import backendAPI from '../../utils/api'
import { UserWork } from '../../ds/userWork'

export interface UserState {
  token: string | null
  basic: UserProfile | null
  works: UserWork[]
}

export const initialState: UserState = {
  token: null,
  basic: null,
  works: []
}

/**
 * pass query, async thunk: ref: https://stackoverflow.com/a/60325032/9422455
 */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.token = null
      state.basic = null
      state.works = []
      backendAPI.defaults.headers.common.Authorization = undefined
    },
    setToken: (state, action: PayloadAction<string>) => {
      const token = action.payload
      state.token = token
      backendAPI.defaults.headers.common.Authorization = 'Bearer ' + token // inject token into headers
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.basic = action.payload
      // todo: bind async getWork to after setUser
    },
    setWorks: (state, action: PayloadAction<UserWork[]>) => {
      state.works = action.payload
    }
  },
})

export const { setToken, resetAuth, setUser, setWorks } = userSlice.actions

export const userReducer = userSlice.reducer

export const selectUser = (state: AppState) => state.user
