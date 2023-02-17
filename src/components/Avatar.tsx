/**
 * icon ref: https://tabler-icons.io/
 */
import { IconUser } from '@tabler/icons-react'
import clsx from 'clsx'

export interface AvatarProps {
  url?: string
  name?: string
  size?: number
}

export const Avatar = (props: AvatarProps) => {
  const { name, url, size = 24 } = props

  return (
    <div className="avatar">
      {
        url
          ? <div className={clsx('w-' + size, 'rounded-full ring ring-primary ring-offset-base-100 ring-offset-2')}>
            <img src={url}/>
          </div>
          :
          name
            ? <div className={clsx('w-' + size, 'rounded-full bg-neutral-focus text-neutral-content')}>
              <span className="text-3xl">{name[0]}</span>
            </div>
            : <IconUser/>
      }
    </div>
  )
}

