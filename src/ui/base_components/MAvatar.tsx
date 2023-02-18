/**
 * icon ref: https://tabler-icons.io/
 */
import { IconUser } from '@tabler/icons-react'
import clsx from 'clsx'
import { HtmlProps } from 'next/dist/shared/lib/html-context'
import { HTMLProps } from 'react'

export const SIZE_TYPES = ['sm', 'md', 'lg'] as const
export type SIZE_TYPE = typeof SIZE_TYPES[number]

export const wSizeMap: Record<SIZE_TYPE, string> = {
  sm: 'w-10',
  md: 'w-14',
  lg: 'w-28'
}

export const tSizeMap: Record<SIZE_TYPE, string> = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-3xl',
}


export interface AvatarProps {
  id?: string
  url?: string
  name?: string
  size?: SIZE_TYPE
}

export const MAvatar = (props: AvatarProps) => {
  const { name, url, size = 'sm' } = props

  const innerBase = clsx('rounded-full ', wSizeMap[size])

  return <div id={props.id} className={clsx('avatar rounded-full border-2 border-base-500', !url && 'placeholder')}>
    {
      url ?
        <div className={innerBase + ' ring ring-primary ring-offset-base-100 ring-offset-2'}>
          <img src={url}/>
        </div>
        : name
          ?
          <div className={innerBase + ' bg-neutral-focus text-neutral-content'}>
            <span className={tSizeMap[size]}>{name[0]}</span>
          </div>
          : <IconUser/>
    }
  </div>
}

