import { FormEvent, useState } from 'react'
import Link from 'next/link'
import InputText from './InputText'
import NotificationText from './NotificationText'
import backendAPI from '../utils/api'
import { AxiosError } from 'axios'
import { INIT_MESSAGE } from '../ds/message'
import { INIT_USER_LOGIN, RegisterProps, TokenData } from '../ds/user'

function RegisterCore({ isRegistered, dispatchSetRegister }: RegisterProps) {

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(INIT_MESSAGE)
  const [user, setUser] = useState(INIT_USER_LOGIN)
  const [code, setCode] = useState('') // activation code
  const [isRegistering, setRegistering] = useState(false)

  // console.log({isRegistered, isRegistering})

  const SwitchLoginAndRegister = ({ text, desc }: { text: string, desc: string }) => <div
    className="text-center mt-4 ">{desc}
    <button onClick={() => dispatchSetRegister()}
            className="badge badge-secondary  hover:text-primary hover:cursor-pointer transition duration-200">{text}
    </button>
  </div>

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessage(INIT_MESSAGE)
    if (user.username.trim() === '') return setMessage({ type: 'error', text: 'Username is required!' })
    if (user.password.trim() === '') return setMessage({ type: 'error', text: 'Password is required!' })
    if (!isRegistered && user.nickname.trim() === '') return setMessage({
      type: 'error',
      text: 'Nickname is required!'
    })
    if (!isRegistered && user.email.trim() === '') return setMessage({ type: 'error', text: 'Email is required!' })
    setLoading(true)
    console.log('registering ...')

    let registerForm = new FormData()
    registerForm.append('username', user.username)
    registerForm.append('password', user.password)
    registerForm.append('email', user.email)
    registerForm.append('nickname', user.nickname)
    try {
      // 登录
      if (isRegistered) {
        const resToken = await backendAPI.post('/user/token', registerForm)
        const tokenData: TokenData = resToken.data
        console.log({ tokenData })
        localStorage.setItem('token', tokenData.access_token)
      }
      // 注册 step 1. 发送邮件
      else if (!isRegistering) {
        await backendAPI.post('/user/register', registerForm)
        setRegistering(true)
      }
      // 注册 step 2. 验证注册
      else {
        if (isRegistering && code.trim() === '') return setMessage({
          type: 'error',
          text: 'Activation Code is required!'
        })
        let activationForm = new FormData()
        activationForm.append('username', user.username)
        activationForm.append('code', code)
        await backendAPI.put('/user/activate', activationForm)
        setRegistering(false)
        dispatchSetRegister()
        setMessage({ type: 'success', text: '注册成功，快登录吧！' })
        /**
         * todo: close popup window; intercept token into axios header; load avatar
         */
      }
    } catch (e) {
      console.error(e)
      if (e instanceof AxiosError) {
        setMessage({type: 'error', text: e.response?.data.detail})
      }
    } finally {
      setLoading(false)
    }
  }

  const update = ({ type, value }: { type: string, value: string }) => {
    setMessage(INIT_MESSAGE)
    setUser({ ...user, [type]: value })
    if (type === 'code') setCode(value)
  }

  return (

    <div className="bg-base-200 p-10">
      <form onSubmit={(e) => submitForm(e)}>

        <div className="mb-4">

          {/* login */}
          <InputText type="username" defaultValue={user.username} update={update}/>
          <InputText type="password" defaultValue={user.password} update={update}/>

          {/* register extra */}
          {!isRegistered && <>
            <InputText type="nickname" defaultValue={user.nickname} update={update}/>
            <InputText type="email" defaultValue={user.email} update={update}/>
            {
              isRegistering &&
              <InputText type="code" defaultValue={code} update={update}/>
            }
          </>}

        </div>

        {/* todo: forget-password */}
        {false && <div className="text-right text-primary"><Link href="/forgot-password"><span
          className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
        </div>}

        <NotificationText type={message.type}>{message.text}</NotificationText>
        <button type="submit" className={'btn mt-2 w-full btn-primary' + (loading ? ' loading' : '')}>
          {isRegistered ? '登录' : '注册'}
        </button>

        {
          isRegistered
            ? <SwitchLoginAndRegister desc={'还没有账号？ '} text={'注册'}/>
            : <SwitchLoginAndRegister desc={'已经有账号了？'} text={'登录'}/>
        }

      </form>
    </div>

  )
}

export default RegisterCore
