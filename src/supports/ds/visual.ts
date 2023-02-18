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
