/**
 * icon ref: https://tabler-icons.io/
 */
import { IconUser } from '@tabler/icons-react'
// import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export interface AvatarProps {
  url?: string
  name?: string
}

export const Avatar = (props: AvatarProps) => {
  const { name, url } = props
  const baseClasses = ' w-10 rounded-full '

  return url
    ? <div className="avatar">
      <div className={baseClasses + ' ring ring-primary ring-offset-base-100 ring-offset-2'}>
        <img src={url}/>
      </div>
    </div>
    : <div className={'avatar placeholder'}>
      {
        name
          ? <div className={baseClasses + ' bg-neutral-focus text-neutral-content'}>
            <span className="text-xs">{name[0]}</span>
          </div>
          : <IconUser/>
      }
    </div>
}

