export enum UserWorkType {
  text = 'text',
  image = 'image',
  bilibiliVideo = 'bilibiliVideo',
  wechatArticle = 'wechatArticle',
  others = 'others'
}

export interface UserWork {
  type: UserWorkType,
  content: string
}
