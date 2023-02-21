import axios, { AxiosRequestConfig } from 'axios'
import _ from 'lodash'

export const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'

export const HOST = 'gkleifeng.com'
export const BACKEND_PORT = 3001
export const FRONTEND_PORT = 3000

export const TOKEN_KEY = 'Authorization'

export const BACKEND_ENDPOINT = `http://${HOST}:${BACKEND_PORT}`

export const AXIOS_INIT_CONFIG: AxiosRequestConfig = {
  baseURL: BACKEND_ENDPOINT,
  timeout: 1000, // ref: https://stackoverflow.com/a/41754655/9422455
  headers: {
    'User-Agent': USER_AGENT
  },
  withCredentials: true
}
export const backendAPI = axios.create({})

export const frontendAPI = axios.create({
  baseURL: `http://${HOST}:${FRONTEND_PORT}`,
})

backendAPI.interceptors.request.use(reqConfig => {
  let basicConfig = _.cloneDeep(AXIOS_INIT_CONFIG)
  reqConfig = _.merge( // inspired by https://stackoverflow.com/a/58789480/9422455
    basicConfig,
    reqConfig,
  )
  return reqConfig
})

backendAPI.interceptors.response.use(response => {
  // console.debug('res:', response.request.url)
  return response
})

export default backendAPI
