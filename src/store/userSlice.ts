import { createSlice } from '@reduxjs/toolkit'
import { AppState } from './store'
import { INIT_USER_REGISTER, UserRegister } from '../ds/user'

// Type for our state
export interface UserState extends UserRegister{
  authState: boolean;
}

// Initial state
const initialState: UserState = {
  authState: false,
  ...INIT_USER_REGISTER
}

// Actual Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload
    },

    setUserInfo(state, action) {
      Object.assign(state, action.payload)
    }
  },
})

export const { setAuthState, setUserInfo } = userSlice.actions

export const selectUser = (state: AppState) => state.user

export default userSlice.reducer
