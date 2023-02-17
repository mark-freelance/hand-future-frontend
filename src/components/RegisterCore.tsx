import { FormEvent, useState } from 'react'
import Link from 'next/link'
import InputText from './InputText'
import backendAPI, { TOKEN_KEY, updateToken } from '../../supports/utils/api'
import { AxiosError } from 'axios'
import { INIT_USER_REGISTER, TokenData } from '../../supports/ds/user'

import { toast, ToastContainer } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setAuthState, setUserInfo } from '../../supports/store/userSlice'
import { Avatar } from './Avatar'


export interface RegisterProps {
  isRegistered: boolean
  dispatchSetRegister: Function
  dispatchClose: Function
}

function RegisterCore(props: RegisterProps) {
  const {
    isRegistered,
    dispatchSetRegister,
    dispatchClose
  } = props

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(INIT_USER_REGISTER)
  const [code, setCode] = useState('') // activation code
  const [isRegistering, setRegistering] = useState(false)
  const dispatch = useDispatch()

  const SwitchLoginAndRegister = ({ text, desc }: { text: string, desc: string }) => <div
    className="text-center mt-4 ">{desc}
    <button onClick={() => dispatchSetRegister()}
            className="badge badge-secondary  hover:text-primary hover:cursor-pointer transition duration-200">{text}
    </button>
  </div>

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user.username.trim() === '') return toast.error('Username is required!')
    if (user.password.trim() === '') return toast.error('Password is required!')
    if (!isRegistered && user.nickname.trim() === '') return toast.error('Nickname is required!')
    if (!isRegistered && user.email.trim() === '') return toast.error('Email is required!')
    setLoading(true)
    console.log('registering ...')

    let registerForm = new FormData()
    registerForm.append('username', user.username)
    registerForm.append('password', user.password)
    registerForm.append('nickname', user.nickname)
    registerForm.append('email', user.email)
    try {
      // 登录
      if (isRegistered) {
        console.log('【登录】申请token……')
        const resToken = await backendAPI.post('/user/token', registerForm)
        const tokenData: TokenData = resToken.data
        console.log({ tokenData })
        localStorage.setItem(TOKEN_KEY, 'Bearer ' + tokenData.access_token)
        updateToken()

        toast('登录成功！')

        // 获取用户信息，并刷新本地
        const resReadUser = await backendAPI.get('/user/me')
        console.log({ resReadUser })

        dispatchClose()
        dispatch(setAuthState(true))
        dispatch(setUserInfo(resReadUser.data))
      }
      // 注册 step 1. 发送邮件
      else if (!isRegistering) {
        console.log('【注册】基本信息入表……')
        await backendAPI.post('/user/register', registerForm)
        setRegistering(true)
        toast(`已发送验证码到邮箱：${user.email}，有效期10分钟！`)
      }
      // 注册 step 2. 验证注册
      else {
        console.log('【注册】激活邮件验证码')
        if (isRegistering && code.trim() === '') return toast.error('Activation Code is required!')
        let activationForm = new FormData()
        activationForm.append('username', user.username)
        activationForm.append('code', code)
        await backendAPI.put('/user/activate', activationForm)
        setRegistering(false)
        dispatchSetRegister()
        toast.success('注册成功，快登陆吧！')
        /**
         * todo: close popup window; intercept token into axios header; load avatar
         */
      }
    } catch (e) {
      console.error(e)
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.detail)
      }
    } finally {
      setLoading(false)
    }
  }

  const update = ({ type, value }: { type: string, value: string }) => {
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
            {/* 昵称 */}
            <InputText type="nickname" defaultValue={user.nickname} update={update}/>

            {/* 头像 */}
            <div className={`form-control w-full mt-4`}>
              <label className="label">
                <span className={'label-text text-base-content '}>Avatar</span>
              </label>

              <div className={' flex justify-between items-center gap-2'}>
                <Avatar/>
              </div>
            </div>

            {/* 邮箱 */}
            <InputText type="email" defaultValue={user.email} update={update}/>

            {
              isRegistering &&
              <InputText type="code" defaultValue={code} update={update}/>
            }
          </>}


          {/* todo: forget-password */}
          {false && <div className="text-right text-primary"><Link href="/forgot-password"><span
            className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
          </div>}

          <button type="submit" className={'btn mt-2 w-full btn-primary' + (loading ? ' loading' : '')}>
            {isRegistered ? '登录' : '注册'}
          </button>

          {
            isRegistered
              ? <SwitchLoginAndRegister desc={'还没有账号？ '} text={'注册'}/>
              : <SwitchLoginAndRegister desc={'已经有账号了？'} text={'登录'}/>
          }

        </div>
      </form>

    </div>

  )
}

export default RegisterCore
