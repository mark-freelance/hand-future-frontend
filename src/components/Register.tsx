import { useState, FormEvent } from 'react'
import Link from 'next/link'
import InputText from './InputText'
import ErrorText from './ErrorText'

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

function Register() {

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(INIT_USER_LOGIN)
  const [isRegister, setRegister] = useState(false)

  const SwitchLoginAndRegister = ({ text, desc }: { text: string, desc: string }) => <div
    className="text-center mt-4 ">{desc}
    <button onClick={() => setRegister(!isRegister)}
            className="badge badge-secondary  hover:text-primary hover:cursor-pointer transition duration-200">{text}
    </button>
  </div>

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')

    if (user.username.trim() === '') return setErrorMessage('Username is required!')
    if (user.password.trim() === '') return setErrorMessage('Password is required!')
    else {
      setLoading(true)
      // Call API to check user credentials and save token in localstorage
      localStorage.setItem('token', 'DumyTokenHere')
      setLoading(false)
      window.location.href = '/app/welcome'
    }
  }

  const update = ({ type, value }: { type: string, value: string }) => {
    setErrorMessage('')
    setUser({ ...user, [type]: value })
  }

  return (

    <div className="bg-base-200 p-10">
      <form onSubmit={(e) => submitForm(e)}>

        <div className="mb-4">

          {/* login */}
          <InputText type="username" defaultValue={user.username} update={update}/>
          <InputText type="password" defaultValue={user.password} update={update}/>

          {/* register extra */}
          {isRegister && <>
            <InputText type="nickname" defaultValue={user.nickname} update={update}/>
            <InputText type="email" defaultValue={user.email} update={update} addonRight={
              <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z"
                  fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            }/>
          </>}

        </div>

        {/* todo: forget-password */}
        {false && <div className="text-right text-primary"><Link href="/forgot-password"><span
          className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
        </div>}

        <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
        <button type="submit" className={'btn mt-2 w-full btn-primary' + (loading ? ' loading' : '')}>
          {isRegister ? '注册' : '登录'}
        </button>

        {
          !isRegister
            ? <SwitchLoginAndRegister desc={'还没有账号？ '} text={'注册'}/>
            : <SwitchLoginAndRegister desc={'已经有账号了？'} text={'登录'}/>
        }

      </form>
    </div>

  )
}

export default Register
