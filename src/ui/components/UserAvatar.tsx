/**
 * icon ref: https://tabler-icons.io/
 */
import { ChangeEvent, HTMLProps, useRef } from 'react'
import backendAPI from '../../supports/utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../../supports/features/user/userSlice'
import { BaseAvatar } from '../base_components/BaseAvatar'

export const UserAvatar = () => {
  const refAvatar = useRef<HTMLInputElement>(null)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  if (!user.basic) return <></>

  const onFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    console.log('file input changed: ', e.target.files)
    if (!e.target.files) return
    const file = e.target.files[0]
    console.log({ file })
    if (!file) return
    // failed to avoid using FormData, ref: https://stackoverflow.com/a/64582388/9422455
    const formData = new FormData()
    formData.append('file', file)
    const resUploadAvatar = await backendAPI.post(
      '/files/upload',
      formData
    )
    console.log({ resUploadAvatar })
    const resUpdateUser = await backendAPI.patch(
      '/user/update',
      { 'avatar': resUploadAvatar.data.data }
    )
    console.log({ resUpdateUser })
    dispatch(setUser(resUpdateUser.data.data))
  }

  return <div onClick={() => refAvatar.current?.click()}>
    <input
      type={'file'}
      accept="image/*"
      ref={refAvatar}
      className={'hidden'}
      onChange={onFileInputChange}
    />
    <BaseAvatar size={'md'} url={user.basic.avatar} name={user.basic.nickname}/>
  </div>
}


export default UserAvatar

