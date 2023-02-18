export const SIZE_TYPES = ['sm', 'md', 'lg'] as const
export type SIZE_TYPE = typeof SIZE_TYPES[number]

export const avatarSizeMap: Record<SIZE_TYPE, string> = {
  sm: '12px',
  md: '20px',
  lg: '32px'
}

export const wSizeMap: Record<SIZE_TYPE, string> = {
  sm: 'w-12',
  md: 'w-16',
  lg: 'w-20'
}

export const hSizeMap: Record<SIZE_TYPE, string> = {
  sm: 'h-12',
  md: 'h-16',
  lg: 'h-20'
}
export const tSizeMap: Record<SIZE_TYPE, string> = {
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-3xl',
}
