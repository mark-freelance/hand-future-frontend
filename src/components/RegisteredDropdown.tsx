import { useDispatch } from 'react-redux'
import { setAuthState } from '../store/authSlice'
import { Avatar } from './Avatar'

export const RegisteredDropdown = () => {

  const dispatch = useDispatch()

  // avatar with image
  return (
    <div className="dropdown dropdown-end">

      <label tabIndex={0} className="m-1">
        <Avatar/>
      </label>

      <ul tabIndex={0}
          className="w-24 mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box">
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>

        {/*todo: */}
        {false && <li><a>Following</a></li>}

        <li><a onClick={() => {dispatch(setAuthState(false))}}>Logout</a></li>
      </ul>
    </div>
  )
}

export default RegisteredDropdown
