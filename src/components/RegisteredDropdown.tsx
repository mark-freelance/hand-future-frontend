import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from './Avatar'
import ProfileDialog from './ProfileDialog'
import { resetAuth, selectUser } from '../../supports/features/auth/authSlice'

export const RegisteredDropdown = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  console.log({ userState: user })

  // avatar with image
  return (
    <div className="dropdown dropdown-end">

      {
        user ? <label tabIndex={0} className="m-1">
            <Avatar name={user.nickname} url={user.avatar}/>
          </label>
          : 'BUG: NOT_INIT'
      }

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
          dispatch(resetAuth())
        }}>Logout</a></li>
      </ul>
    </div>
  )
}

export default RegisteredDropdown
