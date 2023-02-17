export const RegisteredDropdown = () => {
  // avatar with image
  return (
    <div className="dropdown dropdown-end">

      <div className="avatar online">
        <div className="w-24 rounded-full">
          <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
        </div>
      </div>

      <ul tabIndex={0}
          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  )
}

export default RegisteredDropdown
