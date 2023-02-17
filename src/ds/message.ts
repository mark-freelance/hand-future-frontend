export interface IMessage {
  type: string
  text: string
}

export const INIT_MESSAGE: IMessage = {
  type: 'info',
  text: ''
}
