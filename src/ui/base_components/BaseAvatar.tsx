/**
 * icon ref: https://tabler-icons.io/
 */
import { IconUser } from '@tabler/icons-react'
import clsx from 'clsx'
import { SIZE_TYPE, tSizeMap, wSizeMap } from '../../supports/ds/visual'


export interface AvatarProps {
  id?: string
  url?: string
  name?: string
  size?: SIZE_TYPE
}

export const BaseAvatar = (props: AvatarProps) => {
  const { name, url, size = 'sm' } = props

  return <div id={props.id}
              className={clsx(
                'avatar rounded-full border-2 border-base-500',
                !url && 'placeholder',
                'cursor-pointer'
              )}
  >

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

export default BaseAvatar

