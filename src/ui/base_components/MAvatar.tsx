/**
 * icon ref: https://tabler-icons.io/
 */
import { IconUser } from '@tabler/icons-react'
import clsx from 'clsx'
import { HtmlProps } from 'next/dist/shared/lib/html-context'
import { HTMLProps, useRef } from 'react'
import { all } from 'axios'

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
  allowUpload?: boolean
}

export const MAvatar = (props: AvatarProps) => {
  const { name, url, size = 'sm', allowUpload = false } = props

  const refAvatar = useRef<HTMLInputElement>(null)

  return <div id={props.id} onClick={() => {refAvatar.current?.click()}}
              className={clsx(
                'avatar rounded-full border-2 border-base-500',
                !url && 'placeholder',
                allowUpload && 'cursor-pointer'
              )}
  >
    {allowUpload && <input type={'file'} accept="image/*" ref={refAvatar} className={'hidden'}/>}
    <div className={clsx(
      'rounded-full',
      wSizeMap[size],
      url ? 'ring ring-primary ring-offset-base-100 ring-offset-2'
        : 'bg-neutral-focus text-neutral-content'
    )}>
      {
        url ? <img src={url}/>
          : name ? <span className={tSizeMap[size]}>{name[0]}</span>
            : <IconUser/>
      }

    </div>
  </div>
}

