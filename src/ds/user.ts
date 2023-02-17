export interface UserLogin {
  username: string
  password: string
}

export interface UserRegister extends UserLogin {
  email: string
  nickname: string
}

export const INIT_USER_LOGIN: UserRegister = {
  username: '',
  password: '',
  email: '',
  nickname: ''
}

export interface TokenData {
  access_token: string // aka. ey...
  token_type: string // aka. bearer
}
