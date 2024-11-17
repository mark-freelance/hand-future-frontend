/**
 * Copyright (c) Hand-Future @2023. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from "axios"
import type { AxiosRequestConfig } from "axios"
import _ from "lodash"

import { BACKEND_ENDPOINT } from "./env"

axios.defaults.withCredentials = true

export const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"

export const TOKEN_KEY = "Authorization"

export const AXIOS_INIT_CONFIG: AxiosRequestConfig = {
  baseURL: BACKEND_ENDPOINT,
  timeout: 10000, // ref: https://stackoverflow.com/a/41754655/9422455
  headers: {
    "User-Agent": USER_AGENT,
  },
  withCredentials: true,
}

export const backendAPI = axios.create(AXIOS_INIT_CONFIG)

backendAPI.interceptors.request.use(reqConfig => {
  const basicConfig = _.cloneDeep(AXIOS_INIT_CONFIG)
  reqConfig = _.merge(
    // inspired by https://stackoverflow.com/a/58789480/9422455
    basicConfig,
    reqConfig,
  )
  return reqConfig
})

backendAPI.interceptors.response.use(
  response =>
    // console.debug('res:', response.request.url)
    response,
)

export default backendAPI
