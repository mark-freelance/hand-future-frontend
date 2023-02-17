export interface UserLogin {
  username: string
  password: string
}

export interface UserRegister extends UserLogin {
  email: string
  nickname: string
  avatar: string
}

export const INIT_USER_REGISTER: UserRegister = {
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
