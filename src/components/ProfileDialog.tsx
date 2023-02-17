import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../supports/store/userSlice'
import { Avatar } from './Avatar'

export const ProfileDialog = () => {

  const userState = useSelector(selectUser)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          Profile
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>

        <Dialog.Overlay/>

        <Dialog.Content>

          <Dialog.Title>
            Edit Profile
          </Dialog.Title>

          <Dialog.Description/>

          <div>
            {userState.nickname}

            <div className={'avatar rounded-full'}>
              <Avatar name={userState.nickname} url={userState.avatar}/>
            </div>
          </div>

          <Dialog.Close/>

        </Dialog.Content>

      </Dialog.Portal>

    </Dialog.Root>
  )
}

export default ProfileDialog
