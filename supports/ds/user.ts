export interface UserLogin {
  username: string
  password: string
}

export interface UserRegister extends UserLogin {
  email: string
  nickname: string
  avatar: string
}

export type UserProfile = UserRegister

export const INIT_USER: UserRegister = {
  username: '',
  password: '',
  email: '',
  nickname: '',
  avatar: ''
}

export interface TokenData {
  access_token: string // aka. ey...
  token_type: string // aka. bearer
}
