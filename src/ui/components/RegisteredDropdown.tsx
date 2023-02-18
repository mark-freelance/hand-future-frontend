import { useDispatch, useSelector } from 'react-redux'
import { MAvatar } from '../base_components/MAvatar'
import { resetAuth, selectUser } from '../../supports/features/auth/authSlice'
import React from 'react'
import ProfileDialog from './ProfileDialog'

export const RegisteredDropdown = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  if (!user) {
    console.error('BUG: user should be inited in RegisteredDropdown')
    return <></>
  }

  return (
    // avatar with image
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="m-1">
        <MAvatar name={user.nickname} url={user.avatar}/>
      </label>

      <ul tabIndex={0}
          className="w-24 mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box">

        <li>
          <ProfileDialog/>
        </li>

        {/*todo: following */}
        {false && <li><a>Following</a></li>}

        <li>
          <a onClick={() => {dispatch(resetAuth())}}>Logout</a>
        </li>

      </ul>
    </div>
  )
}

export default RegisteredDropdown
