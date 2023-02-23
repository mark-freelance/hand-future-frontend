export const FONT_WEIGHTS = [
  'font-thin',
  'font-extralight',
  'font-light',
  'font-normal',
  'font-medium',
  'font-semibold',
  'font-bold',
  'font-extrabold',
  'font-black'
] as const
export type FONT_WEIGHT = typeof FONT_WEIGHTS[number]
