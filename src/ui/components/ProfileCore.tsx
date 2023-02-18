import { MAvatar } from '../base_components/MAvatar'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../supports/features/auth/authSlice'

export const SocialCell = (props: { text: string, cnt: number }) => (
  <div className={'mr-4'}>
    <div className={'text-lg font-medium'}>{props.cnt}</div>
    <div className={'text-md text-gray-500'}>{props.text}</div>
  </div>
)

export const ProfileCore = () => {
  const user = useSelector(selectUser)
  if (!user) {
    console.error('BUG: user not init after profile')
    return <></>
  }

  return (
    <div>
      <div id={'row_avatar-name-id'} className={'flex items-center '}>
        <MAvatar id={'col_avatar'} name={user.nickname} url={user.avatar} size={'md'}/>

        <div id={'col_name-id'} className={'ml-4'}>
          <div className={'text-2xl'}>{user.nickname}</div>
          <div className={'text-gray-500'}>id: {user.username}</div>
        </div>
      </div>

      <div id={'row_profile'} className={'text-gray-500'}>
        {
          user.desc || 'Click here to fill in the profile'
        }
      </div>

      <div id={'row_social-opers'} className={'flex items-center justify-between'}>
        <SocialCell text={'Following'} cnt={user.social.following}/>
        <SocialCell text={'Followed'} cnt={user.social.followed}/>
        <SocialCell text={'Likes'} cnt={user.social.likes}/>
        <div id={'edit-profile'} className={'badge p-4 badge-outline badge-primary text-white'}>Edit Profile</div>
      </div>

      <div id={'collections'}>

      </div>

    </div>
  )
}

export default ProfileCore
