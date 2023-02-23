export interface ISubMenuItem {
  name: string
  path: string
}

export interface IMainMenuItem {
  name: string
  children: (ISubMenuItem | IMainMenuItem)[]
}

export const isMainMenuItem = (item: IMenuItem): item is IMainMenuItem =>
  'children' in item
export type IMenuItem = ISubMenuItem | IMainMenuItem
