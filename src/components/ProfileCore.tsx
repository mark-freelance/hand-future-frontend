import { Avatar } from './Avatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../supports/features/auth/authSlice'

export const ProfileCore = () => {
  const user = useSelector(selectUser)
  if (!user) {
    console.error('BUG: user not init after profile')
    return <></>
  }

  return (
    <div>
      {user.nickname}

      <div className={'avatar rounded-full'}>
        <Avatar name={user.nickname} url={user.avatar}/>
      </div>
    </div>
  )
}

export default ProfileCore
