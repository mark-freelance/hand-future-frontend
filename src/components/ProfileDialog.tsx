import * as Dialog from '@radix-ui/react-dialog'
import React from 'react'
import { useSelector } from 'react-redux'
import { Avatar } from './Avatar'
import { selectUser } from '../../supports/features/auth/authSlice'

export const ProfileDialog = () => {

  const user = useSelector(selectUser)

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

          {
            user ?
              <div>
                {user.nickname}

                <div className={'avatar rounded-full'}>
                  <Avatar name={user.nickname} url={user.avatar}/>
                </div>
              </div>
              :
              <div>
                [BUG]: Not Init !
              </div>
          }

          <Dialog.Close/>

        </Dialog.Content>

      </Dialog.Portal>

    </Dialog.Root>
  )
}

export default ProfileDialog
