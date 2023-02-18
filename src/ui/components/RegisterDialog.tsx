import React, { useState } from 'react'
import RegisterCore from './RegisterCore'
import MDialog from '../base_components/MDialog'


const RegisterDialog = () => {
  // 默认已经注册了！
  const [isRegistered, setRegistered] = useState(true)

  const trigger = <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
    <div className="avatar placeholder w-10">
      <div className="bg-neutral-focus text-neutral-content rounded-full ">
        <span className="text-sm">M</span>
      </div>
    </div>
  </label>

  const content = <RegisterCore
    isRegistered={isRegistered}
    dispatchSetRegister={() => setRegistered(!isRegistered)}
  />

  return (
    <MDialog trigger={trigger} title={'注册/登录'} content={content}/>
  )
}

export default RegisterDialog
