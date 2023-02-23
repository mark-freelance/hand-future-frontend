export interface IHero {
  id: string
  name: string
  title: string
  cities: string
  avatar: string
}

export interface IShareCard extends IHero {
  articleTitle: string
  articleContent: string
}
