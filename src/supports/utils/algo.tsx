import _ from 'lodash'

export const genPascalWithSpace = (s: string): string => {
  let ret = ''
  let i = 0
  for (let c of s) {
    if (i == 0 || c <= 'Z' || c === ' ') {
      ret += ' ' + _.toUpper(c)
    } else {
      ret += c
    }
    ++i
  }
  ret = ret.replace(/\s+/g, ' ')
  return ret
}
