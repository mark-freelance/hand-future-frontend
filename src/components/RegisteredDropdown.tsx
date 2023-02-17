import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setAuthState } from '../../supports/store/userSlice'
import { Avatar } from './Avatar'
import ProfileDialog from './ProfileDialog'
import { resetToken } from '../../supports/utils/api'

export const RegisteredDropdown = () => {
  const userState = useSelector(selectUser)
  const dispatch = useDispatch()
  console.log({ userState })

  // avatar with image
  return (
    <div className="dropdown dropdown-end">

      <label tabIndex={0} className="m-1">
        <Avatar name={userState.nickname} url={userState.avatar}/>
      </label>

      <ul tabIndex={0}
          className="w-24 mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box">
        <li>
          {/*<a className="justify-between">*/}
          {/*  Profile*/}
          {/*</a>*/}
          <ProfileDialog/>
        </li>

        {/*todo: */}
        {false && <li><a>Following</a></li>}

        <li><a onClick={() => {
          dispatch(setAuthState(false))
          resetToken()
        }}>Logout</a></li>
      </ul>
    </div>
  )
}

export default RegisteredDropdown
